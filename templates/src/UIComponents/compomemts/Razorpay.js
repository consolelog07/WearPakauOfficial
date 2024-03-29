import React from "react";

export default class Razorpay_react extends React.Component
{
    constructor(props) {
        super();
        this.options = {
            "key": window.key, // Enter the Key ID generated from the Dashboard
            "currency": "INR",
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": "order_IR7DzvLaNmcJlD", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9999999999"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        // document.head.append("")
        this.openRazorpay=this.openRazorpay.bind(this)


    }
    componentWillMount() {
        this.rzp1 = new Razorpay(this.options);
        this.rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
    }
    openRazorpay()
    {
    this.rzp1.open();
    }
    render() {

        return<>
            <input type="button" className="onlinebtn" onClick={this.openRazorpay} value="Online Payment" />
        </>
    }
}