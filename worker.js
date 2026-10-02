export default {
  async fetch(request, env, ctx) {
    const targetUrl = "http://raztv.online//live/MAGNL39E26/hvhS6xsuZP/34747.m3u8";
    
    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'http://raztv.online/'
        }
      });
      
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      newResponse.headers.set('Content-Type', 'application/vnd.apple.mpegurl');
      return newResponse;
    } catch (e) {
      return new Response('Proxy Error: ' + e.message, { status: 500 });
    }
  },
};
