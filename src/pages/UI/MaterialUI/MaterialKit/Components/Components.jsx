import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh

import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import Button from "pages/UI/MaterialUI/components/CustomButtons/Button";
import Parallax from "pages/UI/MaterialUI/components/Parallax/Parallax";
// sections for this page
import SectionBasics from "pages/UI/MaterialUI/MaterialKit/Components/Sections/SectionBasics";
import SectionNavbars from "pages/UI/MaterialUI/MaterialKit/Components/Sections/SectionNavbars";
import SectionTabs from "pages/UI/MaterialUI/MaterialKit/Components/Sections/SectionTabs";
import SectionPills from "pages/UI/MaterialUI/MaterialKit/Components/Sections/SectionPills";
import SectionNotifications from "pages/UI/MaterialUI/MaterialKit/Components/Sections/SectionNotifications";
import SectionTypography from "pages/UI/MaterialUI/MaterialKit/Components/Sections/SectionTypography";
import SectionJavascript from "pages/UI/MaterialUI/MaterialKit/Components/Sections/SectionJavascript";
import SectionCompletedExamples from "pages/UI/MaterialUI/MaterialKit/Components/Sections/SectionCompletedExamples";
import SectionLogin from "pages/UI/MaterialUI/MaterialKit/Components/Sections/SectionLogin";
import SectionExamples from "pages/UI/MaterialUI/MaterialKit/Components/Sections/SectionExamples";
import SectionDownload from "pages/UI/MaterialUI/MaterialKit/Components/Sections/SectionDownload";

import componentsStyle from "assets/jss/material-kit-react/views/components";
import SectionCarousel from "pages/UI/MaterialUI/MaterialKit/Components/Sections/SectionCarousel";

class Components extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                    <Parallax image={require("assets/img/Carbon-teal-180.png")}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem>
                                <div className={classes.brand}>
                                    <h1 className={classes.title}>CarbonPHP [C6]</h1>
                                    <h3 className={classes.subtitle}>
                                        Build full scale applications in minutes.
                                    </h3>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <SectionCarousel/>
                    <SectionNavbars/>
                    <SectionBasics/>
                    <SectionTabs/>
                    <SectionPills/>
                    <SectionNotifications/>
                    <SectionTypography/>
                    <SectionJavascript/>
                    <SectionCompletedExamples/>
                    <SectionLogin/>
                    <GridItem md={12} className={classes.textCenter}>
                        <Link to={"/login-page"} className={classes.link}>
                            <Button color="primary" size="lg" simple>
                                View Login Page
                            </Button>
                        </Link>
                    </GridItem>
                    <SectionExamples/>
                    <SectionDownload/>

                </div>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(Components);
