// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "views/UI/MaterialDashboard/Dashboard/Dashboard";
import UserProfile from "views/UI/MaterialDashboard/UserProfile/UserProfile";
import TableList from "views/UI/MaterialDashboard/TableList/TableList";
import Typography from "views/UI/MaterialDashboard/Typography/Typography";
import Icons from "views/UI/MaterialDashboard/Icons/Icons";
import Maps from "views/UI/MaterialDashboard/Maps/Maps";
import NotificationsPage from "views/UI/MaterialDashboard/Notifications/Notifications";
import UpgradeToPro from "views/UI/MaterialDashboard/UpgradeToPro/UpgradeToPro";


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

dashboardRoutes = dashboardRoutes.map(o => {
    if ('path' in o) {
        o.path = root + o.path;
    }
    if ('pathTo' in o) {
        o.pathTo = root + o.pathTo;
    }
    return o;
});

export default dashboardRoutes;
