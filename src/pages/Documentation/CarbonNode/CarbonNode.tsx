import FetchMarkdownWithGrid from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdownWithGrid";

export const CARBON_NODE: string = 'CarbonNode/';

export default function CarbonNode() {
    return <FetchMarkdownWithGrid url={'https://raw.githubusercontent.com/CarbonORM/CarbonNode/main/README.md'}/>

}