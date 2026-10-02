export default {
  async fetch(request, env, ctx) {
    const urlObj = new URL(request.url);
    let targetUrl = urlObj.searchParams.get('url');
    
    // Fallback to default playlist if no url parameter is passed
    if (!targetUrl) {
      targetUrl = "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:colorstamilhd11.smil/playlist.m3u8";
    }
    
    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'VLC/3.0.18 LibVLC/3.0.18',
          'Accept': '*/*'
        },
        redirect: 'follow'
      });
      
      let body = await response.text();
      const workerUrl = new URL(request.url);
      const workerBase = `${workerUrl.protocol}//${workerUrl.host}`;

      // Rewrite relative segment links to route through proxy
      const lines = body.split('\n');
      const modifiedLines = lines.map(line => {
        if (line && !line.startsWith('#')) {
          if (!line.startsWith('http')) {
            const absoluteSegmentUrl = new URL(line, targetUrl).toString();
            return `${workerBase}/?url=${encodeURIComponent(absoluteSegmentUrl)}`;
          }
        }
        return line;
      });
      
      const newBody = modifiedLines.join('\n');

      const newResponse = new Response(newBody, {
        status: response.status,
        headers: response.headers
      });
      
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      newResponse.headers.set('Content-Type', 'application/vnd.apple.mpegurl');
      return newResponse;
      
    } catch (e) {
      return new Response('Proxy Error: ' + e.message, { status: 500 });
    }
  },
};
