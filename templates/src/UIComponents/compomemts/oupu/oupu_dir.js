import React from "react";
import {Route} from "react-router-dom";
import OupuDetail from "./oupudetail";
import Custom700 from "./custom700suspended";
import Custom701 from "./custom701hostnamenotallowed";
import Activate from "./Activate";
import Detail_retrive from "./Detail_retrive";
import HelpBuy from "./HelpBuy";
import Default_nav from "./Default_nav";


export default function OupuDir(props) {
    return <>
        {/*<Route path="/product/list/">*/}
        {/*    <Productlist Gstate={props.state} SGstate={props.setState}  />*/}
        {/*</Route>*/}

        <Route path="/oupu/:topicId([\dA-Za-z\-]+)/" exact>
            <OupuDetail Gstate={props.state} SGstate={props.setState} />

        </Route>
        <Route path="/oupu/custom700suspended/:topicId([\dA-Za-z\-]+)/" exact>
            <Custom700 Gstate={props.state} SGstate={props.setState} />
        </Route>

        <Route path="/oupu/custom701hostnamenotallowed/:topicId([\dA-Za-z\-]+)/" exact>
            <Custom701 Gstate={props.state} SGstate={props.setState} />
        </Route>

        <Route path="/oupu/product/activate/" exact>
            <Activate Gstate={props.state} SGstate={props.setState} />
        </Route>

        <Route path="/oupu/product/Detail_retrive/" exact>
            <Detail_retrive Gstate={props.state} SGstate={props.setState} />
        </Route>

        <Route path="/oupu/product/HelpBuy/" exact>
            <HelpBuy Gstate={props.state} SGstate={props.setState} />
        </Route>

        <Route path="/oupu/product/Default_nav/" exact>
            <Default_nav Gstate={props.state} SGstate={props.setState} />
        </Route>

    </>
}
