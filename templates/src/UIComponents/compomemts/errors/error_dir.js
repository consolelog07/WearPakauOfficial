import React from "react";
import {Route} from "react-router-dom";
import F404 from "./404"


export default function Errordir(props) {
    return <>
        <Route path="/error/404/">
            <F404 Gstate={props.state} SGstate={props.setState}  />
        </Route>
        <Route path="/error/500/">
            <F404 Gstate={props.state} SGstate={props.setState}  />
        </Route>
    </>
}
