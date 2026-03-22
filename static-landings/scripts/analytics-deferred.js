/**
 * Deferred Google Analytics (gtag) + Meta Pixel for static landings.
 * Starts once the DOM is interactive (not window "load"), so pixel/gtag
 * script fetches run in parallel with large images instead of after them.
 * No ManyChat. IDs match public/third-party-bootstrap.js
 */
(function () {
  var GA_ID = "G-J591H7VFMV";
  var META_PIXEL_ID = "1935826830293991";
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
    gtag("config", GA_ID);
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
        fbq("init", META_PIXEL_ID);
      };
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  }

  function run() {
    if (loaded) return;
    loaded = true;
    initMetaPixel();
    initGA();
  }

  function scheduleRun() {
    function kick() {
      setTimeout(run, 0);
    }
    if (document.readyState !== "loading") {
      kick();
    } else {
      document.addEventListener("DOMContentLoaded", kick);
    }
  }

  scheduleRun();
})();
