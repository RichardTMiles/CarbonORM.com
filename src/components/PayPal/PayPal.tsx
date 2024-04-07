import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import {useEffect, useState} from "react";


export enum ePayPalButton {
    ORDER = "ORDER",
    SUBSCRIPTION = "SUBSCRIPTION",
}

export default function PayPalButtonComponent({payPalButton = ePayPalButton.ORDER, amount = 0.01, currency = "USD"}: {
    payPalButton?: ePayPalButton,
    amount?: number,
    currency?: string,
}) {

    console.log('PayPalButtonComponent', payPalButton, amount, currency)

    const [PayPalLoaded, setPayPalLoaded] = useState(!!window.paypal);

    const CLIENT_ID = 'AZvop1cSH9CHzNtezCR9mL7XqGchTZG0GfWDAOwk03dstvm-VjhNpj8uRlC36qRl7baScgOLbGHK_Bx9';

    useEffect(() => {

        if (PayPalLoaded) {
            alert('PayPal Script Already Loaded')
            // If script is already loaded, don't load it again
            return;
        }

        // Function to dynamically load the PayPal script
        const addPayPalScript = () => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            // <script src="https://www.sandbox.paypal.com/sdk/js">
            script.src = `https://www.sandbox.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=${currency}`;
            script.onload = () => {
                setPayPalLoaded(true);
            }
            document.head.appendChild(script);
        };

        addPayPalScript();

    }, [currency]);

    return <div style={{display: 'flex', justifyContent: 'center',flexShrink: 0}}>
        <PayPalScriptProvider options={{clientId: CLIENT_ID}}>
            <div style={{ minWidth: '125vh' }}>
            {payPalButton !== ePayPalButton.SUBSCRIPTION
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
                                        currency_code: currency,
                                        value: `${amount}`, // Set the amount to charge
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
                    style={{layout: 'vertical', }}
                    createSubscription={(data, actions) => {
                        console.log(data, actions)
                        return actions.subscription.create({
                            /* Replace 'plan_id' with your actual plan ID */
                            'plan_id': 'P-XXXXXXXXXX',
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
        </PayPalScriptProvider>
    </div>
}



