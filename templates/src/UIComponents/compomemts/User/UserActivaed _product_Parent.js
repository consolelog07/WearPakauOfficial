import React, {useState} from "react";
import Activated_inner from "./Activated_inner";
import getCookie from "../../../components/getcooke";
import Noactiveproducts from "../../../images/Noactiveproducts.svg"


export default function Activates_parent(props)
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
    // console.log(state,state.result.length,state.result)
    if(state.fetch === true && state.attempted===false )
    {
        setState({...state,attempted:true})
        getActivated()

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
        setState({...state,fetch: true,result:[],})
    }

    async function getActivated()
    {
        // console.log(props.Gstate.login,"vv")

        // if (props.Gstate.login === false)
        // {
        //     return setTimeout(ev=>{
        //         getActivated()
        //     },1000)
        // }
        // console.log(props.Gstate.login)

        let req = new Request(`/Api/Ordered_User_products/Ordered_User_products/?page=${state.current_page}`, {
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
            <>

                {state.result.length === 0?
                    <div className="productlistcontainer svgcontainer">
                        <img src={Noactiveproducts} alt="" />
                    </div>
                    :
                    <>
                        <div className="productlistcontainer">
                            <h2 className="myproducts">Active Products</h2>
                            {/*<div className="productlistfilter">*/}
                            {/*    <div className="listfilter">*/}
                            {/*        <span>Sort by price: </span>*/}
                            {/*        <select>*/}
                            {/*            <option value="Low to High">Low to High</option>*/}
                            {/*            <option value="High to Low">High to Low</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {state.result.length === 0?
                                <>empty</>:
                                <>

                                    {state.result.map(ev=>{
                                        // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
                                        return <Activated_inner data={ev} refresh={refresh} />

                                    })}
                                </>}

                            {
                                state.next_possible && <button className="accordion" onClick={increment}>next</button>
                            }

                        </div>
                    </>}

            </>





        }

    </>

}