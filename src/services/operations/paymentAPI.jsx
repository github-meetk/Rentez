import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/rentez-svg.svg"


const {PLAN_PAYMENT_API, PLAN_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token, plan, userDetails, navigate) {
    const toastId = toast.loading("Loading...");
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", PLAN_PAYMENT_API, 
                                {plan},
                                {
                                    Authorization: `Bearer ${token}`,
                                })

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", orderResponse);
        //options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id:orderResponse.data.data.id,
            name:"Rentez",
            description: "Thank You for Purchasing the Subscription",
            image:rzpLogo,
            prefill: {
                name: userDetails?.firstName + " " + userDetails?.lastName,
                email: userDetails?.email,
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token );
                //verifyPayment
                verifyPayment({...response, plan}, token, navigate);
            }
        }
        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response);
        })

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error(error.response?.data.message);
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
        toast.error(error.response?.data.message)
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate) {
    const toastId = toast.loading("Verifying Payment....");
    try{
        const response  = await apiConnector("POST", PLAN_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, you are successfuly subscribed");
        navigate("/");
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error(error.response?.data.message);
    }
    toast.dismiss(toastId);
}