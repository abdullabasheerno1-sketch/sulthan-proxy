export default {
  async fetch(request, env, ctx) {
    const targetUrl = "http://core.itsall.pro/live/megapeer/PQubhxj8KGGKSLPAKS/249964.m3u8";
    
    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'VLC/3.0.18 LibVLC/3.0.18',
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
