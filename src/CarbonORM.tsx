import {CarbonReact, initialRequiredCarbonORMState, CarbonWebSocket, BackendThrowable} from "@carbonorm/carbonreact";
import Notifications from "@material-ui/icons/Notifications";
//import Carbons from "api/rest/Carbons";
import {initialRestfulObjectsState} from "api/rest/C6";
import CarbonNode, {CARBON_NODE} from "pages/Documentation/CarbonNode/CarbonNode";
import CarbonReactDocumentation, {CARBON_REACT} from "pages/Documentation/CarbonReact/CarbonReact";
import CarbonWordPress, {CARBON_WORDPRESS} from "pages/Documentation/CarbonWordPress/CarbonWordPress";
import {Routes, Route, Navigate, MemoryRouter, HashRouter} from 'react-router-dom';
import {ppr} from "api/hoc/passPropertiesAndRender";

// This is our ajax class
import {iAuthenticate, initialAuthenticateState} from "state/authenticate";
import {initialUiState, iUi} from "state/ui";
import {initialVersionsState, iVersions} from "state/versions";
import {ToastContainer} from "react-toastify";
import DashboardPage, {DASHBOARD} from "pages/UI/MaterialDashboard/Dashboard/Dashboard";
import Documentation, {DOCUMENTATION, iDocumentation} from "pages/Documentation/Documentation";
import CarbonPHP, {CARBON_PHP} from "pages/Documentation/CarbonPHP/CarbonPHP";
import Implementations, {IMPLEMENTATIONS} from "pages/Documentation/Implementations/Implementations";
import License, {LICENSE} from "pages/Documentation/License/License";
import Support, {SUPPORT} from "pages/Documentation/Support/Support";
import Icons, {ICONS} from "pages/UI/MaterialDashboard/Icons/Icons";
import LandingPage, {LANDING_PAGE} from "pages/UI/Sections/LandingPage/LandingPage";
import Maps, {MAPS} from "pages/UI/MaterialDashboard/Maps/Maps";
import {NOTIFICATIONS} from "pages/UI/MaterialDashboard/Notifications/Notifications";
import TableList, {TABLES} from "pages/UI/MaterialDashboard/TableList/TableList";
import Typography, {TYPOGRAPHY} from "pages/UI/MaterialDashboard/Typography/Typography";
import Dashboard, {MATERIAL_DASHBOARD, UI} from "pages/UI/MaterialDashboard";
import MaterialKit, {MATERIAL_KIT} from "pages/UI/MaterialKit";
import SectionBasics, {SECTION_BASICS} from "pages/UI/Sections/SectionBasics";
import SectionCompletedExamples, {SECTION_COMPLETED_EXAMPLES} from "pages/UI/Sections/SectionCompletedExamples";
import SectionDownload, {SECTION_DOWNLOAD} from "pages/UI/Sections/SectionDownload";
import SectionJavascript, {SECTION_JAVASCRIPT} from "pages/UI/Sections/SectionJavascript";
import SectionLogin, {SECTION_LOGIN} from "pages/UI/Sections/SectionLogin";
import SectionNavbars, {SECTION_NAVBARS} from "pages/UI/Sections/SectionNavbars";
import SectionNotifications, {SECTION_NOTIFICATIONS} from "pages/UI/Sections/SectionNotifications";
import SectionPills, {SECTION_PILLS} from "pages/UI/Sections/SectionPills";
import SectionTabs, {SECTION_TABS} from "pages/UI/Sections/SectionTabs";
import SectionTypography, {SECTION_TYPOGRAPHY} from "pages/UI/Sections/SectionTypography";
import UpgradeToPro, {UPGRADE_TO_PRO} from "pages/UI/MaterialDashboard/UpgradeToPro/UpgradeToPro";
import UserProfile, {USER_PROFILE} from "pages/UI/MaterialDashboard/UserProfile/UserProfile";
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

        const {isLoaded, backendThrowable, pureWordpressPluginConfigured} = this.state;


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
                    <Route path={'*'} element={<Navigate to={'/' + UI + MATERIAL_DASHBOARD}/>}/>
                </Route>
                <Route path={DOCUMENTATION + '*'} element={ppr<iDocumentation>(Documentation, {
                    headerLinks: [
                        {name: "ORM Introduction", path: "/" + DOCUMENTATION + CARBON_ORM_INTRODUCTION},
                        {name: "PHP", path: "/" + DOCUMENTATION + CARBON_PHP},
                        {name: "Node", path: "/" + DOCUMENTATION + CARBON_NODE},
                        {name: "React", path: "/" + DOCUMENTATION + CARBON_REACT},
                        {name: "WordPress", path: "/" + DOCUMENTATION + CARBON_WORDPRESS},
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
                    <Route path={IMPLEMENTATIONS + "*"} element={ppr(Implementations, {})}/>
                    <Route path={SUPPORT + '*'} element={ppr(Support, {})}/>
                    <Route path={LICENSE + "*"} element={ppr(License, {})}/>
                    <Route path={'*'} element={
                        <Navigate to={'/' + DOCUMENTATION
                            + (pureWordpressPluginConfigured
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

