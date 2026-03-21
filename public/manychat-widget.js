/**
 * Manychat single embed (mccdn.me/widget.js omitted — duplicate widget / "Page Id is required").
 * Idle-loaded; former index.html inline.
 */
(function () {
  var isPrerender = typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent || "");
  if (isPrerender) return;
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
})();
