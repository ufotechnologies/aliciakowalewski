export const data = new Map();

export async function loadData() {
    if (!data.size) {
        const query = await (await fetch('https://53goq129.api.sanity.io/v2024-04-06/data/query/production?query=*')).json();

        let settings;
        let home;
        let about;
        const articles = [];
        const assets = [];

        query.result.forEach(doc => {
            if (doc._type === 'settings') {
                settings = doc;
                return;
            }

            if (doc._type === 'page') {
                if (doc.name === 'Home') {
                    home = doc;
                    return;
                }

                if (doc.name === 'About') {
                    about = doc;
                    return;
                }
            }

            if (doc._type === 'article' && doc.featuredImage) {
                articles.push(doc);
                return;
            }

            if (doc._type === 'sanity.imageAsset') {
                assets.push(doc);
                return;
            }
        });

        data.set('title', settings.title);
        data.set('description', settings.description);
        data.set('shareImage', assets.find(doc => doc._id === settings.shareImage?.asset._ref)?.url);
        data.set('settings', settings);
        data.set('home', home);
        data.set('projects', home.sections.filter(data => data._type === 'project').map(data => articles.find(doc => doc._id === data._ref)));
        data.set('about', about);
        data.set('articles', articles);
        data.set('assets', assets);
    }

    return data;
}
