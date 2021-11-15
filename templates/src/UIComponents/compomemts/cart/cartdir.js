import React from "react";
import {Route} from "react-router-dom";
import Cart from "./cart"


export default function Cartdir(props) {
    return <>
        <Route path="/cart/">
            <Cart Gstate={props.state} SGstate={props.setState}  />
        </Route>

        {/*<Route path="/product/:topicId(\d+)/" exact>*/}
        {/*    <ProductDetail Gstate={props.state} SGstate={props.setState} />*/}
        {/*</Route>*/}
    </>
}
