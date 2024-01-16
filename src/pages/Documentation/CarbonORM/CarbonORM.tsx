import FetchMarkdown from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdown";

export const CARBON_ORM_INTRODUCTION: string = 'carbon-orm-introduction/';

export default function CarbonORM() {
    return <FetchMarkdown url={'https://raw.githubusercontent.com/CarbonORM/.github/main/profile/README.md'}/>
}