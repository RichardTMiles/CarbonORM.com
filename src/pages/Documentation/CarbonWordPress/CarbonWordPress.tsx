import {Slider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {School, SystemUpdate} from "@material-ui/icons";
import Code from "@material-ui/icons/Code";
import CompareArrows from "@material-ui/icons/CompareArrows";
import Power from "@material-ui/icons/Power";
import Group from "@material-ui/icons/Group";
import Public from "@material-ui/icons/Public";
import Person from "@material-ui/icons/Person";
import VideoLibrary from "@material-ui/icons/VideoLibrary";
import Favorite from '@material-ui/icons/Favorite';
import Ansi from "ansi-to-react";
import CarbonORM from "CarbonORM";
import PayPalButtonComponent from "components/PayPal/PayPal";
import SupportMe from "components/SupportMe/SupportMe";
import FetchMarkdownWithGrid from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdownWithGrid";
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import NavPills from "pages/UI/MaterialUI/components/NavPills/NavPills";
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

function formatDollarAmount(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}


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
    } = wordpress ?? {};

    const DEFAULT_REMOTE_URL = 'https://www.example.com/';

    const [numberOfDomains, setNumberOfDomains] = useState<number>(5);
    const [numberOfOperators, setNumberOfOperators] = useState<number>(20);
    const [websocketLog, setWebsocketLog] = useState<string>('');
    const [migrationInProgress, setMigrationInProgress] = useState<boolean>(false);
    const [showReadMe, setShowReadMe] = useState(!C6WordPressVersion);
    const [remoteURL, setRemoteURL] = useState<string>(DEFAULT_REMOTE_URL);
    const [remoteAPIKey, setRemoteAPIKey] = useState<string>(C6MigrateLicense ?? '');
    const [remoteFoldersToTransfer, setRemoteFoldersToTransfer] = useState<string>('wp-content/plugins,wp-content/mu-plugins,wp-content/themes,wp-content/uploads');
    const [composerUpdateOutput, setComposerUpdateOutput] = useState<undefined | null | string>(undefined);
    const [migrationCommandOutput, setMigrationCommandOutput] = useState<string>('');
    const [migrationOutput, setMigrationOutput] = useState<undefined | null | string>(undefined);
    const C6WordpressFullyLoaded = C6SetupComplete && '' !== C6AutoLoadPath;

    let pastMigrations: {
        [key: string]: {
            [key: string]: null
        }
    } = JSON.parse(C6PastMigrations ?? '{}');

    function bulkLicenseDiscountPercentage(individual: boolean) {
        return individual ? {
            2: 0.10,
            4: 0.15,
            6: 0.20,
            10: 0.25,
            12: 0.30,
            15: 0.35,
        } : {
            10: 0.10,
            15: 0.15,
            20: 0.20,
            25: 0.25,
            30: 0.30,
            35: 0.35,
            40: 0.40
        }
    }

    function getDiscountPercentage(numberOfLicenses: number, individual: boolean) {
        if (numberOfLicenses === 1) {
            return 0;
        }

        const discountPercentages = bulkLicenseDiscountPercentage(individual);

        for (let i = numberOfLicenses; i >= 2; i--) {
            if (discountPercentages[i]) {
                return discountPercentages[i];
            }
        }

        return 0;
    }

    function getLicenseCost(baseCost: number, numberOfLicenses: number, individual: boolean) {
        if (numberOfLicenses === 1) {
            return baseCost;
        }

        let discount = getDiscountPercentage(numberOfLicenses, individual);

        return baseCost * (1 - discount);
    }


    const individualLicenseBaseCost = 120;
    const individualLicenseDiscount = getDiscountPercentage(numberOfDomains, true);
    const individualLicenseCost = getLicenseCost(individualLicenseBaseCost, numberOfDomains, true);
    const individualLicenseTotalCost = individualLicenseCost * numberOfDomains;
    const organizationLicenseBaseCost = 750;
    const organizationLicenseDiscount = getDiscountPercentage(numberOfOperators, false);
    const organizationLicenseCost = getLicenseCost(organizationLicenseBaseCost, numberOfOperators, false);
    const organizationLicenseTotalCost = organizationLicenseCost * numberOfOperators;

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

    const premiumFeatures = <>
        <li>Unlimited WordPress Database Migrations</li>
        <li>Unlimited Media and Upload imports</li>
        <li>Unlimited Theme and Plugin imports</li>
        <li>Arbitrary File and Folder importer</li>
        <li>Database Only Importer</li>
        <li>File Only Importer</li>
        <li>Restore from Previous Migrations</li>
        <li>Adjustment of Folder Compression Sizes</li>
        <li>Table Exclusions</li>
        <li>Multisite Support</li>
        <li>Super fast migration - Multi-threading toggle</li>
        <li>Continuous Integration and Development CI/CD Cli Support</li>
    </>

    enum ePricingInformation {
        INDIVIDUAL,
        ORGANIZATION,
        NONPROFIT
    }

    function pricingInformation(type: ePricingInformation) {


                switch (type) {
                    case ePricingInformation.NONPROFIT:
                        return <p>
                            Non Profits with tax exempt status will save an additional 50% along with any bulk pricing
                            discounts. <br/>
                            Purchasing the <b>{numberOfOperators} Operators License</b> will qualify for a
                            <b style={{color: "green"}}> {50 + organizationLicenseDiscount * 100}% discount</b>,
                            from <s>${(organizationLicenseBaseCost).toFixed(2)}</s> down to <b
                            style={{color: "green"}}>${(organizationLicenseCost / 2).toFixed(2)}</b>.<br/>
                            <b style={{color: "green"}}>
                                {numberOfOperators} Non Profit Operators License<br/>
                                Totaling {formatDollarAmount(organizationLicenseTotalCost / 2)} Annually
                            </b>
                            <Button color="primary" onClick={() => {
                                window.open('mailto:richard@miles.systems?subject=Non Profit Request&body=Please include a link to your institution. We will respond within 24 hours.')
                            }}/>
                        </p>
                    case ePricingInformation.ORGANIZATION:
                        return <p>{0 !== organizationLicenseDiscount && <>
                            You will save <b style={{color: "green"}}>{organizationLicenseDiscount * 100}%</b>,
                            from <s>${organizationLicenseBaseCost.toFixed(2)}</s> down to <b
                            style={{color: "green"}}>${organizationLicenseCost.toFixed(2)}</b>, when you buy
                            the <b>{numberOfOperators} Operators License</b>!<br/>
                        </>}
                            <b style={{color: "green"}}>
                                {numberOfOperators} Operators License<br/>
                                Totaling {formatDollarAmount(organizationLicenseTotalCost)} Annually
                            </b>
                            <PayPalButtonComponent/>
                        </p>
                    case ePricingInformation.INDIVIDUAL:
                        return <p>{0 !== individualLicenseDiscount && <>
                            You will save <b style={{color: "green"}}>{individualLicenseDiscount * 100}%</b>,
                            from <s>${individualLicenseBaseCost.toFixed(2)}</s> down to <b
                            style={{color: "green"}}>${individualLicenseCost.toFixed(2)}</b>, when you buy
                            the <b>{numberOfDomains} domain license</b>!<br/>
                        </>}
                            <b style={{color: "green"}}>
                                {numberOfDomains} Domain License<br/>
                                Totaling {formatDollarAmount(individualLicenseTotalCost)} Annually
                            </b>
                            <PayPalButtonComponent/>
                        </p>

                }


    }

    const WebSocketInfo = <>
        <h3>WebSocket Features</h3>
        <p>
            Our WebSocket is a powerful tool that allows you to interact with your server in real time.
            This means interactions like live chat, real time updates, and other features that require a
            refresh or a page load can be done without refreshing the page. It avoids making XHR
            (AJAX) requests by keeping a persistent connection open between your server and the browser. This reduces
            the overall throughput of your server and allows for faster and more efficient communication.
            It provides the backbone for powerful features like:
        </p>
        <ul>
            <li>Real Time Messaging</li>
            <li>Real Time Logging</li>
            <li>Real Time File Watching</li>
            <li>Real Time Database Watching</li>
            <li>Real Time Notifications</li>
            <li>Faster than XHR/AJAX timers</li>
        </ul>
        <p>
            Less Total Server Upload and Download means less electricity and more money in your pocket.
        </p>
        <p>
            "There is no better user expense than watching the notification bar change from one to ten in real time" -
            Richard Miles
        </p>
        <p>
            Not all servers can accommodate for WebSockets and currently requires port binding ability.
            <i>
                We are experimenting with a single threaded model which should allow for sockets on shared hosts,
                so check back soon!
            </i>
            A good rule of thumb is if you are using a shared hosting provider, you will not be able to use WebSockets.
            If you are using a VPS or dedicated server, or just have root(sudo) access, you will be able to use
            WebSockets. Google Cloud, AWS, and Azure all support WebSockets.
        </p>
        <br/>
        <a href={'https://caniuse.com/websockets'}>
            All Major Browsers Support WebSockets
        </a>
        <br/>
        <p>
            CarbonWordPress WebSockets are currently in Beta and is currently only supported on <b>apache</b> web
            servers.
            Appropriate <b>mod_proxy</b> and <b>mod_proxy_wstunnel</b> modules must be enabled. We do plan on
            supporting <b>nginx</b> in the future. Manual installation on <b>nginx</b> is possible.
        </p>
    </>

    const PRICING = <div style={{
        backgroundColor: 'lightblue',
        padding: '1em',
        borderRadius: '1em',
    }}>
        <h1>Carbon WordPress Pricing</h1>

        <p>
            Our free version comes with PHP's best error handling and logging system.
            We've invested a LOT of time writing code to help you debug your WordPress installation and
            want you to <b>have it for FREE</b>. Our migration tool offers basic database, theme, plugin, and upload
            support.
            The free version lacks the ability to customize the stock migration process.
            The basic usage this is probably enough for many small sites. For larger businesses, organizations,
            and/or super users, we offer a variety of licenses to fit your needs. It is important to download and
            test the free version before purchasing a license. We offer a 30 day money back guarantee. Developers may
            find cloning our <a href={'https://github.com/CarbonORM/CarbonWordPressExample/'}>example repository </a>
            locally, installing the plugin on their existing wordpress instance, and running migration
        </p>
        <NavPills
            color="info"
            tabs={[
                {
                    tabButton: "Individual",
                    tabIcon: Person,
                    tabContent: <div style={{
                        padding: "1em"
                    }}>
                        <h1>Individual licenses are priced per domain</h1>
                        <h2>CarbonWordPress {numberOfDomains} Domain License</h2>
                        <Slider min={1} max={20} defaultValue={numberOfDomains} onChange={(_event, value) => {
                            setNumberOfDomains(value as number)
                        }} aria-label="Default" valueLabelDisplay="auto"/>
                        {pricingInformation(ePricingInformation.INDIVIDUAL)}
                        <p>
                            The Individual license is for a <u>single developer or operator</u> to use across single or
                            multiple domains based on license.
                        </p>
                        <h3>Migration Features</h3>
                        <ul>
                            <li>One User</li>
                            {premiumFeatures}
                        </ul>
                        {WebSocketInfo}
                    </div>
                },
                {
                    tabButton: "Organization",
                    tabIcon: Group,
                    tabContent: <div style={{
                        padding: "1em"
                    }}>
                        <h1>Organization licenses are priced per operator</h1>
                        <Slider min={2} max={99}
                                step={1}
                                value={numberOfOperators} onChange={(_event, value) => {
                            setNumberOfOperators(value as number)
                        }} aria-label="Default" valueLabelDisplay="auto"/>
                        {pricingInformation(ePricingInformation.ORGANIZATION)}
                        <h3>Migration Features</h3>
                        <ul>
                            <li>Unlimited Domains</li>
                            {premiumFeatures}
                        </ul>
                        {WebSocketInfo}
                    </div>

                },
                {
                    tabButton: "Enterprise",
                    tabIcon: Public,
                    tabContent: <div style={{
                        padding: "1em"
                    }}>
                        <h1>Enterprise License grants full unrestricted access</h1>
                        <p>
                            <b style={{color: "green"}}>
                                Unlimited Migration Operators<br/>
                                Unlimited Domains<br/>
                                Priority Support<br/>
                                Unparalleled Performance<br/>
                                Real Time Communication<br/>
                                Totaling $45,000 Annually
                            </b>
                        </p>
                        <h3>Migration Features</h3>
                        <ul>
                            <li>Unlimited Migration Operators</li>
                            <li>Unlimited Domains</li>
                            <li>Operational Support</li>
                            <li>Optional In Person or Online Training</li>
                            <li>Optional Annual Security Review</li>
                            {premiumFeatures}
                        </ul>
                        {WebSocketInfo}
                    </div>
                },
                {
                    tabButton: "Non Profit",
                    tabIcon: Favorite,
                    tabContent: <div style={{
                        padding: "1em"
                    }}>
                        <h1>Non Profit licenses are priced per operator</h1>
                        <Slider min={2} step={1} max={199} value={numberOfOperators} onChange={(_event, value) => {
                            setNumberOfOperators(value as number)
                        }} aria-label="Default" valueLabelDisplay="auto"/>
                        {pricingInformation(ePricingInformation.NONPROFIT)}
                        <h3>Migration Features</h3>
                        <ul>
                            <li>Unlimited Domains</li>
                            {premiumFeatures}
                        </ul>
                        {WebSocketInfo}
                    </div>
                },
                {
                    tabButton: "Students & Teachers",
                    tabIcon: School,
                    tabContent: <div style={{
                        padding: "1em"
                    }}>
                        <h1>Students & Teachers</h1>
                        <p><b style={{color:"green"}}>Free for academic, non-commercial, projects!</b></p>
                        <p>For academic access only. Education licenses may not be used on commercial products.</p>
                        <ul>
                            <li>Unlimited Domains</li>
                            <li>Unlimited Operators</li>
                            {premiumFeatures}
                        </ul>
                        {WebSocketInfo}
                    </div>
                },
                {
                    tabButton: "Videos",
                    tabIcon: VideoLibrary,
                    tabContent: <div style={{
                        padding: "1em"
                    }}>
                        <h1>Online Tutorials</h1>
                        <p>Arriving April 2024!</p>
                    </div>
                }
            ]}
        /></div>

    return <GridContainer>
        {C6WordPressVersion && <>
            <GridItem sm={0} md={2}/>
            <GridItem sm={12} md={8}>
                <h1>Welcome to CarbonWordPress!</h1>
                <p>Please report any issues to <a href={'https://github.com/CarbonORM/CarbonWordPress/issues'}>our
                    GitHub Issues page</a>.</p>

                {PRICING}

            </GridItem>
            <GridItem sm={0} md={2}/>
            <br/>
            <SupportMe/>
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
                                    <button
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
                                    <p>Migrate API key: {C6MigrateLicense}</p>
                                    <p>Websocket Status: {C6WebsocketRunning}</p>
                                    <p>Websocket Running Command: {C6WebsocketRunningCommand}</p>
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
                    {PRICING}
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