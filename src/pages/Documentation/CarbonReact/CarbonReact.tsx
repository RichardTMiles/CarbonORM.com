import FetchMarkdown from "components/FetchMarkdown/FetchMarkdown";
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";

export const CARBON_REACT: string = 'CarbonReact/';

export default function () {
    return <GridContainer justify="center">
        <GridItem sm={0} md={2}/>
        <GridItem mdOffset={2} sm={12} md={8}>
            <FetchMarkdown url={'https://raw.githubusercontent.com/CarbonORM/CarbonReact/lts/README.md'}/>
        </GridItem>
        <GridItem sm={0} md={2}/>
    </GridContainer>
}