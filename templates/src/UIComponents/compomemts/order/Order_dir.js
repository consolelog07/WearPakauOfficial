import React from "react";
import {Route} from "react-router-dom";
import OrderDetail from "./Orderdetail";
import Orderlist from "./OrderList";
import SetorderAddress from "./setorderaddress";
import CurrentOrder from "./currentorder";
import ErrorWithOrders from "./error with orders";



export default function Order_dir(props) {
    return <>

        <Route path="/order/setorderaddress">

            <SetorderAddress Gstate={props.state} SGstate={props.setState}  />
        </Route>

        <Route path="/order/error_with_products">
            <ErrorWithOrders Gstate={props.state} SGstate={props.setState} />
        </Route>
        <Route path="/order/orderList/">
            <Orderlist Gstate={props.state} SGstate={props.setState}  />
        </Route>
        <Route path="/order/:topicId(\d+)/" exact>
            <OrderDetail Gstate={props.state} SGstate={props.setState} />
        </Route>
        <Route path="/order/" exact>
            <CurrentOrder Gstate={props.state} SGstate={props.setState}  />
        </Route>

    </>
}
