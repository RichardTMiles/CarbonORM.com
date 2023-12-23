import CarbonORM from "CarbonORM";
import FetchMarkdown from "components/FetchMarkdown/FetchMarkdown";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import GuidedUserInterface from "pages/Documentation/CarbonWordPress/GuidedUserInterface/GuidedUserInterface";

export const CARBON_WORDPRESS: string = 'CarbonWordPress/';

export default function () {

    const {pureWordpressPluginConfigured} = CarbonORM.instance.state;

    return <GridContainer>
        {pureWordpressPluginConfigured && <>
            <GridItem sm={0} md={2}/>
            <GridItem sm={12} md={8}>
                <GuidedUserInterface/>
            </GridItem>
            <GridItem sm={0} md={2}/>
            <br/>
            <br/>
        </>}
        <GridItem sm={0} md={2}/>
        <GridItem sm={12} md={8}>
            <FetchMarkdown url={'https://raw.githubusercontent.com/CarbonORM/CarbonWordPress/main/README.md'}/>
        </GridItem>
        <GridItem sm={0} md={2}/>
    </GridContainer>
}