export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetBase = "http://live.lynxiptv.xyz";
    
    const path = url.searchParams.get("url") || url.pathname + url.search;
    
    if (!path || path === "/") {
      return new Response("IPTV Proxy Worker is running. Use ?url=STREAM_LINK", { status: 200 });
    }

    let targetUrl = path.startsWith("http") ? path : targetBase + path;

    const modifiedRequest = new Request(targetUrl, {
      headers: {
        "Referer": targetBase + "/",
        "Origin": targetBase,
        "User-Agent": "VLC/3.0.18 LibVLC/3.0.18",
        "Accept": "*/*"
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
