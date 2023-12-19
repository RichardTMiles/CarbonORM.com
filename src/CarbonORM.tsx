import {CarbonReact, initialRequiredCarbonORMState, CarbonWebSocket} from "@carbonorm/carbonreact";
import Notifications from "@material-ui/icons/Notifications";
import Carbons from "api/rest/Carbons";
import {initialRestfulObjectsState} from "api/rest/C6";
import {Routes, Route, Navigate} from 'react-router-dom';

import {ppr} from "api/hoc/passPropertiesAndRender";
//import Public from 'layouts/Public';
//import Private from 'layouts/Private';
//import PrivateRoutes from "routes/privateRoutes";
//import PublicRoutes from "routes/publicRoutes";
// This is our ajax class
import {authenticateUser, iAuthenticate, initialAuthenticateState} from "state/authenticate";
import {initialUiState, iUi} from "state/ui";
import {initialVersionsState, iVersions} from "state/versions";
import {ToastContainer} from "react-toastify";
import CarbonORMIntroduction, {CARBON_ORM_INTRODUCTION} from "views/Documentation/Sections/CarbonORMIntroduction";
import DashboardPage, {DASHBOARD} from "views/UI/MaterialDashboard/Dashboard/Dashboard";
import Documentation, {DOCUMENTATION} from "views/Documentation/Documentation";
import CarbonPHP, {CARBONPHP} from "views/Documentation/Sections/CarbonPHP";
import Changelog, {CHANGELOG} from "views/Documentation/Sections/Changelog";
import Dependencies, {DEPENDENCIES} from "views/Documentation/Sections/Dependencies";
import Implementations, {IMPLEMENTATIONS} from "views/Documentation/Sections/Implementations";
import License, {LICENSE} from "views/Documentation/Sections/License";
import Support, {SUPPORT} from "views/Documentation/Sections/Support";
import Icons, {ICONS} from "views/UI/MaterialDashboard/Icons/Icons";
import LandingPage, {LANDING_PAGE} from "views/UI/Sections/LandingPage/LandingPage";
import Maps, {MAPS} from "views/UI/MaterialDashboard/Maps/Maps";
import {NOTIFICATIONS} from "views/UI/MaterialDashboard/Notifications/Notifications";
import TableList, {TABLES} from "views/UI/MaterialDashboard/TableList/TableList";
import Typography, {TYPOGRAPHY} from "views/UI/MaterialDashboard/Typography/Typography";
import Dashboard, {MATERIAL_DASHBOARD, UI} from "views/UI/MaterialDashboard";
import MaterialKit, {MATERIAL_KIT} from "views/UI/MaterialKit";
import SectionBasics, {SECTION_BASICS} from "views/UI/Sections/SectionBasics";
import SectionCompletedExamples, {SECTION_COMPLETED_EXAMPLES} from "views/UI/Sections/SectionCompletedExamples";
import SectionDownload, {SECTION_DOWNLOAD} from "views/UI/Sections/SectionDownload";
import SectionJavascript, {SECTION_JAVASCRIPT} from "views/UI/Sections/SectionJavascript";
import SectionLogin, {SECTION_LOGIN} from "views/UI/Sections/SectionLogin";
import SectionNavbars, {SECTION_NAVBARS} from "views/UI/Sections/SectionNavbars";
import SectionNotifications, {SECTION_NOTIFICATIONS} from "views/UI/Sections/SectionNotifications";
import SectionPills, {SECTION_PILLS} from "views/UI/Sections/SectionPills";
import SectionTabs, {SECTION_TABS} from "views/UI/Sections/SectionTabs";
import SectionTypography, {SECTION_TYPOGRAPHY} from "views/UI/Sections/SectionTypography";
import UpgradeToPro, {UPGRADE_TO_PRO} from "views/UI/MaterialDashboard/UpgradeToPro/UpgradeToPro";
import UserProfile, {USER_PROFILE} from "views/UI/MaterialDashboard/UserProfile/UserProfile";


export const initialCarbonORMState: typeof initialRestfulObjectsState
    & typeof initialRequiredCarbonORMState
    & iAuthenticate
    & iVersions
    & iUi
    & {} = {
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

    componentDidMount() {

        Carbons.Get()

        authenticateUser()
    }

    render() {
        console.log("CarbonORM TSX RENDER");

        const {isLoaded} = this.state;

        if (!isLoaded) {

            return <h2>Loading...</h2>;

        }

        return <>
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
                <Route path={DOCUMENTATION + '*'} element={ppr(Documentation, {})}>
                    <Route path={CARBON_ORM_INTRODUCTION + '*'} element={ppr(CarbonORMIntroduction, {})}/>
                    <Route path={SUPPORT + '*'} element={ppr(Support, {})}/>
                    <Route path={CARBONPHP + '*'} element={ppr(CarbonPHP, {})}/>
                    <Route path={DEPENDENCIES + '*'} element={ppr(Dependencies, {})}/>
                    <Route path={CHANGELOG + "*"} element={ppr(Changelog, {})}/>
                    <Route path={IMPLEMENTATIONS + "*"} element={ppr(Implementations, {})}/>
                    <Route path={LICENSE + "*"} element={ppr(License, {})}/>
                    <Route path={'*'} element={<Navigate to={'/' + DOCUMENTATION + CARBON_ORM_INTRODUCTION}/>}/>
                </Route>
                <Route path="/landing-page" element={ppr(LandingPage, {})}/>
                <Route path={'*'} element={<Navigate to={'/documentation'}/>}/>
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
        </>

    }
}

