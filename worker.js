export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');
    
    if (!targetUrl) {
      return new Response('Please provide a target url using ?url=YOUR_M3U8_LINK', { status: 400 });
    }
    
    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'http://core.itsall.pro/',
          'Accept': '*/*'
        }
      });
      
      if (!response.ok) {
        return new Response(`Origin Server Error: ${response.status} ${response.statusText}`, { status: 500 });
      }

      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      newResponse.headers.set('Content-Type', 'application/vnd.apple.mpegurl');
      return newResponse;
    } catch (e) {
      return new Response('Fetch Exception: ' + e.message, { status: 500 });
    }
  },
};
