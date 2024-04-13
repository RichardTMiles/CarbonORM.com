import {SystemUpdate} from "@material-ui/icons";
import Code from "@material-ui/icons/Code";
import CompareArrows from "@material-ui/icons/CompareArrows";
import Power from "@material-ui/icons/Power";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import Ansi from "ansi-to-react";
import CarbonORM from "CarbonORM";
import SupportMe from "components/SupportMe/SupportMe";
import Pricing from "pages/Documentation/CarbonWordPress/Pricing";
import FetchMarkdownWithGrid from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdownWithGrid";
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import NavPills from "pages/UI/MaterialUI/components/NavPills/NavPills";
import Button from "pages/UI/MaterialUI/components/CustomButtons/Button";

import {useEffect, useState} from "react";


/*interface iPayPalSubscriptionPlans {
    bulkLicenseDiscountPercentage: {
        [key: string]: number
    },
    EnterpriseBaseLicenseCost: number,
    OrganizationBaseLicenseCost: number,
    NonProfitBaseLicenseCost: number,
    IndividualBaseLicenseCost: number,
}*/


export const CARBON_WORDPRESS: string = 'CarbonWordPress/';

const remoteUrlVerifyRegex = /https?:\/\/(?:[a-z0-9-]+\.)*[a-z0-9]+\//;


let verifiedUrlCache: {
    [key: string]: boolean
} = {};

