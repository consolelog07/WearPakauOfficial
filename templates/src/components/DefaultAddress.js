import React, {useState} from "react";
import Address_Create from "../UIComponents/compomemts/order/AddressCreate";
import getCookie from "./getcooke";

export default function DefaultAddress(props)
{
    const[state,setState]=useState({
        attempted:false,
        fetch:true,
        result:[],
        no_result:false,

    })


    if(state.fetch === true && state.attempted === false)
    {
        setState({...state,attempted: true})

            getDefault_address()

    }

    async function getDefault_address()
    {
        let req = new Request(`/Api/orders/Address/get_address_default/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        // console.log(response)
        if(Reflect.has(response,"id"))
        {
            setState({...state,result:response,fetch:false,attempted: false})
        }
        else
        {
            setState({...state,no_result:true,fetch:false,attempted: false})
        }

    }


    return<>
        {
            state.attempted?<>
                <>
                    <div className="loadercontainer">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </>
            </>:<>
                <Address_Create Gstate={props.Gstate} SGstate={props.SGstate}
                                Title={"Add Billing Address"}
                                default={true}
                                success_nav_to="/auth/"
                                redirect={true}
                                default_address_={state.result}
                                no_result={state.no_result}
                />

            </>
        }

    </>
}