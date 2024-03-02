import {CarbonReact, initialRequiredCarbonORMState, CarbonWebSocket, BackendThrowable} from "@carbonorm/carbonreact";
import Notifications from "@material-ui/icons/Notifications";
import {initialRestfulObjectsState} from "api/rest/C6";
import CarbonJava, {CARBON_JAVA} from "pages/CarbonJava/CarbonJava";
import CarbonNode, {CARBON_NODE} from "pages/Documentation/CarbonNode/CarbonNode";
import CarbonReactDocumentation, {CARBON_REACT} from "pages/Documentation/CarbonReact/CarbonReact";
import CarbonWordPress, {CARBON_WORDPRESS} from "pages/Documentation/CarbonWordPress/CarbonWordPress";
import ForgetPassword from "pages/UI/Bootstrap/AdminLTE/modules/forgot-password/ForgotPassword";
import Login from "pages/UI/Bootstrap/AdminLTE/modules/login/Login";
import RecoverPassword from "pages/UI/Bootstrap/AdminLTE/modules/recover-password/RecoverPassword";
import Register from "pages/UI/Bootstrap/AdminLTE/modules/register/Register";
import AdminLTEDashboard from "pages/UI/Bootstrap/AdminLTE/pages/AdminLTEDashboard";
import Blank from "pages/UI/Bootstrap/AdminLTE/pages/Blank";
import Profile from "pages/UI/Bootstrap/AdminLTE/pages/profile/Profile";
import SubMenu from "pages/UI/Bootstrap/AdminLTE/pages/SubMenu";
import {Routes, Route, Navigate, MemoryRouter, HashRouter} from 'react-router-dom';
import {ppr} from "api/hoc/passPropertiesAndRender";

// This is our ajax class
import {iAuthenticate, initialAuthenticateState} from "state/authenticate";
import {initialUiState, iUi} from "state/ui";
import {initialVersionsState, iVersions} from "state/versions";
import {ToastContainer} from "react-toastify";
import DashboardPage, {DASHBOARD} from "pages/UI/MaterialUI/MaterialDashboard/Dashboard/Dashboard";
import Documentation, {DOCUMENTATION, iDocumentation} from "pages/Documentation/Documentation";
import CarbonPHP, {CARBON_PHP} from "pages/Documentation/CarbonPHP/CarbonPHP";
import Implementations, {IMPLEMENTATIONS} from "pages/Documentation/Implementations/Implementations";
import License, {LICENSE} from "pages/Documentation/License/License";
import Support, {SUPPORT} from "pages/Documentation/Support/Support";
import Icons, {ICONS} from "pages/UI/MaterialUI/MaterialDashboard/Icons/Icons";
import LandingPage, {LANDING_PAGE} from "pages/UI/MaterialUI/MaterialKit/LandingPage/LandingPage";
import Maps, {MAPS} from "pages/UI/MaterialUI/MaterialDashboard/Maps/Maps";
import {NOTIFICATIONS} from "pages/UI/MaterialUI/MaterialDashboard/Notifications/Notifications";
import TableList, {TABLES} from "pages/UI/MaterialUI/MaterialDashboard/TableList/TableList";
import Typography, {TYPOGRAPHY} from "pages/UI/MaterialUI/MaterialDashboard/Typography/Typography";
import Dashboard, {MATERIAL_DASHBOARD, UI} from "pages/UI/MaterialDashboard";
import AdminLTE, {ADMIN_LTE} from "pages/UI/AdminLTE";
import MaterialKit, {MATERIAL_KIT} from "pages/UI/MaterialKit";
import SectionBasics, {SECTION_BASICS} from "pages/UI/MaterialUI/MaterialKit/SectionBasics";
import SectionCompletedExamples, {
    SECTION_COMPLETED_EXAMPLES
} from "pages/UI/MaterialUI/MaterialKit/SectionCompletedExamples";
import SectionDownload, {SECTION_DOWNLOAD} from "pages/UI/MaterialUI/MaterialKit/SectionDownload";
import SectionJavascript, {SECTION_JAVASCRIPT} from "pages/UI/MaterialUI/MaterialKit/SectionJavascript";
import SectionLogin, {SECTION_LOGIN} from "pages/UI/MaterialUI/MaterialKit/SectionLogin";
import SectionNavbars, {SECTION_NAVBARS} from "pages/UI/MaterialUI/MaterialKit/SectionNavbars";
import SectionNotifications, {SECTION_NOTIFICATIONS} from "pages/UI/MaterialUI/MaterialKit/SectionNotifications";
import SectionPills, {SECTION_PILLS} from "pages/UI/MaterialUI/MaterialKit/SectionPills";
import SectionTabs, {SECTION_TABS} from "pages/UI/MaterialUI/MaterialKit/SectionTabs";
import SectionTypography, {SECTION_TYPOGRAPHY} from "pages/UI/MaterialUI/MaterialKit/SectionTypography";
import UpgradeToPro, {UPGRADE_TO_PRO} from "pages/UI/MaterialUI/MaterialDashboard/UpgradeToPro/UpgradeToPro";
import UserProfile, {USER_PROFILE} from "pages/UI/MaterialUI/MaterialDashboard/UserProfile/UserProfile";
import CarbonORMDocumentation, {CARBON_ORM_INTRODUCTION} from "pages/Documentation/CarbonORM/CarbonORM"
import isTest from "variables/isTest";
import {initialWordPressState, iWordPress} from "state/wordpress";

