import {PayPalButtons} from "@paypal/react-paypal-js";
import isLocal from "variables/isLocal";


interface iPayPalSubscriptionPlan {
    "id": string,
    "product_id": string,
    "name": string,
    "status": string,
    "description": string,
    "usage_type": string,
    "create_time": string,
    "links": {
        "href": string,
        "rel": string,
        "method": string,
        "encType": string
    }[]
}


// fetch PayPalSubscriptionPlans by querying https://systems.miles.systems/allPlans
export let PayPalSubscriptionPlans: {
    Enterprise?: {
        [key: number]: iPayPalSubscriptionPlan
    },
    Individual?: {
        [key: number]: iPayPalSubscriptionPlan
    },
    Nonprofit?: {
        [key: number]: iPayPalSubscriptionPlan
    },
    Organization?: {
        [key: number]: iPayPalSubscriptionPlan
    },
} = {}

fetch('https://systems.miles.systems/allPlans').then(async (response) => {
    PayPalSubscriptionPlans = await response.json()
    console.log('PayPalSubscriptionPlans', PayPalSubscriptionPlans)
})

export const PAYPAL_CLIENT_ID = !isLocal
    ? 'AZvop1cSH9CHzNtezCR9mL7XqGchTZG0GfWDAOwk03dstvm-VjhNpj8uRlC36qRl7baScgOLbGHK_Bx9'
    : 'AREVkvgDsr28oxgs4OquUGZ28Kg8cQNzoibe9kGaOZBJbIPij5_m5had6GFhBtD9i93SIU7EScMuRYpV';

// Function to dynamically load the PayPal script
const addPayPalScript = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    // <script src="https://www.sandbox.paypal.com/sdk/js">
    script.src = (!isLocal ? 'https://www.sandbox.paypal.com' : 'https://www.paypal.com') + `/sdk/js?client-id=${PAYPAL_CLIENT_ID}`;
    document.head.appendChild(script);
};

addPayPalScript();

export default function PayPalButtonComponent(props: {
    currency?: string,
    amount?: number,
    subscription?: iPayPalSubscriptionPlan
}) {

    console.log('PayPalButtonComponent', props)

    console.log('PayPalSubscriptions', PayPalSubscriptionPlans)

    if (props.subscription !== undefined && props.amount !== undefined) {
        console.error('You cannot have both a subscription and an amount defined')
        return 'Paypal Button Error: You cannot have both a subscription and an amount defined';
    }


    return <div style={{display: 'flex', justifyContent: 'center', flexShrink: 0}}>
            <div style={{minWidth: '30vw'}}>
                {props?.amount !== undefined
                    ? <PayPalButtons
                        createOrder={(data, actions) => {
                            console.log("Creating Order", data);
                            return actions.order.create({
                                // "CAPTURE" if the intent is to capture payment immediately
                                // "AUTHORIZE" if the intent is to authorize a payment and capture it later
                                intent: "CAPTURE",
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: props.currency ?? 'USD',
                                            value: `${props.amount}`, // Set the amount to charge
                                        },
                                    }
                                ]
                            });
                        }}
                        onApprove={async (data, actions) => {
                            console.log("Approving Order", data);
                            actions.order?.capture().then((details) => {
                                // Call your backend to validate the transaction
                                // and distribute the product key
                                console.log("Payment Successful:", details);
                            });
                        }}
                    />
                    : <PayPalButtons
                        style={{layout: 'vertical',}}
                        createSubscription={(data, actions) => {
                            console.log(data, actions)
                            return actions.subscription.create({
                                /* Replace 'plan_id' with your actual plan ID */
                                'plan_id': props.subscription?.id ?? '',
                            });
                        }}
                        onApprove={async (data, actions) => {
                            // Subscription was successful
                            // You can capture the subscription details and handle post-subscription processes here
                            console.log("Subscription successful!", data.subscriptionID, actions);
                            // Optionally, call your backend to finalize the subscription process
                        }}
                    />}
            </div>
    </div>
}



