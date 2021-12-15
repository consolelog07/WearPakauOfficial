
import React, {useState} from "react";
import mOa from "../../stylemodules/OrderAdmin.module.css"
import getCookie from "../../../components/getcooke";
import emptysearch from "../../../images/emptysearch.svg";




export default function OrderAdminlowercontainer(props)
{
    const [state,setState]=useState({
        attempted:false,
        next_possible:false,
        previous_possible:false,
        fetch_success:false,
        fetch:true,
        current_page:1,
        result:[],
        err:false,
        err_msg:"",
        placed:false,
        processing:false,
        Shipped:false,
        Delivered:false,
        refresh:false,
        cod:false,
        razorpay:false
    })
    // console.log(state,props)
    // console.log(state.result)
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
    function decrement()
    {
        if (state.previous_possible === true)
        {
            setState({...state,current_page:state.current_page-1,fetch: true})
        }
    }
    function refresh()
    {
        setState({...state,fetch: true})
    }

    async function getOrder()
    {
        // console.log(props.Gstate.login,"vv")

        // if (props.Gstate.login === false)
        // {
        //     return setTimeout(ev=>{
        //         getOrder()
        //     },1000)
        // }
        // console.log(props.Gstate.login)
        let a=[]
        let c=[]
        if(state.Delivered)
        {
            a.push("Delivered")
        }
        if(state.placed)
        {
            a.push("placed")
        }
        if(state.processing)
        {
            a.push("Processing")
        }
        if(state.Shipped)
        {
            a.push("Shipped")
        }

        if(state.cod)
        {
            c.push("cod")
        }
        if(state.razorpay)
        {
            c.push("razorpay")
        }
        // `/Api/orders/AdminOrders/?page=${state.current_page}`

        let zz=`/Api/orders/AdminOrders/?page=${state.current_page}${a.length>0?`&Order_status__in=${a.map(ev=>ev)}`:""}${c.length>0 ?`&payment_method__in=${c.map(ev=>ev)}`:""}`
        console.log(zz)
        let req = new Request(zz, {
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


        // console.log(response)

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
            var f=false
            if(response.next !== null)
            {
                b=true
            }
            if(response.previous !== null)
            {
                f=true
            }

            var previous=state.result
            previous.push(...response.results)
            if(state.refresh)
            {
                previous=response.results
            }

            let a={...state,result:previous,fetch: false,attempted: false,refresh:false}
            a.next_possible=b
            a.previous_possible=f

            setState(a)
            // this.setState({address_result:response.results[0],address_fetch:true,address_attempt:false})
        }
        //

    }

    return<>
        {state.attempted?
            <>
                <>
                    <div className="loadercontainer">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </>
            </>:
            <div className={mOa.lowercontainer}>
                <h2 className={mOa.tableheading}>Orders</h2>
                <div className={mOa.filtertablecontainer}>
                    <div className={mOa.filtercontainer}>
                        <h3 className={mOa.filterhead}>Filter</h3>
                        <form>
                            <div className={mOa.formCheck}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="anime"
                                    name="hobby"
                                    checked={state.placed}

                                    onChange={ev=>{
                                        setState({...state,placed:true,fetch: true,refresh:true})
                                    }}
                                />
                                <label className="form-check-label" htmlFor="anime">placed</label>
                            </div>
                            <div className={mOa.formCheck}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="anime"
                                    name="hobby"
                                    checked={state.processing}
                                    onChange={ev=>{
                                        setState({...state,processing:true,fetch: true,refresh:true})
                                    }}
                                />
                                <label className="form-check-label" htmlFor="anime">processing</label>
                            </div>
                            <div className={mOa.formCheck}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="anime"
                                    name="hobby"
                                    checked={state.Shipped}
                                    onChange={ev=>{
                                        setState({...state,Shipped:true,fetch: true,refresh:true})
                                    }}
                                />
                                <label className="form-check-label" htmlFor="anime">Shipped</label>
                            </div>
                            <div className={mOa.formCheck}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="anime"
                                    name="hobby"
                                    checked={state.Delivered}
                                    onChange={ev=>{
                                        setState({...state,Delivered:true,fetch: true,refresh:true})
                                    }}
                                />
                                <label className="form-check-label" htmlFor="anime">Delivered</label>
                            </div>
                            <div className={mOa.formCheck}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="anime"
                                    name="hobby"
                                    checked={state.cod}
                                    onChange={ev=>{
                                        setState({...state,cod:true,fetch: true,refresh:true})
                                    }}
                                />
                                <label className="form-check-label" htmlFor="anime">cod</label>
                            </div>

                        </form>
                        <form>
                             <div className={mOa.formCheck}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="anime"
                                    name="hobby"
                                    checked={state.razorpay}
                                    onChange={ev=>{
                                        setState({...state,razorpay:true,fetch: true,refresh:true})
                                    }}
                                />
                                <label className="form-check-label" htmlFor="anime">razorpay</label>
                            </div>
                         
                        </form>
                        <div className={mOa.formCheck}>
                            <input
                                type="submit"
                                className="form-check-input"
                                id="anime"
                                name="hobby"
                                value="Reset filter"
                                onClick={ev=>{

                                    setState({...state,razorpay:false,cod: false,Delivered:false,Shipped:false,processing:false,placed:false,fetch: true,refresh:true})
                                }

                                }

                            />

                        </div>

                    </div>
                    <div className={mOa.tablecontainer}>
                        <table className={mOa.table}>
                            <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>email</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Payment Method</th>
                                <th>Details</th>
                            </tr>
                            {state.result.length>0 ?<>


                                {state.result.map(ev=>{
                                    if (ev.order_placedon !== null)
                                    {
                                        let pattern = /([0-9\-]+)/i;
                                        let result=ev.order_placedon.match(pattern);
                                        ev.order_placedon=result[0]
                                    }
                                    // console.log(ev)
                                    return<tr>
                                        <td>{ev.OrderId}</td>
                                        <td>{ev.Order_status}</td>
                                        <td>{ev.user_email}</td>
                                        <td>{ev.order_placedon}</td>

                                        <td>{ev.coupons !== null ?ev.after_coupon_applied_ : ev.with_shiphing_charge_}</td>
                                        <td>{ev.payment_method}</td>
                                        <td><a href={`/orderAdmin/${ev.id}`}>View</a></td>
                                    </tr>
                                })}

                            </> :<>

                            </>}

                        </table>

                    </div>
                </div>
                <div className={mOa.paginationcontainer}>
                    <button className="next" onClick={ev=>{ev.preventDefault()}}>______</button>
                    {/*{state.previous_possible &&   <button className="prev" onClick={decrement}>Prev</button>}*/}
                    {state.next_possible &&   <button className="next" onClick={increment}>Next</button>}
                </div>
            </div>
        }
    </>

}

