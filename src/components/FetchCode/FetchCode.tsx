import {githubRawBlobToEditForm, githubRawBlobToRepoPath, githubRawBlobToView} from "api/hoc/githubUrlParse";
import CodeBlock from "pages/UI/MaterialUI/components/CodeBlock/CodeBlock";
import {FloatProperty} from "csstype";
import {useEffect, useState} from "react";


interface iFetchMarkdownCache {
    markdown: string,
    editUrl: string,
    viewUrl: string,
    repoPath?: string,
}

let fullMarkdownCache: {
    [url: string]: iFetchMarkdownCache|null
} = {};

export interface iFetchCode {
    url: string,
    language: string,
}

export default function FetchCode({url, language}: iFetchCode) {

    const [rawDataCache, setRawDataCache] = useState<iFetchMarkdownCache|null>(fullMarkdownCache[url]);

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
                        setRawDataCache(cache);    // state is needed so the component will re-render
                        fullMarkdownCache[url] = cache;
                    })
                    .catch((e) => {
                        console.error(e);
                        fullMarkdownCache[url] = null;
                    })

            })()

        }

    }, [url])

    if (undefined === rawDataCache) {

        return <small>LOADING ({url})...</small>

    }

    if (null === rawDataCache) {

        return <small>ERROR ({url})...</small>

    }

    const editPage = ({text, float = 'inherit'}: { text: string, float?: FloatProperty }) => <small
        style={{float: float}}>
        {text + ' '}
        <a target='_blank' rel='noreferrer' href={rawDataCache.editUrl}>
            Edit this code here!
        </a>
        <br/>
        <a target='_blank' rel='noreferrer' href={rawDataCache.viewUrl}>{rawDataCache?.repoPath}</a>
    </small>

    return <div style={{overflow: "none"}}>
        {undefined === rawDataCache.editUrl
            ? null
            : editPage({text: 'See an issues below?'})}

        {rawDataCache.markdown ? CodeBlock(rawDataCache.markdown, '', language) : `Error loading (${url})...`}
        <br/>
        {undefined === rawDataCache.editUrl
            ? null
            : editPage({text: 'See issues above?', float: 'right'})}
    </div>
}