import {CodeBlock, dracula, googlecode} from "react-code-blocks";


const codeBlock = (markdown: string, highlight: string = "", language: string = "php", dark: boolean = true) => {
    return <CodeBlock
        text={markdown}
        language={language}
        showLineNumbers={true}
        // @ts-ignore
        theme={dark ? dracula : googlecode}
        highlight={highlight}
    />
}

codeBlock.displayName = 'CodeBlock';

export default codeBlock;