export default function CarbonWordPress() {

    const wordpress = CarbonORM.instance.state?.C6WordPress;

    const {
        C6MigrationRunning,
        C6WordPressAbsPath,
        C6WebsocketRunning,
        C6WebsocketRunningCommand,
        C6MigrateLicense,
        C6WordPressVersion,
        C6CarbonPHPVersion,
        C6AutoLoadPath,
        C6ComposerJsonPath,
        C6ComposerExecutablePath,
        C6PHPVersion,
        C6WhoAmI,
        C6Groups,
        C6SetupComplete,
        C6PastMigrations,
        C6WordPressLicense,
        C6WordPressUser,
    } = wordpress ?? {};

    const DEFAULT_REMOTE_URL = 'https://www.example.com/';

    const [iStartedMigration, setIStartedMigration] = useState<boolean>(false);
    const [websocketLog, setWebsocketLog] = useState<string>('');
    const [migrationInProgress, setMigrationInProgress] = useState<boolean>(false);
    const [licenseVerified, setLicenseVerified] = useState<boolean>(false);
    const [showReadMe, setShowReadMe] = useState(!C6WordPressVersion);
    const [remoteURL, setRemoteURL] = useState<string>(DEFAULT_REMOTE_URL);
    const [c6WPLicense, setC6WPLicense] = useState<string>(C6WordPressLicense ?? '');
    const [remoteAPIKey, setRemoteAPIKey] = useState<string>(C6MigrateLicense ?? '');
    const [remoteFoldersToTransfer, setRemoteFoldersToTransfer] = useState<string>('wp-content/plugins,wp-content/mu-plugins,wp-content/themes,wp-content/uploads');
    const [composerUpdateOutput, setComposerUpdateOutput] = useState<undefined | null | string>(undefined);
    const [migrationCommandOutput, setMigrationCommandOutput] = useState<string>('');
    const [migrationOutput, setMigrationOutput] = useState<undefined | null | string>(undefined);
    const [planInfo, setPlanInfo] = useState<any>(undefined);
    const C6WordpressFullyLoaded = C6SetupComplete && '' !== C6AutoLoadPath;

    let pastMigrations: {
        [key: string]: {
            [key: string]: null
        }
    } = JSON.parse(C6PastMigrations ?? '{}');

    useEffect(() => {
        // double verify the license when true? this could be good, stop little fucks?
        void fetch('https://systems.miles.systems/CarbonWordPress/' + (iStartedMigration ? 'commit' : 'inquire') + '/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: C6WordPressUser,
                domain: (remoteURL),
                license: c6WPLicense
            })
        }).then(response => response.json())
            .then(json => {
                setPlanInfo(json)
                // this rather than state because it will be harder for the user to change
                if (json.plan_name) {
                    setLicenseVerified(true);
                }
                console.log('CarbonWordPress license response', json);
            })
    }, [c6WPLicense, remoteURL, C6WordPressUser, iStartedMigration])

    function updateComposerUpdateOutput() {

        if (composerUpdateOutput === null) {

            return;

        }

        setComposerUpdateOutput(null);

        fetch('/c6wordpress/logs/composer/update/')
            .then(response => response.text())
            .then(text => setComposerUpdateOutput(text));

    }

    useEffect(() => {

        const remoteUrlCorrect = remoteURL.match(remoteUrlVerifyRegex);

        if (remoteURL === '' || remoteURL === DEFAULT_REMOTE_URL || !remoteUrlCorrect) {
            return;
        }

        if (verifiedUrlCache[remoteURL] === true) {
            return;
        }

        fetch(remoteURL + 'c6wordpress/migrate/verify/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                remoteURL,
                remoteAPIKey
            })
        }).then(response => response.text())
            .then(text => {

                if (text.match(remoteUrlVerifyRegex) && remoteURL !== text) {
                    setRemoteURL(text)
                    verifiedUrlCache[text] = true;
                }
            })
    }, [remoteURL, remoteAPIKey])

    function startMigrationPostRequest() {

        setIStartedMigration(true);

        if (migrationInProgress === true) {
            return
        }

        setMigrationInProgress(true);

        // todo - add stop condition for migration; regex the logs
        fetch('/c6wordpress/migrate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                remoteURL,
                remoteAPIKey,
                remoteFoldersToTransfer
            })
        }).then(response => response.text())
            .then(text => {
                setMigrationCommandOutput(text)
            })

    }

    useEffect(() => {

        const updateWebSocketLog = () => {
            fetch('/c6wordpress/logs/websocket')
                .then(response => response.text())
                .then(text => setWebsocketLog(text));
        }

        const migrationLog = () => {

            if (migrationOutput === null) {
                return;
            }

            setMigrationOutput(null);

            fetch('/c6wordpress/logs/migrate')
                .then(response => response.text())
                .then(text => {
                    setMigrationOutput(text)
                    // regex match Completed in 0.0 seconds in text
                    if (text.match(/Completed in /g)
                        || text.match(/CarbonPHP\\Error\\PrivateAlert/g)
                        || text.match(/CarbonPHP\\Error\\PublicAlert/g)) {
                        setMigrationInProgress(false);
                    }
                });
        }

        if (!C6WordpressFullyLoaded) {
            return
        }

        if (undefined === migrationOutput) {
            migrationLog();
        }

        const interval = setInterval(updateWebSocketLog, 7000);

        let intervalMigrate: NodeJS.Timer | null = null;

        if (migrationInProgress) {

            intervalMigrate = setInterval(migrationLog, 5000);

        }

        return () => {
            clearInterval(interval);
            intervalMigrate && clearInterval(intervalMigrate);
        }


    }, [migrationInProgress, C6WordpressFullyLoaded, migrationOutput])


    return <GridContainer>
        {C6WordPressVersion && <>
            <GridItem sm={0} md={2}/>
            <GridItem sm={12} md={8}>
                <h1>Welcome to CarbonWordPress!</h1>
                <p>Please report any issues to <a href={'https://github.com/CarbonORM/CarbonWordPress/issues'}>our
                    GitHub Issues page</a>.</p>

            </GridItem>
            <GridItem sm={0} md={2}/>
            <br/>
            {licenseVerified || <SupportMe/>}
            <br/>
            <GridItem sm={0} md={2}/>
            <GridItem xs={12} sm={12} md={8} lg={8}>
                <NavPills
                    color="primary"
                    tabs={[

                        {
                            tabButton: "Migrate",
                            tabIcon: CompareArrows,
                            tabContent: (
                                <div>
                                    <h1>Past Backups</h1>
                                    <p>Coming soon: revert the database using previous migrations!</p>
                                    {Object.keys(pastMigrations).length === 0 ?
                                        <p>No past
                                            migrations</p> : Object.keys(pastMigrations).map((migration, index) => <p
                                            key={index}>{migration}</p>)}
                                    <br/>
                                    <br/>
                                    <br/>
                                    <h1>Import WordPress from another server</h1>
                                    <p>
                                        This is a tool to help you migrate your WordPress installation to another.
                                        CarbonWordPress is a guided user interface for CarbonPHP. You can use command
                                        line tools to perform the same operations. WordPress tool is designed to be used
                                        by developers and the non-technical alike. It is a powerful tool that can be
                                        used in production environments.
                                        <br/><br/>
                                        This is by far the fastest and most reliable plugin that will migrate WordPress
                                        installations. It was built in response to the current tools costing $$$ but
                                        fail all to
                                        often. You should never have to restart a migration due to a timeout or other
                                        (500-599)
                                        small network error. Moreover, if I give you an honest review, I expect it not
                                        to get deleted. Censorship makes me angry so I built a tool that is 1000x better
                                        and free :)
                                        <br/><br/>
                                        All data is compiled on the remote before being sent to the local server. All
                                        data is transferred to the local server before being written to the database. We
                                        use
                                        tools like `mysqldump` and MySQL shell commands directly to make sure the data
                                        is
                                        transferred as fast as possible with total consistency. For N00B's the mysqldump
                                        tool actually ships with `mysql` and is almost certainly already on your
                                        computer
                                        with MySQL installed.
                                        <br/><br/>
                                        The most difficult part of the migration is the URL and
                                        ABSPATH replacement. We must use a complex `awk` command to replace the
                                        URL and ABSPATH in the database transfer files. This is due to <a
                                        href={'https://www.php.net/manual/en/function.serialize.php'}>PHP serialize </a>
                                        needing the character count to be correct before and after the replacement. In
                                        past implementations of this tool we used a pure PHP solution, but this proved
                                        impossible to scale reliably with databases over 1GB. Currently the commands to
                                        search and replace the are done using a shell execute command. <b>We have seen
                                        significant speed improvements when <u>gawk</u> and <u>gsed</u> are installed
                                        on the system.</b> The migration tool will check for these commands and use them
                                        if they are available. If they are not available and cannot be automatically
                                        installed, the tool will use the slower programs.
                                        <br/><br/>
                                        CarbonWordPress (CarbonPHP) must be installed on the server you are trying to
                                        import from. The default API key populated in the input forum below is the one
                                        found on THIS SERVER. This MAY NOT REFLECT the migration key your remote server
                                        has generated. Please use the appropriate key located on the remote server.
                                        The <b>migration-license.php</b> file in the root of your project maybe tracked
                                        for ease of use or placed in your <b>.gitignore</b> file for increased security
                                        in your environments.
                                        <br/><br/>
                                        The remote URL must match the regex: <b>{remoteUrlVerifyRegex.toString()}</b>. A
                                        validation check will be performed on the remote server to ensure the URL is
                                        accurate and consistent with the <b>site_url</b> option in the remote WordPress
                                        installation. It is imperative the replacement URL is accurate and will be
                                        automatically changed in your input forum if it is not. This could mean, for
                                        example, adding or removing <b>www</b> or other subdomain from the URL.
                                        <br/><br/>
                                        Upon successful migration, you may be logged out of wordpress and asked to log
                                        back in. This is due to internal WordPress session management resetting.
                                        <br/><br/>
                                        I'm looking for work! You can reach out to me directly on <a
                                        href={'https://linkedin.com/in/richardtmiles'}>LinkedIn</a> and be sure to
                                        <a href='https://github.com/CarbonORM/CarbonWordPress'> star the project on
                                            GitHub!</a> Any issues with CarbonWordPress should be reported on the <a
                                        href={'https://github.com/CarbonORM/CarbonWordPress/issues'}>
                                        GitHub Issues page.</a>
                                    </p>
                                    {!migrationInProgress && <>
                                        <br/>Remote URL: (ie. https://www.example.com/))
                                        <br/><input value={remoteURL}
                                                    style={{
                                                        border: verifiedUrlCache[remoteURL] === true && remoteURL.match(remoteUrlVerifyRegex) ? '1px solid green' : '1px solid red',
                                                        width: '100%'
                                                    }}
                                                    onChange={e => setRemoteURL(e.target.value)}/>
                                        <br/>Remote Migrate API Key:
                                        <br/><input value={remoteAPIKey}
                                                    style={{
                                                        width: '100%'
                                                    }}
                                                    onChange={e => setRemoteAPIKey(e.target.value)}/>
                                        <br/>Transfer Folders:
                                        <br/><input value={remoteFoldersToTransfer}
                                                    style={{
                                                        width: '100%'
                                                    }}
                                                    onChange={e => setRemoteFoldersToTransfer(e.target.value)}/>


                                    </>}
                                    <br/><br/>
                                    <button disabled={verifiedUrlCache[remoteURL]}
                                            onClick={migrationInProgress ? () => setMigrationInProgress(false) : startMigrationPostRequest}>
                                        {migrationInProgress ? 'Stop updating the log' : 'Migration Start'}
                                    </button>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <h3>Migration Log</h3>
                                    <div style={{
                                        height: '100vh ',
                                        overflow: 'auto',
                                        display: 'flex',
                                        flexDirection: 'column-reverse',
                                        margin: '2em',
                                        border: '1px solid lightgreen'
                                    }}>
                                        {migrationOutput?.split('\n').reverse().map((line, index) => <Ansi
                                            key={index}>{line}</Ansi>) ?? 'No output yet'}
                                    </div>
                                    {licenseVerified && <>
                                        <h3>Start Command</h3>
                                        <div style={{
                                            height: '25vh ',
                                            overflow: 'auto',
                                            display: 'flex',
                                            flexDirection: 'column-reverse',
                                            margin: '2em',
                                            border: '1px solid blue'
                                        }}>
                                            {migrationCommandOutput?.split('\n').reverse().map((line, index) => <Ansi
                                                key={index}>{line}</Ansi>) ?? 'No migration command has been sent'}
                                        </div>
                                    </>}
                                </div>
                            )
                        },
                        {
                            tabButton: "WebSocket Log",
                            tabIcon: Power,
                            tabContent: (
                                <div>
                                    <h1>WebSocket.txt</h1>
                                    <div style={{
                                        height: '50vh ',
                                        overflow: 'auto',
                                        display: 'flex',
                                        flexDirection: 'column-reverse',
                                        margin: '2em'
                                    }}>
                                        {websocketLog.split('\n').reverse().map((line, index) => <Ansi
                                            key={index}>{line}</Ansi>)}
                                    </div>
                                </div>
                            )
                        },
                        {
                            tabButton: "Update Composer",
                            tabIcon: SystemUpdate,
                            tabContent: (
                                <div>
                                    <h1>Composer Update</h1>
                                    {composerUpdateOutput !== null && <button onClick={updateComposerUpdateOutput}>
                                        Update Composer
                                    </button>}
                                    <div style={{
                                        height: '25vh ',
                                        overflow: 'auto',
                                        display: 'flex',
                                        flexDirection: 'column-reverse',
                                        margin: '2em'
                                    }}>
                                        {composerUpdateOutput === null ? 'Updating...' : composerUpdateOutput?.split('\n').reverse().map((line, index) =>
                                            <Ansi key={index}>{line}</Ansi>)}
                                    </div>
                                </div>
                            )
                        },
                        {
                            tabButton: "License",
                            tabIcon: '' === C6WordPressLicense ? Lock : LockOpen,
                            tabContent: (
                                <div>
                                    <h1>CarbonWordPress License</h1>
                                    {licenseVerified || <Pricing/>}
                                    <p>
                                        CarbonWordPress is a project by Richard T. Miles and is a part of the CarbonORM
                                        project. Licenses are distributed by email after a successful PayPal
                                        Confirmation.
                                    </p><br/>
                                    <textarea onChange={(event) => setC6WPLicense(event.target.value)}>
                                        {C6WordPressLicense}
                                    </textarea><br/>
                                    {planInfo && planInfo.plan_name && <p>Plan Name: {planInfo.plan_name}</p>}
                                    <Button onClick={() => {
                                        console.log('send request to this servers C6WordPressLicense')
                                        // systems.miles.systems/c6wordpress/migrate/addLicense/
                                        // post data license; this is only an operation for the local server
                                        fetch('/c6wordpress/migrate/addLicense/', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                email: C6WordPressUser,
                                                domain: remoteURL,
                                                license: c6WPLicense
                                            })
                                        }).then(response => response.text())
                                            .then(text => {
                                                console.log('CarbonWordPress license response', text);
                                            });
                                    }}>
                                        Update License
                                    </Button><br/><br/>
                                    <p>
                                        A license file will be created/updated after you confirm <b>Updating the
                                        License</b>.
                                        This is a change that will affect everyone on this server and potentially even
                                        domain. If
                                        your domain utilizes multiple servers in a load balanced environment, it is best
                                        to
                                        add and track your license file locally with your version control system (git),
                                        then
                                        push it up to development and live servers. If you are a small business or
                                        individual
                                        developer, you most likely will not need to worry about this. Licenses will not
                                        be verified when you submit this forum. This is by design so you can quickly
                                        remove a valid license.
                                    </p>
                                    <p>
                                        Metrics and license tracking is collected to discourage piracy and to help with
                                        overall security. Information collected is limited to: email, domain, and
                                        license key.
                                        Other debugging information maybe collected for the purpose of improving the
                                        software.
                                        This information will not be shared directly with any third party and will not
                                        include information other than server configuration, software versioning, and
                                        migration
                                        debugging logs. Migration sql or files will NEVER be sent to our servers.
                                    </p>
                                    <p>
                                        If logging data is collected which reasonably could identify illegal activity
                                        such as human or drug trafficking, our algorithms will automatically send a
                                        report to the appropriate authorities. Generally, this is limited to what is
                                        printed in your migration logging, but any metrics collected will be shared with
                                        the appropriate legal authority. We are fully committed to making the world a
                                        better place.
                                    </p>
                                </div>
                            )
                        },
                        {
                            tabButton: "Debugging Info",
                            tabIcon: Code,
                            tabContent: (
                                <div>
                                    <h1>CarbonWordPress is fully setup and running correctly.</h1>
                                    <p>CarbonWordPress Version: {C6WordPressVersion}</p>
                                    <p>CarbonPHP Version: {C6CarbonPHPVersion}</p>
                                    <p>PHP Version: {C6PHPVersion}</p>
                                    <p>Setup Complete: {C6SetupComplete ? 'Yes' : 'No'}</p>
                                    <p>Migrate Status: {C6MigrationRunning}</p>
                                    <p>CarbonWordPress License: {C6WordPressLicense}</p>
                                    <p>Migrate API key: {C6MigrateLicense}</p>
                                    <p>Websocket Status: {C6WebsocketRunning}</p>
                                    <p>Websocket Running Command: {C6WebsocketRunningCommand}</p>
                                    <p>WordPress User: {C6WordPressUser}</p>
                                    <p>User: {C6WhoAmI}</p>
                                    <p>Groups: {C6Groups?.join(', ')}</p>
                                    <p>Application Path (ABSPATH): {C6WordPressAbsPath}</p>
                                    <p>Autoload Path: {C6AutoLoadPath}</p>
                                    <p>Composer Json Path: {C6ComposerJsonPath}</p>
                                    <p>Composer Executable Path: {C6ComposerExecutablePath}</p>
                                </div>
                            )
                        },
                    ]}
                />
            </GridItem>
            <GridItem sm={0} md={2}/>
        </>}

        {
            C6WordPressVersion && <button onClick={() => setShowReadMe(!showReadMe)}>
                {showReadMe ? 'Hide README' : 'Show README'}
            </button>
        }

        {
            !C6WordPressVersion && <>
                <GridItem sm={0} md={2}/>
                <GridItem sm={12} md={8}>
                    <Pricing/>
                </GridItem>
                <GridItem sm={0} md={2}/>
            </>
        }

        {
            showReadMe && <>
                <GridItem sm={0} md={2}/>
                <GridItem sm={12} md={8}>
                    <h1>Carbon WordPress (README.md)</h1>
                </GridItem>
                <GridItem sm={0} md={2}/>

                <FetchMarkdownWithGrid url={'https://raw.githubusercontent.com/CarbonORM/CarbonWordPress/main/README.md'}/>
            </>
        }
    </GridContainer>
}