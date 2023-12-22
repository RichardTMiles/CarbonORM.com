import FetchMarkdown from "components/FetchMarkdown/FetchMarkdown";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

export const CARBON_NODE: string = 'CarbonNode/';

export default function () {
    return <GridContainer justify="center">
        <GridItem sm={0} md={2}/>
        <GridItem mdoffset={2} sm={12} md={8}>
            <FetchMarkdown url={'https://raw.githubusercontent.com/CarbonORM/CarbonNode/main/README.md'}/>
        </GridItem>
    </GridContainer>
}