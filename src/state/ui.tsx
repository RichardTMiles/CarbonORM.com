import CarbonORM from "CarbonORM";
import {initialWordPressState} from "state/wordpress";


export interface iUi {
    documentationVersionURI: string,
    isLoaded: boolean,
    darkMode: boolean,
}

export const initialUiState: iUi  = {
    documentationVersionURI: '0.0.0',
    isLoaded: true,
    darkMode: undefined !== initialWordPressState.C6WordPress,
}


export const switchDarkAndLightTheme = () => {
    CarbonORM.instance.setState({
        darkMode: !CarbonORM.instance.state.darkMode
    });
};