import FetchMarkdownWithGrid from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdownWithGrid";

export const CARBON_JAVA: string = 'CarbonJava/';

export default function CarbonJava() {
    return <FetchMarkdownWithGrid url={'https://raw.githubusercontent.com/CarbonORM/CarbonJava/main/README.md'}/>
}