export const initialCarbonORMState: typeof initialRestfulObjectsState
    & typeof initialRequiredCarbonORMState
    & iAuthenticate
    & iVersions
    & iUi
    & iWordPress
    & {} = {
    ...initialWordPressState,
    ...initialVersionsState,
    ...initialRestfulObjectsState,
    ...initialRequiredCarbonORMState,
    ...initialAuthenticateState,
    ...initialUiState,
}


export default class CarbonORM extends CarbonReact<{ browserRouter?: boolean }, typeof initialCarbonORMState> {

    static instance: CarbonORM;

    state = initialCarbonORMState;

    constructor(props) {
        super(props);
        CarbonORM.instance = this;
        CarbonReact.instance = this;
    }

    render() {
        console.log("CarbonORM TSX RENDER");

        const {isLoaded, backendThrowable, C6WordPress} = this.state;


        if (backendThrowable.length > 0) {

            return <BackendThrowable/>

        }

        if (!isLoaded) {

            return <h2>Loading...</h2>;

        }

        const reactRouterContext = (children: any) => {

            if (isTest) {

                return <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>

            }

            return <HashRouter>{children}</HashRouter>

        }

        return reactRouterContext(<>
            <CarbonWebSocket url={'ws://localhost:8888/ws'}/>
            <Routes>
                <Route path={UI + "*"}>
                    <Route path={MATERIAL_DASHBOARD + "*"} element={ppr(Dashboard, {})}>
                        <Route path={DASHBOARD + '*'} element={ppr(DashboardPage, {})}/>
                        <Route path={USER_PROFILE + '*'} element={ppr(UserProfile, {})}/>
                        <Route path={TABLES + '*'} element={ppr(TableList, {})}/>
                        <Route path={TYPOGRAPHY + '*'} element={ppr(Typography, {})}/>
                        <Route path={ICONS + '*'} element={ppr(Icons, {})}/>
                        <Route path={MAPS + '*'} element={ppr(Maps, {})}/>
                        <Route path={NOTIFICATIONS + '*'} element={ppr(Notifications, {})}/>
                        <Route path={UPGRADE_TO_PRO + '*'} element={ppr(UpgradeToPro, {})}/>
                        <Route path={'*'} element={<Navigate to={'/' + UI + MATERIAL_DASHBOARD + DASHBOARD}/>}/>
                    </Route>
                    <Route path={MATERIAL_KIT + "*"} element={ppr(MaterialKit, {})}>
                        <Route path={SECTION_NAVBARS + '*'} element={ppr(SectionNavbars, {})}/>
                        <Route path={SECTION_BASICS + '*'} element={ppr(SectionBasics, {})}/>
                        <Route path={SECTION_TABS + '*'} element={ppr(SectionTabs, {})}/>
                        <Route path={SECTION_PILLS + '*'} element={ppr(SectionPills, {})}/>
                        <Route path={SECTION_NOTIFICATIONS + '*'} element={ppr(SectionNotifications, {})}/>
                        <Route path={SECTION_TYPOGRAPHY + '*'} element={ppr(SectionTypography, {})}/>
                        <Route path={SECTION_JAVASCRIPT + '*'} element={ppr(SectionJavascript, {})}/>
                        <Route path={SECTION_COMPLETED_EXAMPLES + '*'} element={ppr(SectionCompletedExamples, {})}/>
                        <Route path={SECTION_LOGIN + '*'} element={ppr(SectionLogin, {})}/>
                        <Route path={LANDING_PAGE + '*'} element={ppr(LandingPage, {})}/>
                        <Route path={SECTION_DOWNLOAD + '*'} element={ppr(SectionDownload, {})}/>
                        <Route path={'*'} element={<Navigate to={'/' + UI + MATERIAL_KIT + SECTION_NAVBARS}/>}/>
                    </Route>
                    <Route path={ADMIN_LTE} element={<AdminLTE/>}>
                        <Route path="recover-password" element={<RecoverPassword/>}/>
                        <Route path="forgot-password" element={<ForgetPassword/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="sub-menu-2" element={<Blank/>}/>
                        <Route path="sub-menu-1" element={<SubMenu/>}/>
                        <Route path="blank" element={<Blank/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="dashboard" element={<AdminLTEDashboard/>}/>
                        <Route path={'*'} element={<Navigate to={'/' + UI + ADMIN_LTE + 'login'}/>}/>
                    </Route>
                    <Route path={'*'} element={<Navigate to={'/' + UI + MATERIAL_DASHBOARD}/>}/>
                </Route>
                <Route path={DOCUMENTATION + '*'} element={ppr<iDocumentation>(Documentation, {
                    headerLinks: [
                        {name: "ORM Introduction", path: "/" + DOCUMENTATION + CARBON_ORM_INTRODUCTION},
                        {name: "PHP", path: "/" + DOCUMENTATION + CARBON_PHP},
                        {name: "Node", path: "/" + DOCUMENTATION + CARBON_NODE},
                        {name: "React", path: "/" + DOCUMENTATION + CARBON_REACT},
                        {name: "WordPress", path: "/" + DOCUMENTATION + CARBON_WORDPRESS},
                        {name: "Java", path: "/" + DOCUMENTATION + CARBON_JAVA},
                        {name: "Implementations", path: "/" + DOCUMENTATION + IMPLEMENTATIONS},
                        {name: "Support", path: "/" + DOCUMENTATION + SUPPORT},
                        {name: "License", path: "/" + DOCUMENTATION + LICENSE}
                    ]
                })}>
                    <Route path={CARBON_ORM_INTRODUCTION + '*'} element={ppr(CarbonORMDocumentation, {})}/>
                    <Route path={CARBON_PHP + '*'} element={ppr(CarbonPHP, {})}/>
                    <Route path={CARBON_NODE + '*'} element={ppr(CarbonNode, {})}/>
                    <Route path={CARBON_REACT + '*'} element={ppr(CarbonReactDocumentation, {})}/>
                    <Route path={CARBON_WORDPRESS + '*'} element={ppr(CarbonWordPress, {})}/>
                    <Route path={CARBON_JAVA + '*'} element={ppr(CarbonJava, {})}/>
                    <Route path={IMPLEMENTATIONS + "*"} element={ppr(Implementations, {})}/>
                    <Route path={SUPPORT + '*'} element={ppr(Support, {})}/>
                    <Route path={LICENSE + "*"} element={ppr(License, {})}/>
                    <Route path={'*'} element={
                        <Navigate to={'/' + DOCUMENTATION
                            + (C6WordPress
                                ? CARBON_WORDPRESS
                                : CARBON_ORM_INTRODUCTION)}
                        />
                    }/>
                </Route>
                <Route path="/landing-page" element={ppr(LandingPage, {})}/>
                <Route path={'*'} element={<Navigate to={'/' + DOCUMENTATION}/>}/>
            </Routes>
            <ToastContainer
                autoClose={3000}
                draggable={false}
                position="top-right"
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnHover
            />
        </>)

    }
}

