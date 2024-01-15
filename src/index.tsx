import React from "react";
// noinspection NpmUsedModulesInstalled
import {createRoot} from 'react-dom/client';
// Custom CarbonPHP Context Switch
import CarbonORM from "CarbonORM";

// Bootstrap & AdminLTE Assets
//import "bootstrap/dist/css/bootstrap.css";
import "variables/bootstrap.module.scss"
import "bootstrap/dist/js/bootstrap.js";
import "admin-lte/dist/js/adminlte.min.js";


// base Material-UI styles
//import "assets/css/material-dashboard-react.css";
//import 'react-toastify/dist/ReactToastify.min.css';


const container = document.getElementById('root');

const root = createRoot(container!);

root.render(<React.StrictMode>
    <CarbonORM/>
</React.StrictMode>);
