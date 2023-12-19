import React from "react";
// noinspection NpmUsedModulesInstalled
import {HashRouter, MemoryRouter} from "react-router-dom";
import {createRoot} from 'react-dom/client';
// Custom CarbonPHP Context Switch
import CarbonORM from "CarbonORM";
import isTest from "variables/isTest";

import "assets/css/material-dashboard-react.css?v=1.5.0";
import '../node_modules/react-toastify/dist/ReactToastify.min.css';


const container = document.getElementById('root');

const root = createRoot(container!);

const reactRouterContext = (children: any) => {

    if (isTest) {

        return <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>

    }

    return <HashRouter>{children}</HashRouter>

}

root.render(<React.StrictMode>{reactRouterContext(

        <CarbonORM />

)}</React.StrictMode>);
