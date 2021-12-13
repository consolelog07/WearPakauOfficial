import {Route} from "react-router-dom";
import React from "react";
import OrderAdmin_parent from "./OrderAdmin_parent";
import OrderDetailAdmin from "./detail";
import OrderDetail from "../order/Orderdetail";

export default function OrderAdmin_dir(props) {
    return <>

        <Route path="/orderAdmin/" exact>
            <OrderAdmin_parent Gstate={props.state} SGstate={props.setState}  />
        </Route>
        <Route path="/orderAdmin/:topicId(\d+)/" exact>
            <OrderDetail Gstate={props.state} SGstate={props.setState}  admin={true} />
        </Route>

    </>
}
