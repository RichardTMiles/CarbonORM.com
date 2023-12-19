import CodeBlock from "components/CodeBlock/CodeBlock";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";


export const CARBON_ORM_INTRODUCTION: string = 'carbon-orm-introduction/';

const CARBON_ORM_INTRODUCTION_MD: string = 'https://raw.githubusercontent.com/CarbonORM/.github/main/profile/README.md';

let MISSION_STMT: string | undefined = undefined;
export default function () {

    const [missionStatement, setMissionStatement] = useState<string | undefined>(MISSION_STMT);

    useEffect(() => {

        if (undefined === MISSION_STMT) {

            (async () => {

                const myRequest = new Request(CARBON_ORM_INTRODUCTION_MD);
                fetch(myRequest)
                    .then((response) => response.text())
                    .then((text) => {
                        setMissionStatement(text);
                        MISSION_STMT = text;
                    });

            })()

        }

    }, [])

    return <GridContainer justify="center">
        <GridItem sm={0} md={2}/>
        <GridItem mdOffset={2} sm={12} md={8}>
            <ReactMarkdown
                components={{
                    code({className, children}) {

                        const match = /language-(\w+)/.exec(className || '')

                        const code = String(children).replace(/\n$/, '');

                        const language = match ? match[1] : 'text';

                        return CodeBlock(code, '', language)
                    },
                }}>
                {missionStatement ?? 'LOADING...'}
            </ReactMarkdown>
        </GridItem>
    </GridContainer>
}