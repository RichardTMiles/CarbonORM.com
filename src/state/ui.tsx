import CarbonORM from "CarbonORM";


export interface iUi {
    pureWordpressPluginConfigured?: boolean,
    documentationVersionURI: string,
    isLoaded: boolean,
    darkMode: boolean,
}

export const initialUiState: iUi = {
    pureWordpressPluginConfigured: false,
    documentationVersionURI: '0.0.0',
    isLoaded: false,
    darkMode: true,
}


export const switchDarkAndLightTheme = () => {
    CarbonORM.instance.setState({
        darkMode: !CarbonORM.instance.state.darkMode
    });
};