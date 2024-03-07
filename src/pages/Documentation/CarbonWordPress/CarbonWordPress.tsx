import Ansi from "ansi-to-react";
import CarbonORM from "CarbonORM";
import FetchMarkdownWithGrid from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdownWithGrid";
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import GuidedUserInterface from "pages/Documentation/CarbonWordPress/GuidedUserInterface/GuidedUserInterface";
import {useEffect, useState} from "react";

export const CARBON_WORDPRESS: string = 'CarbonWordPress/';

export default function CarbonWordPress() {

    const {
        C6WordPressAbsPath,
        C6WordPressVersion,
        C6CarbonPHPVersion,
        C6AutoLoadPath,
        C6ComposerJsonPath,
        C6ComposerExecutablePath,
        C6PHPVersion,
        C6WhoAmI,
        C6Groups,
        C6SetupComplete,
    } = CarbonORM.instance.state?.C6WordPress ?? {};

    const [websocketLog, setWebsocketLog] = useState<string>(''); // window.C6WordPress?.C6WebSocketLog ?? 'No WebSocket.txt found.';
    const [migrationInProgress, setMigrationInProgress] = useState<boolean>(false); // window.C6WordPress?.C6MigrationInProgress ?? false;
    const [showReadMe, setShowReadMe] = useState(!C6WordPressVersion);
    const [remoteURL, setRemoteURL] = useState<string>('');
    const [remoteAPIKey, setRemoteAPIKey] = useState<string>('');

    const C6WordpressFullyLoaded = C6SetupComplete && '' !== C6AutoLoadPath;

    const updateWebSocketLog = () => fetch('/logs/websocket')
        .then(response => response.text())
        .then(text => setWebsocketLog(text));

    useEffect(() => {
        if (C6WordpressFullyLoaded) {
            // run update every 5 seconds
            const interval = setInterval(updateWebSocketLog, 5000);
            return () => clearInterval(interval);
        }
    })

    return <GridContainer>
        {C6WordPressVersion && !C6WordpressFullyLoaded && <>
            <GridItem sm={0} md={2}/>
            <GridItem sm={12} md={8}>
                <h1>Carbon WordPress Guided Setup</h1>
                <GuidedUserInterface/>
            </GridItem>
            <GridItem sm={0} md={2}/>
            <br/>
            <br/>
        </>}

        {C6WordpressFullyLoaded && <>
            <GridItem sm={false} md={2}/>
            <GridItem sm={12} md={8}>
                <h1>CarbonWordPress is fully setup and running correctly.</h1>
                <p>CarbonWordPress Version: {C6WordPressVersion}</p>
                <p>CarbonPHP Version: {C6CarbonPHPVersion}</p>
                <p>PHP Version: {C6PHPVersion}</p>
                <p>User: {C6WhoAmI}</p>
                <p>Groups: {C6Groups?.join(', ')}</p>
                <p>Application Path (ABSPATH): {C6WordPressAbsPath}</p>
                <p>Autoload Path: {C6AutoLoadPath}</p>
                <p>Composer Json Path: {C6ComposerJsonPath}</p>
                <p>Composer Executable Path: {C6ComposerExecutablePath}</p>
            </GridItem>
            <GridItem sm={false} md={2}/>
            <GridItem sm={false} md={2}/>
            <GridItem sm={12} md={8}>
                <h1>Migrate</h1>
                {!migrationInProgress && <>
                    <br/>Remote URL: (ie. https://www.example.com/))
                    <br/><input value={remoteURL} onChange={e => setRemoteURL(e.target.value)}/>
                    <br/>Remote API Key:
                    <br/><input value={remoteAPIKey} onChange={e => setRemoteAPIKey(e.target.value)}/>
                </>}
                <br/>
                <button onClick={() => {
                    setMigrationInProgress(!migrationInProgress);
                    fetch('/logs/migrate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            remoteURL,
                            remoteAPIKey
                        })
                    })
                }}>
                    {migrationInProgress ? 'Cancel' : 'Start'} Migration
                </button>
                <div style={{
                    height: '25vh ',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    margin: '2em'
                }}></div>
            </GridItem>
            <GridItem sm={false} md={2}/>
            <GridItem sm={false} md={2}/>
            <GridItem sm={12} md={8}>
                <h1>WebSocket.txt</h1>
                <div style={{
                    height: '50vh ',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    margin: '2em'
                }}>
                    {websocketLog.split('\n').reverse().map((line, index) => <><br/><Ansi key={index}>{line}</Ansi></>)}
                </div>
            </GridItem>
            <GridItem sm={false} md={2}/>
        </>}

        {C6WordPressVersion && <button onClick={() => setShowReadMe(!showReadMe)}>
            {showReadMe ? 'Hide README' : 'Show README'}
        </button>}

        {showReadMe && <>
            <GridItem sm={0} md={2}/>
            <GridItem sm={12} md={8}>
                <h1>Carbon WordPress (README.md)</h1>
            </GridItem>
            <GridItem sm={0} md={2}/>

            <FetchMarkdownWithGrid url={'https://raw.githubusercontent.com/CarbonORM/CarbonWordPress/main/README.md'}/>
        </>}
    </GridContainer>
}