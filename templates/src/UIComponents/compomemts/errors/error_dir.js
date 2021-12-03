import React from "react";
import {Route} from "react-router-dom";
import F404 from "./404"


export default function Errordir(props) {
    return <>
        <h1>ssssssssssssssssssssssssssssssssss</h1>
        <Route path="/error/404/">
            <F404 Gstate={props.state} SGstate={props.setState}  />
        </Route>
        <Route path="/error/500/">
            <F404 Gstate={props.state} SGstate={props.setState}  />
        </Route>
        {/*<Route path="/product/:topicId(\d+)/" exact>*/}
        {/*    <ProductDetail Gstate={props.state} SGstate={props.setState} />*/}
        {/*</Route>*/}
    </>
}
