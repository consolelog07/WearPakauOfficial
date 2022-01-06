import React, {useState} from "react";
import mPB from "../../../stylemodules/primaryAfter.module.css";
import getCookie from "../../../../components/getcooke";
import QRCustom from "../../../QRCustom";
import CustomizedSnackbars from "../../alert";
import QRCodeStyling from "qr-code-styling";

export default function PrmaryAfter(props)
{
    const [state,setState]=useState({
        fetch:true,
        attempted:false,
        result:{},
        empty:false,
        err:false,
        err_msg:"",success:false,
        Activate_success:false,
        activeattempt:false,
    })
    async function GetData()
    {
        console.log("ssssssssssssssssssssssssssssssssssssssss")
        let req = new Request(`/Api/Ordered_User_products/Ordered_User_products/GetDetailsOfProject/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },

            body: JSON.stringify({uuid:props.AGstate.unique_u14})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        console.log(response)

        if (Reflect.has(response,"error") )
        {
            setState({...state,err: true,err_msg:response["error"],attempted: false,success: false,fetch:false})
        }

        if (Reflect.has(response,"detail") )
        {
            setState({...state,err: true,err_msg:response["detail"],attempted: false,success: false,fetch:false})
        }
        if (Reflect.has(response,"success"))
        {
            // this.setState({address_fetch:false,address_attempt:false})
            //    no address set yet
            setState({...state,result:response["success"],attempted: false,success: true,fetch:false})
        }
    }
    async function Activate_product()
    {
        setState({...state,activeattempt:false})
        console.log("ssssssssssssssssssssssssssssssssssssssss")
        let req = new Request(`/Api/Ordered_User_products/Ordered_User_products/activate_product/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },

            body: JSON.stringify({uuid:props.AGstate.unique_u14})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        console.log(response)

        if (Reflect.has(response,"error") )
        {
            setState({...state,err: true,err_msg:response["error"],attempted: false,fetch:false,Activate_success:false})
        }

        if (Reflect.has(response,"detail") )
        {
            setState({...state,err: true,err_msg:response["detail"],activeattempt:false,attempted: false,fetch:false,Activate_success:false})
        }
        if (Reflect.has(response,"success"))
        {
            console.log("sucessssssssssssssssssssssssss")
            setState({...state,Activate_success:true,activeattempt:false,attempted: false,success: true,fetch:true})
        }
    }

    if(state.fetch === true && state.attempted === false)
    {
     console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        setState({...state,fetch:false,activeattempt:false,attempted: true,err:false,err_msg:""})
        GetData()
    }
    else
    {
        console.log("false")
    }

    if(state.activeattempt === true && state.attempted === false)
    {
        console.log("iiiiiiiiiiiiiiiiiiiiiiiiiikkkkkiiiiiiiiiiiiiiiiiiiiii",state.activeattempt, state.attempted)
        setState({...state,activeattempt:false,attempted: true,err:false,err_msg:""})
        Activate_product()
    }
    else
    {
        console.log("falsess")
    }


    return<>
        {state.attempted?<>
                <div className="loadercontainer" >
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </>
        :<>
                {state.empty?<>
                    {window.location.href="/error/404/"}
                </>:<>
                    {state.err  &&  <CustomizedSnackbars message={`${state.err_msg}`}  severity="error" />}
                    {state.Activate_success  &&
                    <>
                        {/*{console.log(setTimeout(ev=>{window.location.href="/auth/"},3000))}*/}
                        <CustomizedSnackbars message={`product activated sucesfully for ${props.Gstate.email}`}  severity="success" />
                    </>
}
                    {state.success &&
                    <>
                        <div className={mPB.productdetailcontainer}>
                            <div className={mPB.productcarousel}>
                                <img src={state.result.Product.default.image} alt=""/>
                            </div>
                            <div className={mPB.productinfo}>
                                <h1 className={mPB.productH1} onClick={ev=>{
                                    window.location.href=`/product/${state.result.Product.id}`
                                }}>{state.result.Product.name}</h1>
                                <p className={mPB.productid}>Product ID: <span>{state.result.unique_u14}</span></p>
                                <p className={mPB.orderid}>Order ID: <span>{state.result.orderedByID}</span></p>
                                <p className={mPB.orderby}>Order by: <span>{state.result.orderdby}</span></p>
                                {state.result.activated ? <>

                                    <p className={mPB.ownedby}>Activated:<span> True</span></p>
                                </>:<>

                                    <p className={mPB.ownedby}>Activated:<span> False</span></p>
                                </>}

                                {state.result.activated && <>

                                    <p className={mPB.ownedby}>Owned by: <span>{state.result.user.email}</span></p>
                                </>}

                                <div className={mPB.detailqrbox} style={{width:"fit-content",height:"fit-content"}}>
                                    <QRCustom qroptions={JSON.parse(state.result.QrJson)}  width={150} height={150}
                                              Oup_url={`${window.location.protocol}//${window.location.host}/oupu/product/Detail_retrive/?unique_u14=${props.AGstate.unique_u14}`}

                                    />
                                    {/*{state.result.Oup_url_}*/}
                                </div>
                                {props.Gstate.is_coreTeam &&
                                <button className={mPB.Nimish}
                                        onClick={ev=>{
                                            // console.log("ddddddddddddddddd")
                                            let b=JSON.parse(state.result.QrJson)
                                            b.width=150
                                            b.height=150
                                            b.data=state.result.Oup_url_
                                            let qrCode = new QRCodeStyling(b)
                                            qrCode.download({ name: "qr", extension: "svg" });

                                            // setState({...state,activeattempt:true})
                                        }
                                        }
                                >Download</button>
                                }

                                <span className={mPB.buycart}>
              {state.result.activated === false && props.AGstate.show_active_button && <>
                  <p className={mPB.orderby}><span>Do u want to make user {props.Gstate.email}  owner of this product?</span></p>
                  <br/>
                  <button className={mPB.buy}
                          onClick={ev=>{
                              setState({...state,activeattempt:true})
                          }
                          }
                  >Activate</button>
              </>}

            </span>
                            </div>
                        </div>
                    </>
                    }

                </>}
            </>}

    </>
}