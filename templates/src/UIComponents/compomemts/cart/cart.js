import React from "react"
import "./../../style/cart.css"
import getCookie from "../../../components/getcooke";
import CartProductCard from "./CartProductCard";
import {add_to_cart} from "./cartfunctions";
import CustomizedSnackbars from "../alert";
import {Chip} from "@material-ui/core";

export default class Cart extends React.Component
{
    constructor(props) {
        // console.log("llllllllllllllllllllllllllllllllll")
        super(props);
        this.state={
            datafetch:false,
            created:false,
            fetched:false,
            err:false,
            err_msg:"",
            id:0,
            idFetch:false,
            cartAttempt:false,
            coupon_open:false,
            code:"",
            coupon_apply_success:false,
            coupon_remove_success:false,



            result:{},products:[]
        }
        this.getCart=this.getCart.bind(this)
        this.getcartid=this.getcartid.bind(this)
        this.add_to_cart=add_to_cart.bind(this)
        this.setStateQr=this.setState.bind(this)
        this.removeCoupon=this.removeCoupon.bind(this)

    }

    async getcartid()
    {
        let req = new Request(`/Api/Cart/Cart/Return_cart_id_of_user/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            // body: JSON.stringify({token:token})
        });
        let ok=false
        const response = await fetch(req).then(ev=> {
            if (ev.ok)
            {
                ok=true
            }

            return ev.json()
        })

        // console.log(response.results)
        if(ok)
        {

            if (Reflect.has(response,'iD') === true)
            {
                this.setState({id:response["iD"],idFetch:false})
                // console.log(response)
            }

        }


    }

    async getcartid()
    {
        let req = new Request(`/Api/Cart/Cart/Return_cart_id_of_user/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            // body: JSON.stringify({token:token})
        });
        let ok=false
        const response = await fetch(req).then(ev=> {
            if (ev.ok)
            {
                ok=true
            }

            return ev.json()
        })

        // console.log(response.results)
        if(ok)
        {

            if (Reflect.has(response,'iD') === true)
            {
                this.setState({id:response["iD"],idFetch:false})
                // console.log(response)
            }

        }


    }
    async  getCart()
    {

        let req = new Request(`/Api/Cart/Cart/${this.state.id}/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            // body: JSON.stringify({token:token})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        // console.log(response)


        if (Reflect.has(response,'detail') === true)
        {
            this.setState({err:true,datafetch:true,created:false})
        }
        else
        {
            this.setState({err:false,datafetch:true,result:response,products:response.products,created:false})
            // console.log(response)
        }

    }
    async  addCoupon(Code)
    {

        let req = new Request(`/Api/Cart/Cart/CanapplyCoupon/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({Code:Code})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        console.log(response)
        if (Reflect.has(response,'error') === true)
        {
            this.setState({err:true,cartAttempt:false,err_msg:response["error"]})
        }
        if (Reflect.has(response,'Success') === true)
        {
            this.setState({err:false,cartAttempt:false,coupon_apply_success:true})
        }
    }

    async  removeCoupon()
    {

        let req = new Request(`/Api/Cart/Cart/RemoveCoupon/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent
            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            // body: JSON.stringify({Code:Code})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        // console.log(response)
        if (Reflect.has(response,'error') === true)
        {
            this.setState({err:true,cartAttempt:false,err_msg:response["error"]})
        }
        if (Reflect.has(response,'Success') === true)
        {
            this.setState({err:false,cartAttempt:false,coupon_remove_success:true})
        }
    }



    render() {


        if(this.state.id === 0 &&this.state.idFetch === false)
        {
            this.setState({idFetch:true})
            this.getcartid()

            // console.log('kkkkkkkkkkkk')
            return  <>
                <div className="loadercontainer" >
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </>

        }


            if(this.state.datafetch === false && this.state.created === false && this.state.idFetch === false)
        {
            // console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
            this.setState({err: true, datafetch: false, created: true})
            this.getCart()
            return  <>
                <div className="loadercontainer" >
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </>
            }

            // console.log(this.state.result)



        return<>
            {this.state.cartAttempt === true ?  <>

                <div className="loadercontainer" >
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </>:<>

                {this.state.coupon_remove_success  &&
                <>
                    {console.log(setTimeout(ev=>{window.location.reload()},1000))}
                    <CustomizedSnackbars message="Coupon removed succesfully"  severity="success" />
                </>
                }
                {this.state.coupon_apply_success  &&
                <>
                    {console.log(setTimeout(ev=>{window.location.reload()},1000))}
                    <CustomizedSnackbars message="Coupon applied succesfully"  severity="success" />
                </>
                }
                {this.state.err  &&  <CustomizedSnackbars message={`${this.state.err_msg}`}  severity="error" />}


                <div className="cartpagecontainer">
                    <div className="productcontainer">


                        {[].forEach(ev=>{console.log("dd")})    }
                        {this.state.products.length === 0 ?<>empty</>:<>
                            {this.state.
                            products.map
                            (ev=><CartProductCard  wrapper={ev} add_to_cart={this.add_to_cart}  setStateQr={this.setStateQr}/>
                            )}
                        </>
                        }

                    </div>

                    <div className="ordercontainer">

                        <div className="billingdetailcontainer">
                            <p className="detailhead">Billing Details</p>
                            <ul>
                                <li className="carrtotal">Cart Total
                                    <span>RS. {this.state.result.total_}</span>
                                </li>
                                <li className="shippingcharges">Shipping Charges
                                    <span>RS. {this.state.result.shipingcharge_}</span>
                                </li>
                                <li className="totalpayable">Total Payable
                                    <span>RS. {this.state.result.with_shiphing_charge_}</span>
                                </li>
                                {this.state.result.coupons !== null &&
                                <li className="totalpayable">Total Payable(coupon applied)
                                    <span>RS. {this.state.result.after_coupon_applied_}</span>
                                </li>
                                }

                            </ul>
                        </div>
                        <span className="giftwrapcontainer">
          <label htmlFor="giftwrap">Gift Wrap</label>
          <input type="checkbox" id="giftwrap" className="giftwrap" />
        </span>




                        <span className="couponcontainer">

                            {this.state.result.coupons === null?
                            <>
                                <button className="accordion"
                                        onClick={ev=>{
                                            this.setState({
                                                coupon_open:!this.state.coupon_open
                                            })
                                        }
                                        }

                                >Apply Coupon Code</button>
                                {this.state.coupon_open &&
                                <div className="panel"  style={{display:"block"}}>
                                    <input type="text"  value={this.state.code}
                                           onChange={ev=>{
                                               console.log(ev.target.value)
                                               this.setState({
                                                   code:ev.target.value
                                               })
                                           }}
                                           onKeyUp={ev=>{
                                               if(ev.keyCode === 13)
                                               {
                                                   this.setState({err:false,err_msg:"",cartAttempt:true})
                                                   this.addCoupon(this.state.code)
                                               }
                                           }}
                                           className="coupon"/>
                                    <button onClick={ev=>{
                                        this.setState({err:false,err_msg:"",cartAttempt:true})
                                        this.addCoupon(this.state.code)}} className="applycoupon">Apply</button>
                                </div>}

                            </>:
                                <>
                                    <p className="accordion">Coupon applied:</p>
                                    <Chip label={this.state.result.coupon_name} style={{width:"100%"}} variant="outlined" onDelete={ev=>{
                                        this.setState({err:false,err_msg:"",cartAttempt:true})
                                        this.removeCoupon()
                                    }
                                    } />
                                </>}

        </span>
                        <button className="placeorder">PLACE ORDER</button>
                    </div>
                </div>
            </>}
        </>
    }
}