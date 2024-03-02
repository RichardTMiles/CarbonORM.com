import CarbonORM from "CarbonORM";
import FetchMarkdownWithGrid from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdownWithGrid";
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import GuidedUserInterface from "pages/Documentation/CarbonWordPress/GuidedUserInterface/GuidedUserInterface";
import {useState} from "react";

export const CARBON_WORDPRESS: string = 'CarbonWordPress/';

export default function CarbonWordPress() {


    const {C6WordPress} = CarbonORM.instance.state;
    const [showReadMe, setShowReadMe] = useState(!C6WordPress);

    const C6WordpressFullyLoaded = CarbonORM.instance.state.C6WordPress && '' !== CarbonORM.instance.state.C6AutoLoadPath;

    return <GridContainer>
        {C6WordPress && !C6WordpressFullyLoaded && <>
            <GridItem sm={0} md={2}/>
            <GridItem sm={12} md={8}>
                <h1>Carbon WordPress Guided Setup</h1>
                <GuidedUserInterface/>
            </GridItem>
            <GridItem sm={0} md={2}/>
            <br/>
            <br/>
        </>}

        {C6WordpressFullyLoaded &&  <>
            <GridItem sm={0} md={2}/>
            <GridItem sm={12} md={8}>
                <h1>CarbonWordPress is fully setup and running correctly.</h1>
            </GridItem>
            <GridItem sm={0} md={2}/>

            <FetchMarkdownWithGrid url={'https://raw.githubusercontent.com/CarbonORM/CarbonWordPress/main/README.md'}/>
        </>}

        {C6WordPress && <button onClick={() => setShowReadMe(!showReadMe)}>
            {showReadMe ? 'Hide README' : 'Show README'}
        </button>}

        {showReadMe && <>
        <GridItem sm={0} md={2}/>
        <GridItem sm={12} md={8}>
            <h1>Carbon WordPress (README.md)</h1>
        </GridItem>
        <GridItem sm={0} md={2}/>

        <FetchMarkdownWithGrid url={'https://raw.githubusercontent.com/CarbonORM/CarbonWordPress/main/README.md'}/>
        </>}
    </GridContainer>
}