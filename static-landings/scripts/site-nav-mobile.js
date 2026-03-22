(function () {
  function init() {
    var btn = document.querySelector(".nav-menu-btn");
    var panel = document.getElementById("nav-mobile-panel");
    if (!btn || !panel) return;

    var menuIcon = btn.querySelector(".nav-menu-icon");
    var closeIcon = btn.querySelector(".nav-menu-icon-close");

    function setOpen(open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      panel.classList.toggle("is-open", open);
      panel.setAttribute("aria-hidden", open ? "false" : "true");
      if (menuIcon && closeIcon) {
        menuIcon.toggleAttribute("hidden", open);
        closeIcon.toggleAttribute("hidden", !open);
      }
      document.body.classList.toggle("nav-mobile-open", open);
    }

    btn.addEventListener("click", function () {
      setOpen(!panel.classList.contains("is-open"));
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        setOpen(false);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
