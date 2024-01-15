import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import completedStyle from "assets/jss/material-kit-react/views/componentsSections/completedStyle";
import FetchMarkdown from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdown";


export const SUPPORT = 'Support/';

// TODO - <GridContainer justify="center"> ?????
function License() {
    return <GridContainer justify="center">
        <GridItem sm={0} md={2}/>
        <GridItem sm={12} md={8}>
            <FetchMarkdown url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/support.md'}/>
        </GridItem>
        <GridItem sm={0} md={2}/>
    </GridContainer>
}

export default withStyles(completedStyle)(License);
