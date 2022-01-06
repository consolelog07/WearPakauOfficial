import React, {useState} from "react";
import OrderAdminlowercontainer from "./OrderAdmin";
import getCookie from "../../../components/getcooke";

import mOa from "../../stylemodules/OrderAdmin.module.css"


export default function OrderAdmin_parent(props)
{
    const [state,setState]=useState({
        attempted:false,
        fetch_success:false,
        fetch:true,
        result:[],
        emails:[],
        orderids:[],
        err:false,
        err_msg:"",})

    if(state.fetch === true && state.attempted===false )
    {
        setState({...state,attempted:true})
        getStats()

    }
    async function getStats() {
        let req = new Request(`/Api/orders/AdminOrders/Get_stats/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent
            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },

            // body: JSON.stringify({token:token})
        });


        const response = await fetch(req).then(ev => {
            return ev.json()
        })


        // console.log(response)

        if (Reflect.has(response, "detail")) {
            // this.setState({address_fetch:false,address_attempt:false})
            //    no address set yet
            setState({
                ...state,
                err: true,
                err_msg: "next page not found",
                current_page: state.current_page - 1,
                fetch: true
            })
        }
        if (Reflect.has(response, "Success")) {

            setState({...state,result:response["Success"],emails:JSON.parse(response["email"]),orderids:JSON.parse(response["orderId"]),fetch: false,attempted: false})
        }

    }

    // console.log(state,"dddddddd")



    return<>

        {state.attempted?
            <>
                <>
                    <div className="loadercontainer" >
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </>
            </>:<>
                <div className={mOa.container}>
                    <div className={mOa.uppercontainer}>
                        <div className={mOa.card}>
                            <p className={mOa.cardhead}>Total Orders</p>
                            <p className={mOa.cardtext}>{state.result.totalorders}</p>
                        </div>
                        <div className={mOa.card}>
                            <p className={mOa.cardhead}>Total placed</p>
                            <p className={mOa.cardtext}>{state.result.placed}</p>
                        </div>
                        <div className={mOa.card}>
                            <p className={mOa.cardhead}>Total Processing</p>
                            <p className={mOa.cardtext}>{state.result.Processing}</p>
                        </div>
                        <div className={mOa.card}>
                            <p className={mOa.cardhead}>Total Shipped</p>
                            <p className={mOa.cardtext}>{state.result.Shipped}</p>
                        </div>
                        <div className={mOa.card}>
                            <p className={mOa.cardhead}>Total Delivered</p>
                            <p className={mOa.cardtext}>{state.result.Delivered}</p>
                        </div>
                    </div>

                    <OrderAdminlowercontainer Gstate={props.Gstate} SGstate={props.SGstate} />
                </div>
            </>}


    </>
}