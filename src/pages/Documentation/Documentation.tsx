import CarbonORM from "CarbonORM";
import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import {iStyle} from "variables/styleModules";

// FileStructure OptionsIndex Bootstrap Wrapper ParallelProcessing
import componentsStyle from "assets/jss/material-kit-react/views/components";

import Navbar from "pages/Documentation/Navbar";
import Parallax from "../UI/MaterialUI/components/Parallax/Parallax";
import GridContainer from "../UI/MaterialUI/components/Grid/GridContainer";
import Footer from "pages/UI/MaterialUI/components/Footer/Footer";


import HeaderTop from "./HeaderTop/HeaderTop";
import HeaderLinks from "./HeaderTop/HeaderLinks";


export const DOCUMENTATION = 'documentation/';


export interface iDocumentation {
    headerLinks?: {
        path: string,
        name: string
    }[]
}


class Documentation extends React.Component<{
    classes: iStyle,
    children: any,
} & iDocumentation,{}> {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        }
    }

    componentDidMount() {
        this.setState({
            isLoaded: true,
        });
    }


    render() {
        console.log("Documentation RENDER");

        console.log(this.props);

        const {classes} = this.props;
        const {  darkMode} = CarbonORM.instance.state;

        // todo - if we were to merge version ia PHP ^7.4 application tool kit & framework with code it would be here {this.props.subRoutingSwitch(publicDocumentationRoutes, rest)}
        return <>

            <HeaderTop
                fixed
                brand="CarbonORM.dev"
                darkMode={CarbonORM.instance.state.darkMode}
                rightLinks={<HeaderLinks
                    darkMode={darkMode}
                />}
                color={window.pageYOffset < 400 ? "transparent" : (darkMode ? "transparent" : "info")}
                changeColorOnScroll={{
                    height: 400,
                    color: CarbonORM.instance.state.darkMode ? "dark" : "info"
                }}
            />
            <Parallax
                image={CarbonORM.instance.state.darkMode ? "https://carbonphp.com/view/assets/img/Carbon-teal-180.png" : "https://carbonphp.com/view/assets/img/Full-Carbon-Teal-White-1920x1080.png"}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem>
                            <div className={classes.brand}>
                                <h1 className={classes.title}
                                    style={{color: (darkMode ? "white" : "black")}}>
                                    CarbonORM [C6]
                                </h1>
                                <h3 className={classes.subtitle}
                                    style={{color: (darkMode ? "white" : "black")}}>
                                    Generate a powerful MySQL Restful ORM. Write secure json based sql queries in front
                                    end and middleware. Auto-magically manage your database across multiple servers and teams!
                                </h3>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div>
                <div>

                    <Navbar
                        color={darkMode ? "dark" : "info"}
                        className={classNames(classes.main, classes.mainRaised)}
                        routes={this.props.headerLinks}/>

                    <div className={classNames(classes.main, classes.mainRaised)} style={
                        {
                            backgroundColor: (darkMode ? "black" : "white"),
                            color: (darkMode ? "white" : "black"),
                            fontSize: "+1.2em",
                            lineHeight: "+1.8em",
                        }
                    }>
                        <br/>
                        {/* Bootstrap.instance.subRoutingSwitch(publicDocumentationRoutes) */}
                        {this.props.children}
                    </div>

                </div>

            </div>
            <Footer fluid/>
        </>;
    }
}

export default withStyles(componentsStyle)(Documentation);
