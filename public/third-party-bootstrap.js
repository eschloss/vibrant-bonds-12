(function () {
  window.dataLayer = window.dataLayer || [];

  var GA_ID = "G-J591H7VFMV";
  var APP_READY = "kiki:app-ready";
  var ANALYTICS_INIT = "kiki:analytics-init";
  var isPrerender = typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent || "");
  var loaded = false;

  function initGA() {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID, { send_page_view: false });
  }

  function initMetaPixel() {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      t.onload = function () {
        fbq("init", "1935826830293991");
      };
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  }

  function initManyChat() {
    function loadWidgetScripts() {
      var scripts = ["https://widget.manychat.com/3822754_24192.js"];
      scripts.forEach(function (src) {
        try {
          if (document.querySelector('script[src="' + src + '"]')) return;
          var s = document.createElement("script");
          s.src = src;
          s.async = true;
          s.onerror = function () {};
          document.body.appendChild(s);
        } catch (e) {}
      });
    }
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadWidgetScripts);
    } else {
      setTimeout(loadWidgetScripts, 0);
    }
  }

  function loadAnalytics() {
    if (loaded || isPrerender) return;
    loaded = true;
    initMetaPixel();
    initGA();
    try {
      window.dispatchEvent(new CustomEvent(ANALYTICS_INIT));
    } catch (e) {}
    initManyChat();
  }

  window.addEventListener(APP_READY, loadAnalytics, { once: true });

  window.addEventListener("load", function () {
    setTimeout(function () {
      if (!loaded) loadAnalytics();
    }, 12000);
  });
})();
