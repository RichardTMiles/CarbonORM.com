
export interface iWordPress {
    pureWordpressPluginConfigured: boolean,
    C6WordPressGuidedSetup: boolean,
    C6WordPressVersion: string,
    C6PHPVersion: string,
}


declare global {
    interface Window {
        C6WordPress: any;
        C6WordPressGuidedSetup: any;
        C6WordPressVersion: any;
        C6PHPVersion: any;
    }
}

export const initialWordPressState: iWordPress = {
    pureWordpressPluginConfigured: window?.C6WordPress ?? false,
    C6WordPressGuidedSetup: window?.C6WordPressGuidedSetup ?? false,
    C6WordPressVersion: window?.C6WordPressVersion ?? false,
    C6PHPVersion: window?.C6PHPVersion ?? false,
}
