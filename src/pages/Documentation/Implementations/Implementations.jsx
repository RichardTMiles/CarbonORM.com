import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import completedStyle from "assets/jss/material-kit-react/views/componentsSections/completedStyle";
import FetchMarkdown from "components/FetchMarkdown/FetchMarkdown";


export const IMPLEMENTATIONS = 'Implementations/';

// TODO - <GridContainer justify="center"> ?????
function Implementations() {
    return <GridContainer justify="center">
        <GridItem sm={0} md={2}/>
        <GridItem sm={12} md={8}>
            <h1>Implementations</h1>
            <h2>CarbonPHP</h2>
            <FetchMarkdown url={'https://raw.githubusercontent.com/wiki/CarbonORM/CarbonPHP/Implementations.md'}/>
        </GridItem>
        <GridItem sm={0} md={2}/>
    </GridContainer>
}

export default withStyles(completedStyle)(Implementations);
