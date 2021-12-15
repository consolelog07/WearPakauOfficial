import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import CustomizedSnackbars from "../alert";
import getCookie from "../../../components/getcooke";
import QRCustom from "../../QRCustom";
import Change from "./change";

export default function Activated_inner (props)
{
    const [state,setState]=useState({
        attempted:false,
        next_possible:false,
        fetch_success:false,
        current_page:1,
        change_url_open:false,
        urlVal:"",
        err:false,
        err_msg:"",
        success:false,

    })

    // console.log(props)
    console.log(state.urlVal,"value")
   async function Change_url()
    {
        console.log(state.urlVal,"ddddddddddwq")
        let req = new Request(`/Api/Ordered_User_products/Ordered_User_products/update_navigate_to/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({uuid:props.data.unique_u14,url:state.urlVal})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        console.log(response)

        if (Reflect.has(response,"error"))
        {
            // this.setState({address_fetch:false,address_attempt:false})
            //    no address set yet
            setState({...state,err: true,err_msg:response["error"],attempted: false,success: false})
        }
        if (Reflect.has(response,"success"))
        {
            // this.setState({address_fetch:false,address_attempt:false})
            //    no address set yet
            setState({...state,attempted: false,success: true})
        }
    }

   function onchange_click(ev)
    {

       if(ev.target.previousElementSibling.checkValidity())
       {
           setState({...state,err:false,err_msg:"",attempted: true})
        console.log("ddddddddddd",state.urlVal)
           Change_url()
       }
       else
       {
           setState({...state,err:true,err_msg:"invalid url"})
       }
    }

return<>
    {state.attempted?<>
            <>
                <div className="loadercontainer" >
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </>
        </>
    :
        <>

            {state.err
            &&
            <>
                {console.log(setTimeout(ev=>{setState({...state, err: false, err_msg: ""})},3000))}
                <CustomizedSnackbars message={state.err_msg}   severity="error" />
            </>
            }

            {state.success  &&
            <>
                {
                    console.log(setTimeout(ev=>{
                        props.refresh()
                    },1000))
                }
                <CustomizedSnackbars message="url updated successfully"   severity="success" />
            </>
            }

            <div className="listcontainer">
                <div className="innercontainer">
                    <div className="imgcontainer">
                        <img src={props.data.Product.default.image} alt=""/>
                    </div>
                    <div className="detailcontainer">
                        <h2 className="productname">
                            <a className="productname" href={`/product/${props.data.Product.id}`}
                            >{props.data.Product.name}</a
                            >
                        </h2>
                        <p className="productcategory">Product id : <span>
                        <a href={`/oupu/product/Detail_retrive/?unique_u14=${props.data.unique_u14}`}>{props.data.unique_u14}</a>
                            {/*{props.data.unique_u14}*/}

                        </span></p>
                        <Typography variant="p" component="p" noWrap  className={"activenimishcoustom"}>
                            Product URL : <a href={props.data.Oup_url_} target="_blank">{props.data.Oup_url_}</a>
                        </Typography>
                        <Typography variant="p" component="p" noWrap  className={"activenimishcoustom"}>
                            Current URL : <a href={props.data.navigate_to} target="_blank">{props.data.navigate_to}</a>
                        </Typography>
                        {/*<p className="currenturl">Current URL : <a href={props.data.navigate_to}>{props.data.navigate_to}</a></p>*/}
                        <span className="couponcontainer">
                <button className="accordion " onClick={ev=>{
                setState({change_url_open: !state.change_url_open})}
                }>Change URL</button>
                            {state.change_url_open &&
                                // <Change state={state} setState={setState} onchange_click={onchange_click}/>
                            <div className="panel " style={{display:"block"}}>
                                <input type="url" name="url" id="url" className="coupon" placeholder="Paste URL here"
                                value={state.urlVal}
                                onChange={
                                    ev=>{
                                        setState({...state,urlVal:ev.target.value})
                                    }
                                }/>
                                <button className="applycoupon" onClick={onchange_click}>Change</button>
                            </div>
                            }


              </span>
                        {/*<div className="qrbox" style={{ width:" fit-content",height: "fit-content"}}>*/}
                        {/*    <QRCustom qroptions={JSON.parse(props.data.QrJson)}  width={150} height={150} Oup_url={props.data.Oup_url_}/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
            <hr className="listhr"/>
            </>
    }

</>
}
const MemoChild = React.memo(QRCustom);