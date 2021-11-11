import React from "react";
import {Route} from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Productlist from "./Productlist";

export default function ProductDir(props) {
    return <>
        <Route path="/product/list/">
            <Productlist Gstate={props.state} SGstate={props.setState}  />
         </Route>
        <Route path="/product/:topicId(\d+)/" exact>
            <ProductDetail Gstate={props.state} SGstate={props.setState} />
        </Route>

    </>
}
