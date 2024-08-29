import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import routes from './routes.json' with { type: 'json' };
import { basePath } from './src/js/utils/settings.js';

routes.result.forEach(page => {
    fs.writeFileSync(
        path.join(cwd(), `./public/${page.fullPath === '/' ? '/index.html' : `${page.fullPath}.html`}`),
        /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="${page.description}">
    <meta name="theme-color" content="#f5f5f5">
    <meta name="msapplication-TileColor" content="#f5f5f5">

    <title>${page.title}${page.fullPath !== '/' ? ` — ${routes.settings.title}` : ''}</title>

    <meta property="og:type" content="website">
    <meta property="og:url" content="https://aliciakowalewski.ca${page.fullPath}">
    <meta property="og:site_name" content="${routes.settings.title}">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:image" content="${page.shareImage}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@aliciakowalews1">
    <meta name="twitter:creator" content="@aliciakowalews1">

    <link rel="prefetch" href="https://53goq129.api.sanity.io/v2024-08-29/data/query/production?query=*">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap">
    <link rel="stylesheet" href="${basePath}/assets/css/style.css">
    <link rel="icon" type="image/svg+xml" href="${page.favicon}">
    <link rel="canonical" href="https://aliciakowalewski.ca${page.fullPath}">

    <script src="${basePath}/assets/js/app.js" type="module"></script>
</head>
<body class="${page.type}">
    <div class="page">
        <main>
            <article></article>
        </main>
    </div>
    <div class="transition"></div>
    <div class="preloader">
        <img src="${routes.settings.shareImage}" width="1200" height="630">
    </div>
</body>
</html>
`
    );
});
