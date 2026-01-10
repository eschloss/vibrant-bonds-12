const POLICY_URLS = {
  en: "https://api.kikiapp.eu/auth/legal/en/privacy.html",
  es: "https://api.kikiapp.eu/auth/legal/es/privacy.html",
} as const;

type Lang = keyof typeof POLICY_URLS;

export const onRequestGet: PagesFunction = async ({ request }) => {
  try {
    const reqUrl = new URL(request.url);
    const langParam = (reqUrl.searchParams.get("lang") || "en").toLowerCase();
    const lang: Lang = langParam === "es" ? "es" : langParam === "en" ? "en" : ("en" as Lang);

    if (!(langParam === "en" || langParam === "es" || langParam === "")) {
      return new Response("Invalid lang parameter. Use ?lang=en or ?lang=es", { status: 400 });
    }

    const upstream = await fetch(POLICY_URLS[lang], { redirect: "follow" });
    if (!upstream.ok) {
      return new Response(`Upstream error: ${upstream.status}`, { status: 502 });
    }

    const html = await upstream.text();
    const contentType = upstream.headers.get("content-type") || "text/html; charset=utf-8";

    return new Response(html, {
      headers: {
        "content-type": contentType,
        // Cache on the edge and browsers; legal docs change rarely but shouldn't be "immutable".
        "cache-control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Failed to load privacy policy", { status: 500 });
  }
};

