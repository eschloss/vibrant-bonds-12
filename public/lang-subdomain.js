/** Spanish subdomain → document.documentElement.lang (former index.html inline). */
(function () {
  var hostname = window.location.hostname;
  var subdomainParts = hostname.split(".");
  var isSpanish = subdomainParts.length > 1 && subdomainParts[0].toLowerCase() === "es";
  if (isSpanish) {
    document.documentElement.lang = "es";
  }
})();
