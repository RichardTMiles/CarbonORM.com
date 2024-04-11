/**
 *      window.C6WordPress = {
 *         C6WordPressAbsPath: '$absPath',
 *         C6WordPressVersion: '$carbonWordPressVersion',
 *         C6CarbonPHPVersion: '$carbonPHPVersion',
 *         C6AutoLoadPath: '$autoloadPath',
 *         C6ComposerJsonPath: '$lowestComposer',
 *         C6ComposerExecutablePath: '$composerExecPath',
 *         C6PHPVersion: '$phpVersion',
 *         C6WhoAmI: '$whoami',
 *         C6SetupComplete: $setupComplete,
 *     }
 */

declare global {
    interface Window {
        C6WordPress?: {
            C6MigrationRunning: string,
            C6WordPressAbsPath: string,
            C6PastMigrations: string,
            C6WebsocketRunning: boolean,
            C6WebsocketRunningCommand: string,
            C6WordPressLicense: string,
            C6MigrateLicense: string,
            C6WordPressVersion: string,
            C6CarbonPHPVersion: string,
            C6AutoLoadPath: string,
            C6ComposerJsonPath: string,
            C6ComposerExecutablePath: string,
            C6PHPVersion: string,
            C6WhoAmI: string,
            C6Groups: string[],
            C6WordPressUser: string,
            C6SetupComplete: boolean,
        }
    }
}

export interface iWordPress {
    C6WordPress: typeof window.C6WordPress,
}

export const initialWordPressState: iWordPress = {
    C6WordPress: window?.C6WordPress,
}
