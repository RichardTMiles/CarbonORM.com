import CarbonORM from "CarbonORM";
import {CodeBlock, dracula, rainbow} from "@milessystems/react-code-blocks";


const codeBlock = (markdown: string, highlight: string = "", language: string = "php", dark?: boolean) => {
    dark ??= CarbonORM.instance.state.darkMode;
    return <CodeBlock
        text={markdown}
        language={language.toLowerCase()}
        showLineNumbers={true}
        // @ts-ignore
        theme={dark ? dracula : rainbow}
        highlight={highlight}
    />
}

codeBlock.displayName = 'CodeBlock';

export default codeBlock;