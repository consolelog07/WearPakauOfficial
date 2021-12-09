// import React from "react";
//
// export default function Orderlist(){
//     return<>
//     orderlist
//     </>
// }

import React, {useState} from "react";
import "../../style/orderall.css"
import getCookie from "../../../components/getcooke";


export default function Orderlist(props)
{
    const [state,setState]=useState({
        attempted:false,
        next_possible:false,
        fetch_success:false,
        fetch:true,
        current_page:1,
        result:[],
        err:false,
        err_msg:""
    })
    // console.log(state,props)
    // console.log(state,state.result.length)
    if(state.fetch === true && state.attempted===false )
    {
        setState({...state,attempted:true})
        getOrder()

    }

    function increment()
    {
        if (state.next_possible === true)
        {
            setState({...state,current_page:state.current_page+1,fetch: true})
        }
    }
    function refresh()
    {
        setState({...state,fetch: true})
    }

    async function getOrder()
    {
        console.log(props.Gstate.login,"vv")

        // if (props.Gstate.login === false)
        // {
        //     return setTimeout(ev=>{
        //         getOrder()
        //     },1000)
        // }
        console.log(props.Gstate.login)

        let req = new Request(`/Api/orders/Orders/?page=${state.current_page}`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            // body: JSON.stringify({token:token})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        console.log(response)

        if (Reflect.has(response,"detail"))
        {
            // this.setState({address_fetch:false,address_attempt:false})
            //    no address set yet
            setState({...state,err: true,err_msg:"next page not found",current_page:state.current_page-1,fetch: true})
        }
        //
        if(response.results.length >= 0)
        {
            var b=false
            if(response.next !== null)
            {
                b=true
            }
            var previous=state.result
            previous.push(...response.results)

            let a={...state,result:previous,fetch: false,attempted: false}
            a.next_possible=b

            setState(a)
            // this.setState({address_result:response.results[0],address_fetch:true,address_attempt:false})
        }
        //

    }

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
            </>:
            <div className="allordercontainer">
                <h2 className="allordershead">All orders</h2>
                {/*<div className="productlistfilter">*/}
                {/*    <div className="listfilter">*/}
                {/*        <span>Sort by price: </span>*/}
                {/*        <select>*/}
                {/*            <option value="Low to High">Low to High</option>*/}
                {/*            <option value="High to Low">payment_method cod</option>*/}
                {/*            <option value="High to Low">payment_method e-pay</option>*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <ul className="listcontainer">
                    <li className="ordercontainer" style={{height:"2vh"}}>
                        <p className="orderid">Orderid</p>
                        <p className="orderdate">Order Date </p>
                        <p className="orderstatus">Order Status</p>
                        <p className="total">Total</p>
                        <p href="#" className= "orderstatus" >Know more</p>
                    </li>
                    {state.result.length === 0?
                        <>empty</>:
                        <>

                            {state.result.map(ev=>{
                                if (ev.order_placedon !== null)
                                {
                                    let pattern = /([0-9\-]+)/i;
                                    let result=ev.order_placedon.match(pattern);
                                    ev.order_placedon=result[0]
                                }
                                if(ev.Order_status === "notplaced")
                                {
                                    return
                                }

                                return <li className="ordercontainer">
                                    <p className="orderid">{ev.OrderId}</p>
                                    <p className="orderdate">{ev.order_placedon}</p>
                                    <p className="orderstatus">{ev.Order_status}</p>
                                    <p className="total">RS. {ev.total_}</p>
                                    <a href={`/order/${ev.id}`}  className="knowmore">Know more</a>
                                </li>
                            }
                            )
                            }
                        </>}

                </ul>
                {state.next_possible && <button onClick={increment}>next</button>}
            </div>
        }





    </>

}

