import {Looks3, Looks4, Looks5, Looks6, LooksOne, LooksTwo} from "@material-ui/icons";
import NavPills from "pages/UI/MaterialUI/components/NavPills/NavPills";


export default function GuidedUserInterface() {



    return <>

        <h2>GuidedUserInterface</h2>


        <NavPills
            color="info"
            tabs={[
                {
                    tabButton: "CarbonWordPress Installed",
                    tabIcon: LooksOne,
                    tabContent: (
                        <>
                            <h3>Congratulations! You have activated CarbonWordPress successfully. </h3>
                            <p>Let's verify the rest of your configuration.</p>
                        </>
                    )
                },
                {
                    tabButton: "Composer Verified",
                    tabIcon: LooksTwo,
                    tabContent: (
                        <>

                        </>
                    )
                },
                {
                    tabButton: "Composer Installed",
                    tabIcon: Looks3,
                    tabContent: (
                        <>

                        </>
                    )
                },
                {
                    tabButton: "Profit",
                    tabIcon: Looks4,
                    tabContent: (
                        <>
                            =                                                        </>
                    )
                },
                {
                    tabButton: "https://CarbonPHP.com/",
                    tabIcon: Looks5,
                    tabContent: (
                        <>
                        </>
                    )
                },
                {
                    tabButton: "https://Stats.Coach/",
                    tabIcon: Looks6,
                    tabContent: (
                        <>
                        </>
                    )
                },
            ]}
        />
    </>

}