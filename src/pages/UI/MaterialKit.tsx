import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import cx from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
// sections for this page
import SectionBasics from "pages/UI/MaterialUI/MaterialKit/SectionBasics";
import SectionNavbars from "pages/UI/MaterialUI/MaterialKit/SectionNavbars";
import SectionTabs from "pages/UI/MaterialUI/MaterialKit/SectionTabs";
import SectionPills from "pages/UI/MaterialUI/MaterialKit/SectionPills";
import SectionNotifications from "pages/UI/MaterialUI/MaterialKit/SectionNotifications";
import SectionTypography from "pages/UI/MaterialUI/MaterialKit/SectionTypography";
import SectionJavascript from "pages/UI/MaterialUI/MaterialKit/SectionJavascript";
import SectionCompletedExamples from "pages/UI/MaterialUI/MaterialKit/SectionCompletedExamples";
import SectionLogin from "pages/UI/MaterialUI/MaterialKit/SectionLogin";
import SectionDownload from "pages/UI/MaterialUI/MaterialKit/SectionDownload";

import componentsStyle from "assets/jss/material-kit-react/views/components";

import Navbar from "pages/Documentation/Navbar";
import Parallax from "./MaterialUI/components/Parallax/Parallax";
import GridContainer from "./MaterialUI/components/Grid/GridContainer";
import Footer from "pages/UI/MaterialUI/components/Footer/Footer";


import HeaderTop from "pages/Documentation/HeaderTop/HeaderTop";
import HeaderLinks from "pages/Documentation/HeaderTop/HeaderLinks";
import ProfilePage from "./MaterialUI/MaterialKit/ProfilePage/ProfilePage";
import LandingPage from "pages/UI/MaterialUI/MaterialKit/LandingPage/LandingPage";


// react components for routing our app without refresh

export const MATERIAL_KIT = 'material-kit/';

class MaterialKit extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    }
  }

  componentDidMount() {
    this.setState({
      isLoaded: true
    });
  }

  render() {
    console.log("Documentation JSX RENDER");

    console.log(this.props);

    const { classes, ...rest } = this.props;

    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: false,
        [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
      });

    let publicDocumentationRoutes = [
      {
        path: "/SectionNavbars",    // I'm leaving this here for the time being as an example
        name: "Navbars",    // This should be loaded under a different wrapper
        component: SectionNavbars
      },
      {
        path: "/SectionBasics",
        name: "Basics",
        component: SectionBasics
      },
      // I haven't been able to get this to work
      // {
      //     path: "/SectionCarousel",
      //     name: "Carousel",
      //     component: SectionCarousel
      // },
      {
        path: "/SectionTabs",
        name: "Tabs",
        component: SectionTabs
      },
      {
        path: "/SectionPills",
        name: "Pills",
        component: SectionPills
      },
      {
        path: "/SectionNotifications",
        name: "Notifications",
        component: SectionNotifications
      },
      {
        path: "/SectionTypography",
        name: "Typography",
        component: SectionTypography
      },
      {
        path: "/SectionJavascript",
        name: "Javascript",
        component: SectionJavascript
      },
      {
        path: "/SectionCompletedExamples",
        name: "Text",
        component: SectionCompletedExamples
      },
      {
        path: "/SectionLogin",
        name: "Login",
        component: SectionLogin
      }, {
        path: "/Profile",
        name: "Profile",
        component: ProfilePage
      },
      {
        path: "/Landing",
        name: "Landing",
        component: LandingPage
      },
      {
        path: "/SectionDownload",
        name: "Download",
        component: SectionDownload
      },
      {
        redirect: true,
        path: "/",
        pathTo: "/SectionNavbars",
        name: "Navbars"
      }
    ];

    let root = '/UI/Material-Kit';

    publicDocumentationRoutes = publicDocumentationRoutes.map(o => {
      if ('path' in o) {
        o.path = root + o.path;
      }
      if ('pathTo' in o) {
        o.pathTo = root + o.pathTo;
      }
      return o;
    });

    // transparent here seems to work 50% the time, replace with dark if trouble persists
    return (
      <div>
        <div className={classes.wrapper}>
          <HeaderTop
            brand="CarbonORM.dev"
            rightLinks={<HeaderLinks/>}
            fixed
            color="dark"
            changeColorOnScroll={{
              height: 400,
              color: "dark"
            }}
            {...rest}
          />
          <Parallax image={require("assets/img/Carbon-purple-180.png")}>
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
          <div className={mainPanel}>
            <div>
              <Navbar brand="Material Kit UI" color="danger" routes={publicDocumentationRoutes}/>
              <div className={classNames(classes.main, classes.mainRaised)}>
                {this.props.children}
              </div>
            </div>
          </div>
          <Footer fluid/>
        </div>
      </div>
    );
  }
}


export default withStyles(componentsStyle)(MaterialKit);
