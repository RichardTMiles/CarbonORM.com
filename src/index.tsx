import React from "react";
// noinspection NpmUsedModulesInstalled
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import {createRoot} from 'react-dom/client';
// Custom CarbonPHP Context Switch
import CarbonORM from "CarbonORM";
import isTest from "variables/isTest";

import "assets/css/material-dashboard-react.css?v=1.5.0";

const container = document.getElementById('root');

const root = createRoot(container!);

const reactRouterContext = (children: any) => {

    if (isTest) {

        return <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>

    }

    return <BrowserRouter>{children}</BrowserRouter>

}

root.render(<React.StrictMode>{reactRouterContext(

        <CarbonORM/>

)}</React.StrictMode>);
