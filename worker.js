export default {
  async fetch(request, env, ctx) {
    const targetUrl = "http://raztv.online//live/MAGNL39E26/hvhS6xsuZP/34747.m3u8";
    
    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'VLC/3.0.18 LibVLC/3.0.18',
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
