import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import posthtml from 'posthtml';
import include from 'posthtml-include';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, 'src');

const pages = globSync('*.html', {
    cwd: srcDir,
}).map((file) => path.resolve(srcDir, file));

// PostHTML plugin for HTML partials
function posthtmlIncludes() {
    return {
        name: 'vite-plugin-posthtml-includes',

        transformIndexHtml: {
            order: 'pre',

            async handler(html) {
                const result = await posthtml([
                    include({
                        root: srcDir,
                    }),
                ]).process(html);

                return result.html;
            },
        },

        // Reload the page when an included partial changes
        configureServer(server) {
            const componentsDir = path.join(srcDir, 'components');

            server.watcher.add(componentsDir);

            server.watcher.on('change', (file) => {
                if (file.endsWith('.html')) {
                    server.ws.send({ type: 'full-reload' });
                }
            });
        },
    };
}

export default defineConfig({
    root: srcDir,

    plugins: [svelte(), posthtmlIncludes()],

    build: {
        outDir: '../dist',
        emptyOutDir: true,

        rollupOptions: {
            input: pages,
        },
    },
});
