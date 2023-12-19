import {CarbonReact, initialRequiredCarbonORMState, CarbonWebSocket} from "@carbonorm/carbonreact";
import Notifications from "@material-ui/icons/Notifications";
import Carbons from "api/rest/Carbons";
import {initialRestfulObjectsState} from "api/rest/C6";
import {Routes, Route, Navigate} from 'react-router-dom';

import {ppr} from "api/hoc/passPropertiesAndRender";
//import Public from 'layouts/Public';
import Private from 'layouts/Private';
//import PrivateRoutes from "routes/privateRoutes";
//import PublicRoutes from "routes/publicRoutes";
// This is our ajax class
import {authenticateUser, iAuthenticate, initialAuthenticateState} from "state/authenticate";
import {initialUiState, iUi} from "state/ui";
import {initialVersionsState, iVersions} from "state/versions";
import {ToastContainer} from "react-toastify";
import DashboardPage, {DASHBOARD, WP_DASHBOARD} from "views/Dashboard/Dashboard";
import Icons, {ICONS} from "views/Icons/Icons";
import Maps, {MAPS} from "views/Maps/Maps";
import {NOTIFICATIONS} from "views/Notifications/Notifications";
import TableList, {TABLES} from "views/TableList/TableList";
import Typography, {TYPOGRAPHY} from "views/Typography/Typography";
import Dashboard, {DASHBOARD_LAYOUT} from "views/UI/Dashboard";
import UpgradeToPro, {UPGRADE_TO_PRO} from "views/UpgradeToPro/UpgradeToPro";
import UserProfile, {USER_PROFILE} from "views/UserProfile/UserProfile";


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
                <Route path="/" element={ppr(Private, {})}>
                    <Route path={DASHBOARD_LAYOUT + '*'} element={ppr(Dashboard, {})}>
                        <Route path={DASHBOARD +'*'} element={ppr(DashboardPage, {})}/>
                        <Route path={DASHBOARD +'*'} element={ppr(UserProfile, {})}/>
                        <Route path={'*'} element={<Navigate to={DASHBOARD + DASHBOARD}/>}/>
                    </Route>
                    <Route path={WP_DASHBOARD + '*'} element={ppr(DashboardPage, {})}/>
                    <Route path={USER_PROFILE + '*'} element={ppr(UserProfile, {})}/>
                    <Route path={TABLES + '*'} element={ppr(TableList, {})}/>
                    <Route path={TYPOGRAPHY + '*'} element={ppr(Typography, {})}/>
                    <Route path={ICONS + '*'} element={ppr(Icons, {})}/>
                    <Route path={MAPS + '*'} element={ppr(Maps, {})}/>
                    <Route path={NOTIFICATIONS + '*'} element={ppr(Notifications, {})}/>
                    <Route path={UPGRADE_TO_PRO + '*'} element={ppr(UpgradeToPro, {})}/>
                    <Route path={'*'} element={<Navigate to={DASHBOARD + '/'}/>}/>
                </Route>
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

