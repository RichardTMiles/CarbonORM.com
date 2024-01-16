import FetchMarkdown from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdown";

export const CARBON_NODE: string = 'CarbonNode/';

export default function CarbonNode() {
    return <FetchMarkdown url={'https://raw.githubusercontent.com/CarbonORM/CarbonNode/main/README.md'}/>

}