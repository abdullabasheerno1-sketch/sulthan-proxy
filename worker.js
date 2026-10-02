export default {
  async fetch(request, env, ctx) {
    const targetUrl = "http://raztv.online/live/MAGNL39E26/hvhS6xsuZP/34747.m3u8";
    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': request.headers.get('User-Agent') || 'Mozilla/5.0'
        }
      });
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      return newResponse;
    } catch (e) {
      return new Response('Proxy Error: ' + e.message, { status: 500 });
    }
  },
};
