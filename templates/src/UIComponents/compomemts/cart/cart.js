import React from "react";
import "./../../style/cart.css";
import mcart from "../../stylemodules/cart.module.css";
import mcart_2 from "../../stylemodules/emptycart.module.css";
import getCookie from "../../../components/getcooke";
import CartProductCard from "./CartProductCard";
import {add_to_cart} from "./cartfunctions";
import emptycart from "../../../images/emptycart.svg"

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
        this.FlipGiftwrap=this.FlipGiftwrap.bind(this)
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

    async  FlipGiftwrap()
    {

        let req = new Request(`/Api/Cart/Cart/flipGiftwrap/`, {
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
        else if (Reflect.has(response,'detail') === true)
        {
            this.setState({err:true,datafetch:true,created:false})
        }
        if (Reflect.has(response,'Success') === true)
        {
            window.location.reload()
            // this.setState({err:true,datafetch:true,created:false})
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

                <h2 className={mcart.carthead}>Cart</h2>
                <div className={mcart.cartpagecontainer}>
                    <div className={mcart.productcontainer}>


                        {[].forEach(ev=>{console.log("dd")})    }
                        {this.state.products.length === 0 ?<>

                            <div className={mcart_2.container}>
                                <div className={mcart_2.imgcontainer}>
                                    <img src={emptycart} alt="" />
                                </div>
                                <h2 className="cartheading">Your cart is empty</h2>

                            </div>


                            </>:<>
                            {this.state.
                            products.map
                            (ev=><CartProductCard  wrapper={ev} add_to_cart={this.add_to_cart}  setStateQr={this.setStateQr}/>
                            )}
                        </>
                        }

                    </div>

                    <div className={mcart.ordercontainer}>

                        <div className={mcart.billingdetailcontainer}>
                            <p className={mcart.detailhead}>Billing Details</p>
                            <ul>
                                <li className="carrtotal">Cart Total
                                    <span>RS. {this.state.result.total_}</span>
                                </li>
                                <li className="shippingcharges">Shipping Charges
                                    <span>RS. {this.state.result.shipingcharge_}</span>
                                </li>
                                {this.state.result.giftwrap === true &&
                                <li className="shippingcharges">
                                    Gift Wrap Charge
                                    <span>RS. {this.state.result.giftwrapcharge_}</span>
                                </li>}
                                <li className={mcart.totalpayable}>Total Payable
                                    <span>RS. {this.state.result.with_shiphing_charge_}</span>
                                </li>

                                {this.state.result.coupons !== null &&
                                <li className={mcart.totalpayable}>Total Payable(coupon applied)
                                    <span>RS. {this.state.result.after_coupon_applied_}</span>
                                </li>
                                }


                            </ul>
                        </div>
                        <span className={mcart.giftwrapcontainer}>
          <label htmlFor="giftwrap">Gift Wrap</label>
          <input type="checkbox" id="giftwrap" className={mcart.giftwrap} onChange={ev=>{
              this.setState({err:false,err_msg:"",cartAttempt:true})
              this.FlipGiftwrap()
          // console.log(ev.target.checked)
          }
          } checked={this.state.result.giftwrap}  />
        </span>




                        <span className={mcart.couponcontainer}>

                            {this.state.result.coupons === null?
                            <>
                                <button className={mcart.accordion}
                                        onClick={ev=>{
                                            this.setState({
                                                coupon_open:!this.state.coupon_open
                                            })
                                        }
                                        }

                                >Apply Coupon Code</button>
                                {this.state.coupon_open &&
                                <div className={mcart.panel}  style={{display:"block"}}>
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
                                           className={mcart.coupon}/>
                                    <button onClick={ev=>{
                                        this.setState({err:false,err_msg:"",cartAttempt:true})
                                        this.addCoupon(this.state.code)}} className={mcart.applycoupon}>Apply</button>
                                </div>}

                            </>:
                                <>
                                    <p className={mcart.accordion}>Coupon applied:</p>
                                    <Chip label={this.state.result.coupon_name} style={{width:"100%"}} variant="outlined" onDelete={ev=>{
                                        this.setState({err:false,err_msg:"",cartAttempt:true})
                                        this.removeCoupon()
                                    }
                                    } />
                                </>}

        </span>
                        <button className={mcart.placeorder}
                        onClick={
                            ev=>{
                                window.location.href="/order/setorderaddress"
                            }
                        }
                        >PLACE ORDER</button>
                    </div>
                </div>
            </>}
        </>
    }
}