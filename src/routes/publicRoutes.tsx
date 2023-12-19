import Dashboard from "views/UI/Dashboard"
import Documentation from "views/Documentation/Documentation";
import LandingPage from "views/LandingPage/LandingPage";
import ProfilePage from "views/ProfilePage/ProfilePage";
import LoginPage from "views/LoginPage/LoginPage";
import Components from "views/UI/MaterialKit";
import AccessControl from "views/AccessControl/AccessControl";

export default function() {

    return [
        // TODO - The following are not setup
        {
            path: "/landing-page/*",
            name: "Landing Page Management",
            component: LandingPage
        },
        {
            path: "/profile-page",
            name: "Profile Page",
            component: ProfilePage
        },
        {
            path: "/login-page/*",
            name: "Login Page",
            component: LoginPage
        },
        {
            path: "/AccessManagement",
            name: "Access Management",
            component: AccessControl
        },
        // These are reference's to UI layouts
        {
            path: "/UI/Material-Kit",
            name: "Material Kit",
            component: Components
        },
        {
            path: "/UI/Material-Dashboard/*",
            name: "Material Dashboard",
            component: Dashboard
        }, // These are possible redirects we have in place
        {
            path: '/*',
            name: "Documentation",
            component: Documentation
        },
        {
            path: "/wp-admin/",
            name: "Wp-Documentation",
            component: Documentation
        },
        {
            redirect: true,
            path: "/2.0",
            pathTo: "https://carbonphp.com/2.0",
        },
        {
            redirect: true,
            path: "*",
            pathTo: '/'
        }
        // Past here a 404 should raise on the previous controller
    ];

}
