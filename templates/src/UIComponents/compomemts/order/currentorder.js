import React from "react";
import Razorpay_react from "../Razorpay";
import getCookie from "../../../components/getcooke";
import CustomizedSnackbars from "../alert";
import Recepttable from "../recept_table";
import "../../style/placeorder.css"
import PaymentSeter from "./payment_set";

export default class CurrentOrder extends  React.Component{
    constructor(props) {
        super(props);
        this.state={
            order_fetch:false,
            attempted:false,
            err:false,
            err_msg:false,
            order_result:{},
            address_fetch:false,
            address_result:{},
            check_cod_fetch:false,
            codAvailabe:false,
            codAvailabenotreason:"",
            cart_fetch:false,
            cart_result:{}

        }

        this.getOrder=this.getOrder.bind(this)
        this.CheckCodAvailable=this.CheckCodAvailable.bind(this)
        this.getAddress=this.getAddress.bind(this)
        this.getCart=this.getCart.bind(this)

    }
    async getOrder()
    {
        if (this.props.Gstate.login === false)
        {
            return setTimeout(ev=>{
                this.getOrder()
            },3000)
        }
        // console.log(this.props.Gstate.login)

        let req = new Request(`/Api/orders/Orders/get_current_order/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },

            // body: JSON.stringify({token:token})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        console.log(response)

        if (Reflect.has(response,"error"))
        {
            this.setState({cart_fetch:true,err:true,err_msg:"some internal error"})


        }

        if(Object.entries(response).length> 1)
        {
            this.setState({order_result:response,cart_fetch:true})
            this.getAddress(response.address_id)

        }

    }
    async getAddress(id)
    {

        if (this.props.Gstate.login === false)
        {
            return setTimeout(ev=>{
                this.getAddress(id)
            },3000)
        }
        // console.log(this.props.Gstate.login)

        let req = new Request(`/Api/orders/Address/?id=${id}`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },

            // body: JSON.stringify({token:token})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        // console.log(response)

        if (Reflect.has(response,"error"))
        {
            this.setState({address_fetch:false,})
            //    no address set yet
        }

        if(response.results.length === 1)
        {
            this.setState({address_result:response.results[0],address_fetch:true,})
            this.getCart()
        }


    }
    async getCart()
    {
        if (this.props.Gstate.login === false)
        {
            return setTimeout(ev=>{
                this.getOrder()
            },3000)
        }
        // console.log(this.props.Gstate.login)

        let req = new Request(`/Api/Cart/Cart/get_user_cart/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },

            // body: JSON.stringify({token:token})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        console.log(response,"cart")

        if (Reflect.has(response,"error"))
        {
            this.setState({order_fetch:true,err:true,err_msg:"some internal error"})


        }

        if(Object.entries(response).length> 1)
        {
            this.setState({cart_result:response,order_fetch:true})
            this.CheckCodAvailable()

        }

    }

    async CheckCodAvailable()
    {

        if (this.props.Gstate.login === false)
        {
            return setTimeout(ev=>{
                this.getAddress(id)
            },3000)
        }
        // console.log(this.props.Gstate.login)

        let req = new Request(`/Api/orders/Orders/check_cod_available_for_current_order/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },

            // body: JSON.stringify({token:token})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        console.log(response)

        if (Reflect.has(response,"error"))
        {
            // check_cod_fetch:false,
            // codAvailabe:false,
            // codAvailabenotreason:""
            this.setState({check_cod_fetch:true,codAvailabe:false,codAvailabenotreason:response["error"],attempted:false})

        }

        if(Reflect.has(response,"Success"))
        {

            this.setState({codAvailabe:true,check_cod_fetch:true,attempted:false})
        }


    }


    render()
    {
        if(this.state.order_fetch === false)
        {
            this.setState({order_fetch:true,attempted:true,err:false,err_msg:""})
            this.getOrder()
        }
        // console.log(this.state)
        // if(this.state.address_fetch === false && this.state.err === false)
        // {
        //     this.setState({address_fetch:true,attempted:false,err:false,err_msg:""})
        //     this.getAddress()
        // }


        return<>
            {this.state.attempted?<><>
                <div className="loadercontainer">
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </></>:<>
                {this.state.err  &&
                <>
                    {<>
                        {console.log(setTimeout(ev=>{
                            this.setState({
                                err:false
                            })
                        },3000))}
                    </> }
                    <CustomizedSnackbars message={this.state.err_msg}   severity="error" />
                </>
                }


                <div className="orderdetailcontainer">
                    <h2 className="orderdetailhead">Place order</h2>

                    <div className="orderdetail">
        <span className="detailcontainer">
        <p className="address">First Name: <span>{this.state.address_result.First_name}</span></p>
          <p className="address">Last Name: <span>{this.state.address_result.Last_name}</span></p>
        <p className="address">Phone Number: <span>{this.state.address_result.phone_number}</span></p>
          <p className="address">
            Shipping Address:<span>

              {`${this.state.address_result.address} ,${this.state.address_result.address_2} ,${this.state.address_result.city} ,${this.state.address_result.State}
               ${this.state.address_result.country} , ${this.state.address_result.pincode}`}
          </span>
          </p>

          <p className="paymenttype">Coupon Applied: <span> {this.state.cart_result.coupons === null?"None":this.state.cart_result.coupon_name}</span></p>
        </span>
                        <div className="billingdetailcontainer">
                            <p className="detailhead">Billing Details</p>
                            <ul>
                                <li className="carrtotal">
                                    Cart Total
                                    <span>RS. {this.state.cart_result.total_}</span>
                                </li>
                                <li className="shippingcharges">
                                    Shipping Charges
                                    <span>RS. {this.state.cart_result.shipingcharge_}</span>
                                </li>
                                {this.state.cart_result.giftwrap === true &&
                                <li className="carrtotal">
                                    Gift Wrap Charge
                                    <span>RS. {this.state.cart_result.giftwrapcharge_}</span>
                                </li>}

                                <li className="shippingcharges">
                                    Total Payable
                                    <span>RS. {this.state.cart_result.with_shiphing_charge_}</span>
                                </li>

                                {this.state.cart_result.coupons !== null &&
                                <li className="totalpayable">
                                    Total Payable(coupon applied)
                                    <span>RS. {this.state.cart_result.after_coupon_applied_}</span>
                                </li>}

                            </ul>
                            <div className="paymentoption">


                                <PaymentSeter  payment_method={this.state.order_result.payment_method}
                                               order_id={this.state.order_result.id}
                                               Payment={this.state.order_result.Payment}
                                               Gstate={this.props.Gstate}
                                               codAvailabe={this.state.codAvailabe}
                                />
                             </div>
                        </div>
                    </div>


                </div>





            </>}

            </>
    }

}