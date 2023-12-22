import CodeBlock from "components/CodeBlock/CodeBlock";
import {FloatProperty} from "csstype";
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";


interface iFetchMarkdownCache {
    markdown: string,
    editUrl: string,
    viewUrl: string,
    repoPath?: string,
}

let fullMarkdownCache: {
    [url: string]: iFetchMarkdownCache
} = {};

function githubRawBlobToEditForm(url: string) {
    const regex = /^https:\/\/raw\.githubusercontent\.com\/(.+)\/(.+)\/(.+)\/(.+)$/i;
    return url.replace(regex, 'https://github.com/$1/edit/$2/$3/$4');
}

function githubRawBlobToView(url: string) {
    const regex = /^https:\/\/raw\.githubusercontent\.com\/(.+)\/(.+)\/(.+)\/(.+)$/i;
    return url.replace(regex, 'https://github.com/$1/blob/$2/$3/$4');
}


function githubRawBlobToRepoPath(url: string) {
    const regex = /^https:\/\/raw\.githubusercontent\.com\/(.+)\/(.+)\/(.+)\/(.+)$/i;
    return url.replace(regex, '$1/$2/$3/$4');
}


export default function FetchMarkdown({url}: { url: string }) {

    const [markdownCache, setMarkdownCache] = useState<iFetchMarkdownCache>(fullMarkdownCache[url] ?? undefined);

    useEffect(() => {

        if (undefined === fullMarkdownCache[url]) {

            (async () => {

                const myRequest = new Request(url);
                fetch(myRequest)
                    .then((response) => response.text())
                    .then((text) => {
                        const cache: iFetchMarkdownCache = {
                            markdown: text,
                            editUrl: githubRawBlobToEditForm(url),
                            viewUrl: githubRawBlobToView(url),
                            repoPath: githubRawBlobToRepoPath(url),
                        }
                        setMarkdownCache(cache);    // state is needed so the component will re-render
                        fullMarkdownCache[url] = cache;
                    });

            })()

        }

    }, [])

    if (markdownCache === undefined) {
        return <small>LOADING ({url})...</small>
    }

    const editPage = ({text, float = 'inherit'}: { text: string, float?: FloatProperty }) => <small style={{float: float}}>
        {text + ' '}
        <a href={markdownCache.editUrl}>
            Edit this page here!
        </a>
        <br/>
        <a href={markdownCache.viewUrl}>{markdownCache?.repoPath}</a>
    </small>

    return <>
        {undefined === markdownCache.editUrl
            ? null
            : editPage({text: 'See an issues below?'})}
        <ReactMarkdown
            skipHtml={false}
            components={{
                code({className, children}) {

                    const match = /language-(\w+)/.exec(className || '')

                    const code = String(children).replace(/\n$/, '');

                    const language = match ? match[1] : 'text';

                    return CodeBlock(code, '', language)
                },
            }}>
            {markdownCache.markdown ?? `Error loading (${url})...`}
        </ReactMarkdown>
        <br/>
        {undefined === markdownCache.editUrl
            ? null
            : editPage({text: 'See issues above?', float: 'right'})}
    </>
}