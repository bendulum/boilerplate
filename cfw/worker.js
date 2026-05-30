export default {
    // eslint-disable-next-line no-unused-vars, require-await
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // eslint-disable-next-line no-console
        console.log('Worker URL', url);

        return new Response('Cloudflare Worker is running', {
            headers: { 'content-type': 'text/plain' },
        });
    },
};
