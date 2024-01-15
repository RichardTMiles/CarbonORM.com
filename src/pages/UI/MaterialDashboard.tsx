import BubbleChart from "@material-ui/icons/BubbleChart";
import Dashboard from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Person from "@material-ui/icons/Person";
import Unarchive from "@material-ui/icons/Unarchive";
import {ppr} from "api/hoc/passPropertiesAndRender";
import DashboardPage from "pages/UI/MaterialUI/MaterialDashboard/Dashboard/Dashboard";
import Icons from "pages/UI/MaterialUI/MaterialDashboard/Icons/Icons";
import Maps from "pages/UI/MaterialUI/MaterialDashboard/Maps/Maps";
import NotificationsPage from "pages/UI/MaterialUI/MaterialDashboard/Notifications/Notifications";
import TableList from "pages/UI/MaterialUI/MaterialDashboard/TableList/TableList";
import Typography from "pages/UI/MaterialUI/MaterialDashboard/Typography/Typography";
import UpgradeToPro from "pages/UI/MaterialUI/MaterialDashboard/UpgradeToPro/UpgradeToPro";
import UserProfile from "pages/UI/MaterialUI/MaterialDashboard/UserProfile/UserProfile";
import React from "react";
import cx from "classnames";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "pages/UI/MaterialUI/components/Header/Header";
import Footer from "pages/UI/MaterialUI/components/Footer/Footer";
import Sidebar from "pages/UI/MaterialUI/components/Sidebar/Sidebar";
import appStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle";
import image from "assets/img/Carbon-teal-180.png";
import logo from "assets/img/reactlogo.png";

var ps;

export const UI = 'ui/';

export const MATERIAL_DASHBOARD = 'Material-Dashboard/'

let dashboardRoutes = [
    {
        path: "/dashboard",
        sidebarName: "Dashboard",
        navbarName: "Material Dashboard",
        name: "Material Dashboard",
        icon: Dashboard,
        component: DashboardPage
    },
    {
        path: "/user",
        sidebarName: "User Profile",
        navbarName: "Profile",
        name: "Profile",
        icon: Person,
        component: UserProfile
    },
    {
        path: "/table",
        sidebarName: "Table List",
        navbarName: "Table List",
        name: "Table List",
        icon: "content_paste",
        component: TableList
    },
    {
        path: "/typography",
        sidebarName: "Typography",
        navbarName: "Typography",
        name: "Typography",
        icon: LibraryBooks,
        component: Typography
    },
    {
        path: "/icons",
        sidebarName: "Icons",
        navbarName: "Icons",
        name: "Icons",
        icon: BubbleChart,
        component: Icons
    },
    {
        path: "/maps",
        sidebarName: "Maps",
        navbarName: "Map",
        name: "Map",
        icon: LocationOn,
        component: Maps
    },
    {
        path: "/notifications",
        sidebarName: "Notifications",
        navbarName: "Notifications",
        name: "Notifications",
        icon: Notifications,
        component: NotificationsPage
    },
    {
        path: "/upgrade-to-pro",
        sidebarName: "Upgrade To PRO",
        navbarName: "Upgrade To PRO",
        name: "Upgrade To PRO",
        icon: Unarchive,
        component: UpgradeToPro
    },
    {
        redirect: true,
        path: "*",
        pathTo: "/dashboard",
    }
];

let root = '/UI/Material-Dashboard';

export const DashboardRoutes = dashboardRoutes =  dashboardRoutes.map(o => {
    if ('path' in o) {
        o.path = root + o.path;
    }
    if ('pathTo' in o) {
        o.pathTo = root + o.pathTo;
    }
    return o;
});

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
