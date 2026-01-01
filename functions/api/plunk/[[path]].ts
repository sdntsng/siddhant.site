export async function onRequest(context) {
    const url = new URL(context.request.url);
    // Extract the path after /api/plunk/
    const path = url.pathname.replace('/api/plunk/', '');

    // Construct destination URL
    const destinationUrl = `https://next-api.useplunk.com/${path}${url.search}`;

    // Create new request
    const newRequest = new Request(destinationUrl, {
        method: context.request.method,
        headers: context.request.headers,
        body: context.request.body,
    });

    // Forward request
    try {
        const response = await fetch(newRequest);
        return response;
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
