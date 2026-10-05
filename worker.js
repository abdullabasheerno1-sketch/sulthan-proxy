export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetBase = "http://live.lynxiptv.xyz";
    
    const path = url.searchParams.get("url") || url.pathname + url.search;
    
    if (!path || path === "/") {
      return new Response("IPTV Proxy Worker is running. Use ?url=STREAM_LINK", { status: 200 });
    }

    let targetUrl = path.startsWith("http") ? path : targetBase + path;

    // സെക്യൂരിറ്റി ബ്ലോക്ക് മറികടക്കാൻ കൂടുതൽ റിയലിസ്റ്റിക് ആയ ഹെഡറുകൾ നൽകുന്നു
    const modifiedRequest = new Request(targetUrl, {
      headers: {
        "Referer": "http://live.lynxiptv.xyz/",
        "Origin": "http://live.lynxiptv.xyz",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection": "keep-alive"
      },
      method: request.method,
      redirect: "follow"
    });

    try {
      const response = await fetch(modifiedRequest);
      const newResponse = new Response(response.body, response);
      newResponse.headers.set("Access-Control-Allow-Origin", "*");
      return newResponse;
    } catch (e) {
      return new Response("Proxy Error: " + e.message, { status: 500 });
    }
  },
};
