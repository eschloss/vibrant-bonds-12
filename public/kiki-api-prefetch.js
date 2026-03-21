/**
 * Early API prefetch for events routes. Keep shard logic in sync with src/lib/urlShard.ts
 * and URL shapes with src/lib/eventApi.ts / useApiJson resolveUrl.
 *
 * Prerender: the build does not run react-snap by default (`npm run prerender` is separate).
 * If you enable prerender and want to skip network during the crawl, add:
 *   if (navigator.userAgent === "ReactSnap") return;
 * (react-snap sets that exact UA — see node_modules/react-snap/index.js.)
 */
(function () {
  var config = window.__KIKI_PREFETCH_CONFIG__ || {
    eventsApiBase: "https://api.kikiapp.eu",
    authApiBase: "https://api.kikiapp.eu",
  };

  function hashToBucket(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h) % 9;
  }

  function shardApiUrl(urlStr) {
    try {
      var u = new URL(urlStr);
      var host = u.hostname;
      if (host === "staging-api.kikiapp.eu") {
        return urlStr;
      }
      if (host === "api.kikiapp.eu") {
        var pathAndSearch = u.pathname + u.search;
        var bucket = hashToBucket(pathAndSearch);
        var shardHost = bucket === 0 ? "api" : "api" + (bucket + 1);
        u.hostname = shardHost + ".kikiapp.eu";
        return u.toString();
      }
    } catch (e) {
      /* ignore */
    }
    return urlStr;
  }

  function authUrl(path) {
    return shardApiUrl(config.authApiBase.replace(/\/$/, "") + path);
  }

  function eventsUrl(path) {
    return shardApiUrl(config.eventsApiBase.replace(/\/$/, "") + path);
  }

  var registry = Object.create(null);

  function register(url, promise) {
    registry[url] = promise;
  }

  window.__KIKI_API_PREFETCH__ = {
    get: function (url) {
      return registry[url];
    },
  };

  function fetchJson(url) {
    var p = fetch(url, { headers: { accept: "application/json" } }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
    register(url, p);
    return p;
  }

  var rawPath = location.pathname || "/";
  var path = rawPath.replace(/\/$/, "") || "/";

  function prefetchTwoCitiesApis() {
    fetchJson(authUrl("/auth/get_all_cities"));
    fetchJson(authUrl("/auth/get_all_cities_expanded"));
  }

  if (path === "/events/cities") {
    prefetchTwoCitiesApis();
    return;
  }

  var cityMatch = path.match(/^\/events\/cities\/([^/]+)$/);
  if (cityMatch) {
    var cityName = decodeURIComponent(cityMatch[1]).toLowerCase();
    var expandedUrl = authUrl("/auth/get_all_cities_expanded");
    var p = fetch(expandedUrl, { headers: { accept: "application/json" } }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
    register(expandedUrl, p);
    p.then(function (rows) {
      if (!Array.isArray(rows)) return;
      var matched = rows.find(function (c) {
        var url2 = (c.url2 || "").replace(/^\//, "").toLowerCase();
        var code = c.code != null ? String(c.code).toLowerCase() : "";
        return url2 === cityName || code === cityName;
      });
      if (!matched || !matched.code) return;
      var qs = new URLSearchParams({ code: String(matched.code), page: "0" });
      fetchJson(eventsUrl("/events/get_kikis?" + qs.toString()));
    }).catch(function () {
      /* ignore */
    });
    return;
  }

  var eventSegMatch = path.match(/^\/events\/([^/]+)\/?$/);
  if (eventSegMatch) {
    var seg = eventSegMatch[1];
    if (seg !== "cities" && seg !== "how-it-works") {
      var slug = decodeURIComponent(seg);
      var kikiQs = new URLSearchParams({ slug: slug });
      var getKikiUrl = eventsUrl("/events/get_kiki?" + kikiQs.toString());
      var pk = fetchJson(getKikiUrl);
      pk.then(function (data) {
        if (!data || data.city == null || data.city === "") return;
        var kikisQs = new URLSearchParams({ code: String(data.city), page: "0" });
        fetchJson(eventsUrl("/events/get_kikis?" + kikisQs.toString()));
      }).catch(function () {
        /* ignore */
      });
      return;
    }
  }

  prefetchTwoCitiesApis();
})();
