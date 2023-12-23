import FetchMarkdown from "components/FetchMarkdown/FetchMarkdown";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

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