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
          'User-Agent': 'VLC/3.0.18 LibVLC/3.0.18',
          'Accept': '*/*'
        },
        redirect: 'follow'
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
