

export const rawFileRegex = /^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/(.+)$/i;

// ex - https://raw.githubusercontent.com/wiki/CarbonORM/CarbonORM.dev/Home.md
export const rawWikiRegex = /^https:\/\/raw\.githubusercontent\.com\/wiki\/([^/]+)\/([^/]+)\/(.+).md$/i;

export function githubRawBlobToEditForm(url: string) {
    return url.startsWith('https://raw.githubusercontent.com/wiki/')
        ? url.replace(rawWikiRegex, 'https://github.com/$1/$2/wiki/$3/_edit')
        : url.replace(rawFileRegex, 'https://github.com/$1/$2/edit/$3');
}

export function githubRawBlobToView(url: string) {
    return url.startsWith('https://raw.githubusercontent.com/wiki/')
        ? url.replace(rawWikiRegex, 'https://github.com/$1/$2/wiki/$3')
        : url.replace(rawFileRegex, 'https://github.com/$1/$2/blob/$3');
}

export function githubRawBlobToRepoPath(url: string) {
    return url.startsWith('https://raw.githubusercontent.com/wiki/')
        ? url.replace(rawWikiRegex, '$1/$2/wiki/$3')
        : url.replace(rawFileRegex, '$1/$2/$3');
}

