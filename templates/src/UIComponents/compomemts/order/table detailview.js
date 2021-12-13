import mDetail from "../../stylemodules/pdf.module.css";
import CustomizedTables from "./table";
import React from "react";

export default class  Detailview extends React.PureComponent {
    constructor(props) {
        super(props);
        this.rows=this.props.rows
        var today = new Date();

        this.date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    }
    render() {
        const state=this.props.state
        return<>
            <div className={mDetail.orderdetailcontainer} >
                <h2 className={mDetail.orderdetailhead}>Order Receipt</h2>
                <div className={mDetail.orderdetail}>
                <span className={mDetail.detailcontainer}>
                  <p className={mDetail.orderid}>Order ID: <span>{state.result.OrderId}</span></p>
                  <p className={mDetail.orderid}>First Name: <span>{state.address_result.First_name}</span></p>
                  <p className={mDetail.orderid}>Last Name: <span>{state.address_result.Last_name}</span></p>
                <p className={mDetail.orderid}>Phone Number: <span>{state.address_result.phone_number}</span></p>
                <p className={mDetail.orderid}>Receipt Printed On: <span>{this.date}</span></p>

          <p className={mDetail.address}>
            Shipping Address:<span>

              {`${state.address_result.address} ,${state.address_result.address_2} ,${state.address_result.city} ,${state.address_result.State}
               ${state.address_result.country} , ${state.address_result.pincode}`}
          </span>
          </p>
          <p className={mDetail.status}>Status: <span> {state.result.Order_status}</span></p>
        {state.result.Order_status === "Cancelled"  &&
        <p className={mDetail.orderid}>Reason for Cancelation: <span>{state.result.reason}</span></p>
        }
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
                    <CustomizedTables rows={this.rows} />
                </div>
            </div>

        </>
    }

}