import CarbonORM from "CarbonORM";
import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import {iStyle} from "variables/styleModules";
import CarbonPHP from "./Sections/CarbonPHP";
import Bootstrap from "CarbonORM";
import Dependencies from "./Sections/Dependencies";
import Implementations from "./Sections/Implementations";

// FileStructure OptionsIndex Bootstrap Wrapper ParallelProcessing
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

import Navbar from "views/Documentation/Navbar";
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer";
import Footer from "../../components/Footer/Footer";


import HeaderTop from "components/HeaderTop/HeaderTop";
import HeaderLinks from "components/HeaderTop/HeaderLinks";
import Changelog from "./Sections/Changelog";

import Support from "./Sections/Support";
import License from "./Sections/License";


// react components for routing our app without refresh
// @material-ui/icons
// core components

// sections for this page
// import Sections from "views/Documentation/Sections/Sections";


class Documentation extends React.Component<{
    classes: iStyle,
},{}> {
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
        const {versions, darkMode, pureWordpressPluginConfigured} = CarbonORM.instance.state;


        let publicDocumentationRoutes = [
            {
                path: "/Documentation/Support/*",
                name: "ORM Introduction",
                component: Support
            },
            {
                path: "/Documentation/CarbonPHP/*",     // I'm leaving this here for the time being as an example
                name: "PHP",          // This should be loaded under a different wrapper
                component: CarbonPHP
            },
            {
                path: "/Documentation/Support/*",
                name: "Node",
                component: Support
            },
            {
                path: "/Documentation/Support/*",
                name: "React",
                component: Support
            },
            {
                path: "/Documentation/Dependencies/*",
                name: "Dependencies",
                component: Dependencies
            },
            {
                path: "/Documentation/BrowserOSSupport/*",
                name: "Changelog",
                component: Changelog
            },
            {
                path: "/Documentation/Implementations/*",
                name: "Implementations",
                component: Implementations
            },
            {
                path: "/Documentation/Support/*",
                name: "Support",
                component: Support
            },
            {
                path: "/Documentation/License/*",
                name: "License",
                component: License
            },
            {
                redirect: true,
                path: "*",
                pathTo: "/Documentation/Support/",
                name: "Examples"
            }
        ];

        if (pureWordpressPluginConfigured) {

            publicDocumentationRoutes.unshift({
                path: "/Documentation/Wordpress",     // I'm leaving this here for the time being as an example
                name: "Wordpress",          // This should be loaded under a different wrapper
                component: Support
            });

        }

        // todo - if we were to merge version ia PHP ^7.4 application tool kit & framework with code it would be here {this.props.subRoutingSwitch(publicDocumentationRoutes, rest)}
        return <>
            <HeaderTop
                fixed
                brand="CarbonPHP.com"
                darkMode={CarbonORM.instance.state.darkMode}
                rightLinks={<HeaderLinks
                    versions={versions}
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
                                    Automatically generate a RESTful API from your database. Write SECURE sql queries in front end!
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
                        routes={publicDocumentationRoutes}/>

                    <div className={classNames(classes.main, classes.mainRaised)} style={
                        {
                            backgroundColor: (darkMode ? "black" : "white"),
                            color: (darkMode ? "white" : "black"),
                            fontSize: "+1.2em",
                            lineHeight: "+1.8em"
                        }
                    }>
                        {Bootstrap.instance.subRoutingSwitch(publicDocumentationRoutes)}
                    </div>

                </div>

            </div>
            <Footer fluid/>
        </>;
    }
}

export default withStyles(componentsStyle)(Documentation);
