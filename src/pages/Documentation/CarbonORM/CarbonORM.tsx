import FetchMarkdownWithGrid from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdownWithGrid";

export const CARBON_ORM_INTRODUCTION: string = 'carbon-orm-introduction/';

export default function CarbonORM() {
    return <FetchMarkdownWithGrid url={'https://raw.githubusercontent.com/CarbonORM/.github/main/profile/README.md'}/>
}