import {ppr} from "api/hoc/passPropertiesAndRender";
import React from "react";
import cx from "classnames";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import dashboardRoutes from "pages/UI/dashboardRoutes";

import appStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle";

import image from "assets/img/Carbon-teal-180.png";
import logo from "assets/img/reactlogo.png";

var ps;

export const UI = 'ui/';

export const MATERIAL_DASHBOARD = 'Material-Dashboard/'

class MaterialDashboard extends React.Component<{
    classes: any,
    children: any,
}, {
    mobileOpen: boolean,
    miniActive: boolean
}> {
    state = {
        mobileOpen: false,
        miniActive: false
    };
    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    getRoute() {
        return false//this.props.location.pathname !== "/maps/full-screen-maps";
    }

    /*
    componentDidMount() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps = new PerfectScrollbar(this.refs.mainPanel, {
          suppressScrollX: true,
          suppressScrollY: false
        });
        document.body.style.overflow = "hidden";
      }
    }
    */
    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }

    sidebarMinimize() {
        this.setState({miniActive: !this.state.miniActive});
    }

    render() {
        const {classes, ...rest} = this.props;
        const mainPanel =
            classes.mainPanel +
            " " +
            cx({
                [classes.mainPanelSidebarMini]: this.state.miniActive,
                [classes.mainPanelWithPerfectScrollbar]:
                navigator.platform.indexOf("Win") > -1
            });


        console.log(dashboardRoutes);

        return (
            <div className={classes.wrapper}>
                {ppr(Sidebar, {
                    routes: dashboardRoutes,
                    logoText: "CarbonPHP",
                    logo: logo,
                    image: image,
                    handleDrawerToggle: this.handleDrawerToggle,
                    open: this.state.mobileOpen,
                    color: "blue",
                })}

                <div className={mainPanel}>
                    <Header
                        sidebarMinimize={this.sidebarMinimize.bind(this)}
                        miniActive={this.state.miniActive}
                        routes={dashboardRoutes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                    />
                    {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    {this.getRoute() ? (
                        <div className={classes.content}>
                            <div className={classes.container}>{this.props.children}</div>
                        </div>
                    ) : (
                        <div className={classes.map}>{this.props.children}</div>
                    )}
                    {this.getRoute() ? <Footer fluid/> : null}
                </div>
            </div>
        );
    }
}


export default withStyles(appStyle)(MaterialDashboard);
