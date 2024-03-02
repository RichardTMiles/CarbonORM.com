
export interface iWordPress {
    C6WordPress: boolean,
    C6WordPressVersion: string|false,
    C6PHPVersion: string|false,
    C6AutoLoadPath: string|false,
    C6ComposerPath: string|false,
}

/**
 *      window.C6WordPress = true;
 *     window.C6WordPressAbsPath = '/Users/richardmiles/IdeaProjects/CarbonWordPressExample/';
 *     window.C6WordPressVersion = '0.0.25';
 *     window.C6PHPVersion = '19.2.6';
 *     window.C6AutoLoadPath = '';
 *     window.C6ComposerPath = '/Users/richardmiles/IdeaProjects/CarbonWordPressExample/composer.json';
 */

declare global {
    interface Window {
        C6WordPress?: boolean;
        C6WordPressVersion?: string;
        C6PHPVersion?: string;
        C6AutoLoadPath?: string;
        C6ComposerPath?: string;
    }
}

export const initialWordPressState: iWordPress = {
    C6WordPress: window?.C6WordPress ?? false,
    C6AutoLoadPath: window?.C6AutoLoadPath ?? false,
    C6ComposerPath: window?.C6ComposerPath ?? false,
    C6WordPressVersion: window?.C6WordPressVersion ?? false,
    C6PHPVersion: window?.C6PHPVersion ?? false,
}
