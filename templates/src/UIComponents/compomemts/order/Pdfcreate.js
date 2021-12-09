import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";

import mDetail from "../../stylemodules/orderDetail.module.css";
import QRCustom from "../../QRCustom";

export default class PdfCreate extends React.Component
{
    constructor(props) {
        super(props);
        console.log(props)
        this.state=this
    }

    modalClose()
    {
        this.props.setModal(!this.props.modal)
    }
    render() {
        const state=this.props.state
        return<>
            <Dialog
                fullScreen
                open={this.props.modal}
                onClose={this.modalClose}
            >
                <DialogTitle> pdf</DialogTitle>
                <DialogContent>
                    <div className={mDetail.orderdetailcontainer} >
                        <h2 className={mDetail.orderdetailhead}>Order Details</h2>
                        <div className={mDetail.orderdetail}>
        <span className={mDetail.detailcontainer}>
          <p className={mDetail.orderid}>Order ID: <span>{state.result.OrderId}</span></p>
          <p className={mDetail.orderid}>First Name: <span>{state.address_result.First_name}</span></p>
          <p className={mDetail.orderid}>Last Name: <span>{state.address_result.Last_name}</span></p>
        <p className={mDetail.orderid}>Phone Number: <span>{state.address_result.phone_number}</span></p>

          <p className={mDetail.address}>
            Shipping Address:<span>

              {`${state.address_result.address} ,${state.address_result.address_2} ,${state.address_result.city} ,${state.address_result.State}
               ${state.address_result.country} , ${state.address_result.pincode}`}
          </span>
          </p>
          <p className={mDetail.status}>Status: <span> {state.result.Order_status}</span></p>
          <p className={mDetail.paymenttype}>Payment: <span> {
              (ev=>{
                  if(state.result.payment_method === "cod")
                      return "Cash on delivery"
                  if(state.result.payment_method === "razorpay")
                      return "Online Payment"

                  return "None"
              })()
          }</span></p>
          <p className={mDetail.paymenttype}>Coupon Applied: <span> {state.result.coupons === null?"None":state.result.coupon_name}</span></p>


        </span>
                            <div className={mDetail.billingdetailcontainer}>
                                <p className="detailhead">Billing Details</p>
                                <ul>
                                    <li className="carrtotal">
                                        Cart Total
                                        <span>RS.{state.result.total_}</span>
                                    </li>
                                    <li className="shippingcharges">
                                        Shipping Charges
                                        <span>RS. {state.result.shipingcharge_}</span>
                                    </li>
                                    {state.result.giftwrap === true &&
                                    <li className="shippingcharges">
                                        Gift Wrap Charge
                                        <span>RS. {state.result.giftwrapcharge_}</span>
                                    </li>}

                                    <li className="totalpayable">
                                        Total Payable
                                        <span>RS. {state.result.with_shiphing_charge_}</span>
                                    </li>

                                    {state.result.coupons !== null &&
                                    <li className="totalpayable">
                                        Total Payable(coupon applied)
                                        <span>RS. {state.result.after_coupon_applied_}</span>
                                    </li>}
                                </ul>
                            </div>
                        </div>

                        <div className={mDetail.productcontainer}>



                            {products.map(ev=>{

                                return <div className={mDetail.product}>
                                    <div className={mDetail.productimgcontainer}>
                                        <img src={state.images_list[ev.Product]} alt=""/>
                                    </div>
                                    <div className={mDetail.productdetail}>
                                        <a className={mDetail.productname} href={`/product/${ev.Product}`}><span>{state.name_list[ev.Product]}</span></a>
                                        <h2 className={mDetail.productname}>Product ID: <span><a href={`/oupu/product/Detail_retrive/?unique_u14=${ev.unique_u14}`}> {ev.unique_u14}</a> </span></h2>
                                        <p className={mDetail.productcategory}>Product Category: <span>{state.cat_list[ev.Product]}</span></p>
                                        {ev.size !== "" &&        <p className={mDetail.productcategory}>Size: <span>{ev.size}</span></p>}

                                        {console.log(ev.QrJson,"ddddddddddddddd")}
                                        <div className={mDetail.qrbox} style={{ width:" fit-content",height: "fit-content"}}>
                                            <QRCustom qroptions={JSON.parse(ev.QrJson)}  width={90} height={90} Oup_url={`${window.location.protocol}//${window.location.host}/oupu/${ev.unique_u14}`}/>
                                        </div>
                                    </div>
                                </div>
                            })}


                        </div>
                    </div>


                </DialogContent>
                <DialogActions>
                    <Button onClick={this.modalClose}>Cancel</Button>
                    {/*<Button onClick={cancelorderUpper} color="error" variant="contained" >Order Cancel</Button>*/}
                </DialogActions>
            </Dialog>


        </>
    }

}