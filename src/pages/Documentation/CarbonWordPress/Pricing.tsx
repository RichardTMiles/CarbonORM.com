import {Slider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {School} from "@material-ui/icons";
import Favorite from "@material-ui/icons/Favorite";
import Group from "@material-ui/icons/Group";
import Person from "@material-ui/icons/Person";
import Public from "@material-ui/icons/Public";
import VideoLibrary from "@material-ui/icons/VideoLibrary";
import PayPalButtonComponent, {PayPalSubscriptionPlans} from "components/PayPal/PayPal";
import NavPills from "pages/UI/MaterialUI/components/NavPills/NavPills";
import {useState} from "react";

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

function formatDollarAmount(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}


enum ePricingInformation {
    INDIVIDUAL,
    ORGANIZATION,
    NONPROFIT
}

enum eDiscountType {
    NonProfit,
    Organization,
    Individual
}

export default function Pricing() {


    const [numberOfDomains, setNumberOfDomains] = useState<number>(5);
    const [numberOfOrganizationOperators, setNumberOfOrganizationOperators] = useState<number>(20);
    const [numberOfNonprofitOperators, setNumberOfNonprofitOperators] = useState<number>(100);

    function getDiscountPercentage(numberOfLicenses: number, discountType: eDiscountType) {
        if (numberOfLicenses === 1) {
            return 0;
        }

        const discountPercentages = bulkLicenseDiscountPercentage(discountType);

        for (let i = numberOfLicenses; i >= 2; i--) {
            if (discountPercentages[i]) {
                return discountPercentages[i];
            }
        }

        return 0;
    }

    function getLicenseCost(baseCost: number, numberOfLicenses: number, discountType: eDiscountType) {
        if (numberOfLicenses === 1) {
            return baseCost;
        }

        let discount = getDiscountPercentage(numberOfLicenses, discountType);

        return baseCost * (1 - discount);
    }

    function bulkLicenseDiscountPercentage(discountType: eDiscountType) {
        let discountPercentages: { [key: number]: number } = discountType === eDiscountType.Individual ? {
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

        if (discountType === eDiscountType.NonProfit) {

            Object.keys(discountPercentages).forEach((key) => discountPercentages[key] += 0.50);

            // keep '2' at the beginning of the object
            discountPercentages = {
                2: 0.50,
                ...discountPercentages
            }

        }

        return discountPercentages;

    }


    const individualLicenseBaseCost = 120;
    const individualLicenseDiscount = getDiscountPercentage(numberOfDomains, eDiscountType.Individual);
    const individualLicenseCost = getLicenseCost(individualLicenseBaseCost, numberOfDomains, eDiscountType.Individual);
    const individualLicenseTotalCost = individualLicenseCost * numberOfDomains;
    const organizationLicenseBaseCost = 750;
    const organizationLicenseDiscount = getDiscountPercentage(numberOfOrganizationOperators, eDiscountType.Organization);
    const organizationLicenseCost = getLicenseCost(organizationLicenseBaseCost, numberOfOrganizationOperators, eDiscountType.Organization);
    const organizationLicenseTotalCost = organizationLicenseCost * numberOfOrganizationOperators;
    const nonprofitLicenseBaseCost = organizationLicenseBaseCost;
    const nonprofitLicenseDiscount = getDiscountPercentage(numberOfNonprofitOperators, eDiscountType.NonProfit);
    const nonprofitLicenseCost = getLicenseCost(nonprofitLicenseBaseCost, numberOfNonprofitOperators, eDiscountType.NonProfit);
    const nonprofitLicenseTotalCost = nonprofitLicenseCost * numberOfNonprofitOperators;


    const emailButton = <Button onClick={() => {
        window.open('mailto:support@miles.systems?subject=Nonprofit Request&body=Please include a link to your institution. We will respond within 24 hours.')
    }} style={{
        backgroundColor: 'green',
        color: 'white'
    }}>
        <b>Email us at Support@Miles.Systems to get started!</b>
    </Button>

    function pricingInformation(type: ePricingInformation) {

        switch (type) {
            case ePricingInformation.NONPROFIT:
                return <>
                    <p>
                        Nonprofits with tax exempt status will save an additional 50% along with any bulk pricing
                        discounts. <br/>
                        Purchasing the <b>{numberOfNonprofitOperators} Nonprofit Operators License</b> will qualify for
                        a
                        <b style={{color: "green"}}> {nonprofitLicenseDiscount * 100}% discount</b>,
                        from <s>{formatDollarAmount(nonprofitLicenseBaseCost)}</s> down to <b
                        style={{color: "green"}}>{formatDollarAmount(nonprofitLicenseCost)}</b>.<br/>
                        <b style={{color: "green"}}>
                            {numberOfNonprofitOperators} Nonprofit Operators License<br/>
                            Totaling {formatDollarAmount(nonprofitLicenseTotalCost)} Annually
                        </b>
                    </p>
                    {emailButton}
                    <br/>
                    <br/>
                </>
            case ePricingInformation.ORGANIZATION:
                return <><p>{0 !== organizationLicenseDiscount && <>
                    You will save <b style={{color: "green"}}>{organizationLicenseDiscount * 100}%</b>,
                    from <s>{formatDollarAmount(organizationLicenseBaseCost)}</s> down to <b
                    style={{color: "green"}}>{formatDollarAmount(organizationLicenseCost)}</b>, when you buy
                    the <b>{numberOfOrganizationOperators} Operators License</b>!<br/>
                </>}
                    <b style={{color: "green"}}>
                        {numberOfOrganizationOperators} Operators License<br/>
                        Totaling {formatDollarAmount(organizationLicenseTotalCost)} Annually
                    </b>

                </p><PayPalButtonComponent
                    subscription={PayPalSubscriptionPlans?.Organization?.[numberOfOrganizationOperators]}/></>
            case ePricingInformation.INDIVIDUAL:
                return <><p>{0 !== individualLicenseDiscount && <>
                    You will save <b style={{color: "green"}}>{individualLicenseDiscount * 100}%</b>,
                    from <s>{formatDollarAmount(individualLicenseBaseCost)}</s> down to <b
                    style={{color: "green"}}>{formatDollarAmount(individualLicenseCost)}</b>, when you buy
                    the <b>{numberOfDomains} domain license</b>!<br/>
                </>}
                    <b style={{color: "green"}}>
                        {numberOfDomains} Domain License<br/>
                        Totaling {formatDollarAmount(individualLicenseTotalCost)} Annually
                    </b>
                </p>
                    <PayPalButtonComponent subscription={PayPalSubscriptionPlans?.Individual?.[numberOfDomains]}/>
                </>

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

    function pricingExtraInfo(elements: any) {
        return <>
            <h3>Migration Features</h3>
            <ul>
                {elements}
                {premiumFeatures}
            </ul>
            {WebSocketInfo}
        </>
    }

    return <div style={{
        backgroundColor: 'lightblue',
        color: "black",
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
                        <Slider min={1} max={19} defaultValue={numberOfDomains} onChange={(_event, value) => {
                            setNumberOfDomains(value as number)
                        }} aria-label="Default" valueLabelDisplay="auto"/>
                        {pricingInformation(ePricingInformation.INDIVIDUAL)}
                        <p>
                            The Individual license is for a <u>single developer or operator</u> to use across single or
                            multiple domains based on license.
                        </p>
                        {pricingExtraInfo(<li>One User</li>)}
                    </div>
                },
                {
                    tabButton: "Organization",
                    tabIcon: Group,
                    tabContent: <div style={{
                        padding: "1em"
                    }}>
                        <h1>Organization licenses are priced per operator</h1>
                        <h2>CarbonWordPress {numberOfOrganizationOperators} Operators License</h2>
                        <Slider min={2}
                                max={99}
                                step={1}
                                value={numberOfOrganizationOperators}
                                onChange={(_event, value) => {
                                    setNumberOfOrganizationOperators(value as number)
                                }} aria-label="Default" valueLabelDisplay="auto"/>
                        {pricingInformation(ePricingInformation.ORGANIZATION)}
                        {pricingExtraInfo(<li>Unlimited Domains</li>)}
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
                        <PayPalButtonComponent subscription={PayPalSubscriptionPlans?.Enterprise?.[1]}/>
                        {pricingExtraInfo(<>
                            <li>Unlimited Migration Operators</li>
                            <li>Unlimited Domains</li>
                            <li>Operational Support</li>
                            <li>Optional In Person or Online Training</li>
                            <li>Optional Annual Security Review</li>
                        </>)}
                    </div>
                },
                {
                    tabButton: "Nonprofit",
                    tabIcon: Favorite,
                    tabContent: <div style={{
                        padding: "1em"
                    }}>
                        <h1>Nonprofit licenses are priced per operator</h1>
                        <Slider min={2} step={1} max={599} value={numberOfNonprofitOperators}
                                onChange={(_event, value) => {
                                    setNumberOfNonprofitOperators(value as number)
                                }} aria-label="Default" valueLabelDisplay="auto"/>
                        {pricingInformation(ePricingInformation.NONPROFIT)}
                        {pricingExtraInfo(<li>Unlimited Domains</li>)}
                    </div>
                },
                {
                    tabButton: "Students & Teachers",
                    tabIcon: School,
                    tabContent: <div style={{
                        padding: "1em"
                    }}>
                        <h1>Students & Teachers</h1>
                        <p><b style={{color: "green"}}>Free for academic, non-commercial, projects!</b></p>
                        <p>For academic access only. Education licenses may not be used on commercial products.</p>
                        {emailButton}
                        <br/>
                        <br/>
                        {pricingExtraInfo(<>
                            <li>Unlimited Domains</li>
                            <li>Unlimited Operators</li>
                        </>)}
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

}