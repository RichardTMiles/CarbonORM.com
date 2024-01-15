import FetchMarkdown from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdown";
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";

export const CARBON_ORM_INTRODUCTION: string = 'carbon-orm-introduction/';

export default function () {
    return <GridContainer>
        <GridItem sm={false} md={2}/>
        <GridItem mdoffset={2} sm={12} md={8}>
            <FetchMarkdown url={'https://raw.githubusercontent.com/CarbonORM/.github/main/profile/README.md'}/>
        </GridItem>
        <GridItem sm={0} md={2}/>
    </GridContainer>
}