import {Looks3, Looks4, Looks5, Looks6, LooksOne, LooksTwo} from "@material-ui/icons";
import FetchCode from "components/FetchCode/FetchCode";
import FetchMarkdownWithGrid from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdownWithGrid";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import NavPills from "pages/UI/MaterialUI/components/NavPills/NavPills";

export const CARBON_NODE: string = 'CarbonNode/';

export default function CarbonNode() {
    return <>
        <FetchMarkdownWithGrid url={'https://raw.githubusercontent.com/CarbonORM/CarbonNode/main/README.md'}/>
        <GridItem sm={0} md={2}/>
        <GridItem sm={12} md={8}>
            <h2>Generating Code!</h2>
            <NavPills
                color="info"
                tabs={[
                    {
                        tabButton: "generateRestBindings.ts",
                        tabIcon: LooksOne,
                        tabContent: <FetchCode language={'typescript'}
                                               url={'https://raw.githubusercontent.com/CarbonORM/CarbonNode/main/scripts/generateRestBindings.ts'}/>,
                    },
                    {
                        tabButton: "C6.ts",
                        tabIcon: LooksTwo,
                        tabContent: <>
                            <h2>This is generated code!</h2>
                            <FetchCode language={'typescript'}
                                       url={'https://raw.githubusercontent.com/CarbonORM/CarbonORM.dev/www/src/api/rest/C6.ts'}/>
                        </>,
                    },
                    {
                        tabButton: "Users.ts",
                        tabIcon: Looks3,
                        tabContent: <>
                            <h2>This is generated code!</h2>
                            <FetchCode language={'typescript'}
                                       url={'https://raw.githubusercontent.com/CarbonORM/CarbonORM.dev/www/src/api/rest/Users.ts'}/>

                        </>

                    },
                    {
                        tabButton: "WsLiveUpdates.ts",
                        tabIcon: Looks4,
                        tabContent: <>
                            <FetchCode language={'typescript'}
                                       url={'https://raw.githubusercontent.com/CarbonORM/CarbonORM.dev/www/src/api/rest/WsLiveUpdates.ts'}/>
                        </>

                    },
                    {
                        tabButton: "CarbonORM.tsx",
                        tabIcon: Looks5,
                        tabContent: <>
                            <FetchCode language={'typescript'}
                                       url={'https://raw.githubusercontent.com/CarbonORM/CarbonORM.dev/www/src/CarbonORM.tsx'}/>
                        </>
                    },
                    {
                        tabButton: "AccessControl.tsx",
                        tabIcon: Looks6,
                        tabContent: <>
                            <FetchCode language={'typescript'}
                                       url={'https://raw.githubusercontent.com/CarbonORM/CarbonORM.dev/www/src/pages/AccessControl/AccessControl.tsx'}/>
                        </>
                    },
                ]}
            /> </GridItem>
        <GridItem sm={0} md={2}/>

    </>

}