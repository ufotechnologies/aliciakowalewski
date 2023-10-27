import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import { linkResolver } from './src/js/utils/linkResolver.js';

const excerptLength = 300;

// https://stackoverflow.com/questions/18749591/encode-html-entities-in-javascript/18750001#18750001
const encodeHTMLEntities = s => s.replace(/[\u00A0-\u9999<>\&]/g, i => `&#${i.charCodeAt(0)};`);

const build = async () => {
    const query = await (await fetch('https://53goq129.api.sanity.io/v2023-10-27/data/query/production?query=*')).json();

    const index = query.result.findIndex(({ _type }) => _type === 'settings');
    let settings = query.result.splice(index, 1)[0];

    settings = {
        title: encodeHTMLEntities(settings.title),
        description: encodeHTMLEntities(settings.description),
        favicon: query.result.find(({ _id }) => _id === settings.favicon?.asset._ref)?.url,
        shareImage: query.result.find(({ _id }) => _id === settings.shareImage?.asset._ref)?.url
    };

    const result = query.result.filter(({ _type, name, slug }) => {
        return (_type === 'page' || _type === 'article') && (
            (name !== 'Home' && slug) ||
            name === 'Home'
        );
    }).map(doc => {
        let type = '';
        let title = '';
        let description = '';
        let shareImage = '';

        if (doc._type === 'page') {
            type = doc.name.toLowerCase();
            title = doc.title;
            description = doc.description;
        }

        if (doc._type === 'article') {
            type = 'project';
            title = doc.title;
            description = doc.description;
            shareImage = query.result.find(({ _id }) => _id === doc.featuredImage?.image?.asset._ref)?.url;
        }

        if (description && description.length > excerptLength) {
            description = `${description.substring(0, excerptLength - 3)}...`;
        }

        return {
            type,
            title: title ? encodeHTMLEntities(title) : settings.title,
            description: description ? encodeHTMLEntities(description.replace(/\n/g, ' ').trim()) : settings.description,
            favicon: `${settings.favicon}?w=512&h=512&fit=crop&crop=center&sharp=25`,
            shareImage: `${shareImage ? shareImage : settings.shareImage}?w=1200&h=630&fit=crop&crop=center&sharp=25`,
            fullPath: linkResolver('', doc)
        };
    });

    fs.writeFileSync(
        path.join(cwd(), './routes.json'),
        JSON.stringify({ settings, result }, null, '\t')
    );
}

build();
