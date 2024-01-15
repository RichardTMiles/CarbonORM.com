import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import completedStyle from "assets/jss/material-kit-react/views/componentsSections/completedStyle";
import FetchMarkdown from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdown";
import NavPills from "pages/UI/MaterialUI/components/NavPills/NavPills";
import {
    AccountTree,
    AllInclusive, Announcement,
    Dashboard, Exposure,
    Looks3,
    Looks4,
    Looks5,
    Looks6,
    LooksOne,
    LooksTwo, Power, RecentActors, Restaurant, RestorePage,
    Storage,
    Timeline,
    ViewComfy
} from "@material-ui/icons";
import CodeBlock from "pages/UI/MaterialUI/components/CodeBlock/CodeBlock";
import Button from "pages/UI/MaterialUI/components/CustomButtons/Button";
import {C6} from "api/rest/C6";
import AccessControl from "pages/AccessControl/AccessControl";
import SequenceDiagram from "assets/img/invertSD.png";


export const IMPLEMENTATIONS = 'Implementations/';

// TODO - <GridContainer justify="center"> ?????
function Implementations() {
    return <GridContainer justify="center">
        <GridItem sm={0} md={2}/>
        <GridItem mdOffset={2} sm={12} md={8}>
            <FetchMarkdown url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/implementations.md'}/>
        </GridItem>
        <GridItem sm={0} md={2}/>
        <GridItem sm={0} md={2}/>
        <GridItem sm={12} md={8}>
            <h2>Increasingly Verbose</h2>
            <NavPills
                color="info"
                tabs={[
                    {
                        tabButton: "Hello World",
                        tabIcon: LooksOne,
                        tabContent: (
                            <>
                            </>

                        )
                    },
                    {
                        tabButton: "Routing",
                        tabIcon: LooksTwo,
                        tabContent: (
                            <>

                            </>
                        )
                    },
                    {
                        tabButton: "iConfig",
                        tabIcon: Looks3,
                        tabContent: (
                            <>

                            </>
                        )
                    },
                    {
                        tabButton: "Instant Chat",
                        tabIcon: Looks4,
                        tabContent: (
                            <>
                                =                                                        </>
                        )
                    },
                    {
                        tabButton: "/",
                        tabIcon: Looks5,
                        tabContent: (
                            <>
                            </>
                        )
                    },
                    {
                        tabButton: "https://Stats.Coach/",
                        tabIcon: Looks6,
                        tabContent: (
                            <>
                            </>
                        )
                    },
                ]}
            />

        </GridItem>

    </GridContainer>
}

export default withStyles(completedStyle)(Implementations);
