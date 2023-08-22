export const linkResolver = (basePath, doc) => {
    if (doc._type === 'page' && doc.name !== 'Home') {
        return `${basePath}/${doc.slug.current}`;
    }

    if (doc._type === 'article') {
        return `${basePath}/projects/${doc.slug.current}`;
    }

    return '/';
};
