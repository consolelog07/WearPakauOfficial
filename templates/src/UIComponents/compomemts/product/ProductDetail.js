import React, {Component, useEffect, useState} from "react";
import {useParams, withRouter} from "react-router-dom";
import productdetail from "../../style/productdetail.css"
import Modalqr from "./Modalqr";
import getCookie from "../../../components/getcooke";
import Productdetailsplide from "./ProductdetailSplide";
import QRCustom from "../../QRCustom";
import meta from  "../../../images/Meta.jpg"
import {add_to_cart} from '../cart/cartfunctions'
import {Snackbar} from "@material-ui/core";
import CustomizedSnackbars from "../alert";





class ProdctDetail extends React.Component
{
    constructor(props) {
        Number.prototype.round = function(places) {
            return +(Math.round(this + "e+" + places)  + "e-" + places);
        }
        super(props);

        this.topicId =props.match.params.topicId
        this.state={
            modal:false,
            result:{},
            err:false,
            err_msg:"",
            product_added_in_cart:false,
            cartAttempt:false,
            datafetch:false,
            size:[],
            size_selected:"",
            Quantity:1,
            options:{
                // width:  window. innerWidth/2.4,
                // height: window. innerHeight/4,
                width:157,
                height:165,
                type: 'svg' ,
                data: 'http://qr-code-styling.com',
                image:meta,
                margin: 10,
                qrOptions: {
                    typeNumber: 0 ,
                    mode: 'Byte' ,
                    errorCorrectionLevel: 'Q'
                },
                imageOptions: {
                    hideBackgroundDots: true,
                    imageSize: 1,
                    // margin: 20,
                    crossOrigin: 'anonymous',
                },
                dotsOptions: {
                    color: '#222222',
                    type: 'rounded'
                },
                backgroundOptions: {
                    color: '#FFFFFF',
                },
                cornersSquareOptions: {
                    color: '#222222',
                    type: 'extra-rounded',

                },
                cornersDotOptions: {
                    color: '#222222',
                    type: 'dot',
                }
            },

        }
        this.setmodalFalse=this.setmodalFalse.bind(this)
        this.getDetail=this.getDetail.bind(this)
        this.setStateQr=this.setState.bind(this)
        this.add_to_cart=add_to_cart.bind(this)
    }
    componentDidMount() {

        this.getDetail()
    }



    async  getDetail()
    {
        // console.log(this.topicId)
        let req = new Request(`/Api/Products/Products/?id=${this.topicId}`, {
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
        if(response.results.length === 1)
        {

            this.setState({result:response.results[0],datafetch:true,size:response.results[0].sizes.split(",")})

        }
        else
        {
            //redirect to 404
            // this.setState({result:response.results[0],datafetch:true,size:response.results[0].sizes.split(",")})

        }

    }
    setmodalFalse()
    {
        this.setState({modal:false})
    }

    render() {

        // console.log(this.state.result)
        if (!this.state.datafetch)
        {
            return <>
                <div className="loadercontainer" >
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </>
        }

        // if(this.state.result.disable === true)
        // {
        //     window.location.href="/error/404"
        // }

        return<>
            {this.state.cartAttempt?
                <>
                    <div className="loadercontainer" >
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </>:
                <>


                    {this.state.product_added_in_cart  &&
                    <>
                        {setTimeout(ev=>{window.location.href="/cart"},4000)}
                    <CustomizedSnackbars message="Product added to cart"  severity="success" />
                    </>
                    }
                    {this.state.err  &&  <CustomizedSnackbars message={`${this.state.err_msg}`}  severity="error" />}

                    <div className="productdetailcontainer">
                        <div className="productcarousel">
                            <Productdetailsplide imagesSet={this.state.result.ImagesSet} />
                            {/*<img src={this.state.result.default.image} alt=""/>*/}
                        </div>
                        <div className="productinfo">
                            <h1>{this.state.result.name}</h1>
                            <p>{this.state.result.category}</p>
                            <div className="pricing">
                                {this.state.result.discount_display ?
                                    <>
                                        <span className="price">RS. {this.state.result.discounted_price}</span>
                                        <span className="og-price">RS. {this.state.result.price}</span>
                                        { this.state.result.price !== 0 ? <span className="discount">
                                            ({((1-(this.state.result.discounted_price/this.state.result.price))*100).round(2)} % OFF)</span>
                                            :<span className="discount">(0 % OFF)</span>}
                                    </>
                                    :<>
                                        <span className="price">RS.  {this.state.result.price}</span>
                                    </>}


                            </div>

                            <ul className="extrainfo">
                                {
                                    this.state.result.productDescription.split(";").map(ev=>{
                                        if (ev !== "")
                                        {
                                            return <li>{ev}</li>
                                        }

                                    })
                                }
                            </ul>
                            <span className="qunatitycustombox">
          <div className="quantityselector">
            <span>Quantity </span>
            <select value={this.state.Quantity}
                    onChange={ev=>{this.setState({Quantity:ev.target.value})}}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3">4</option>
              <option value="3">6</option>
              <option value="3">7</option>
            </select>
          </div>
          <button className="customiseproduct" onClick={ev=>{this.setState({modal:true})}}>Customise QR</button>
        </span>

        {this.state.size[0] !== "" && <>

         <span className="qunatitycustombox">

          <div className="quantityselector">
            <span>Size </span>
            <select value={this.state.size_selected}
                    onChange={ev=>{this.setState({size_selected:ev.target.value})}}>
                {this.state.size.map(ev=> <option value={ev}>{ev}</option>)}
            </select>
          </div>
                  </span>
        </>}

        <span className="buycart">
          <button className="buy">BUY NOW</button>
          <button className="addtocart"
                  onClick={ev=>{
                      console.log(this.props.Gstate.login)
                      if(this.props.Gstate.login)
                      {
                          this.setState({err:false,err_msg:"",cartAttempt:true,product_added_in_cart:false})
                          this.add_to_cart(this.setStateQr,this.topicId,this.state.options,this.state.Quantity,this.state.size_selected)
                      }
                      else
                      {
                          this.setState({err:true,err_msg:"login to add product in cart"})
                      }

                  }}>ADD TO CART</button>
        </span>
                            <span className="nimishhouse">
                                <h2>your QR CODE</h2>
                            <QRCustom qroptions={this.state.options} />
                            </span>

                        </div>
                    </div>

                    {this.state.modal &&  <Modalqr qroptions={this.state.options} setStateQr={this.setStateQr} setmodalFalse={this.setmodalFalse} />}

                </>
            }


        </>
    }
}


export default withRouter(ProdctDetail);
