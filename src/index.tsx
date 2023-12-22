import React from "react";
// noinspection NpmUsedModulesInstalled
import {createRoot} from 'react-dom/client';
// Custom CarbonPHP Context Switch
import CarbonORM from "CarbonORM";

import "assets/css/material-dashboard-react.css?v=1.5.0";
import '../node_modules/react-toastify/dist/ReactToastify.min.css';


const container = document.getElementById('root');

const root = createRoot(container!);

root.render(<React.StrictMode>
    <CarbonORM/>
</React.StrictMode>);
