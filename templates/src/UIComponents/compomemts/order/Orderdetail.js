import React ,{useState}from "react";
import "../../style/orderDetail.css";
import mDetail from "../../stylemodules/orderDetail.module.css"
import getCookie from "../../../components/getcooke";
import {useParams} from "react-router-dom";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@material-ui/core";
import QRCustom from "../../QRCustom";
import * as PropTypes from "prop-types";
import CustomizedSnackbars from "../alert";
import CancelorderDialog from "./CancelorderDiaglog";
import PdfCreate from "./Pdfcreate";
import OrderxStatusChange from "../admin/detail";
import OrderAdminStatusChange from "../admin/detail";

class TextFielder extends React.Component {
    render() {
        return null;
    }
}

TextFielder.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    autoFocus: PropTypes.bool,
    id: PropTypes.string,
    variant: PropTypes.string,
    fullWidth: PropTypes.bool,
    margin: PropTypes.string
};
export default function OrderDetail(props){

    // if( props.admin !== undefined && props.set === false){
    //     props=props.props
    //     props.set=true
    // }
    const [modal,setModal]=useState(false)
    const [modal2,setModal2]=useState(false)
    const [modal3,setModal3]=useState(false)

    const [state,setState]=useState({
        attempted:false,
        fetch:true,
        err:false,
        err_msg:"",
        result:[],
        address_result:[],
        address_fetch:false,
        params:useParams(),
        images_list: {},
        name_list:{},
        cat_list:{},
        images_fetch:false,
        image_error:false,
        Dialog2:true


    })
    const [products,setProducts]=useState([])

    // ,state.result,state.address_result


    async function getOrder()
    {
        let z=`/Api/orders/Orders/?id=${state.params.topicId}`
        // console.log(props.admin)
        if( props.admin === true){
            z=`/Api/orders/AdminOrders/?id=${state.params.topicId}`

        }


        let req = new Request(z, {
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
        // "detail": "Authentication credentials were not provided."
        if (Reflect.has(response,"detail") && response["detail"] === "Authentication credentials were not provided.")
        {
            // console.log(response)
            window.location.href="/error/404/"

        }


        // if (Reflect.has(response,"detail"))
        // {
        //     // this.setState({address_fetch:false,address_attempt:false})
        //     //    no address set yet
        //     setState({...state,err: true,err_msg:"next page not found",current_page:state.current_page-1,fetch: true})
        // }


        if(response.results.length === 1)
        {
            console.log(response.results[0])
            var a=[]
            a.push(...response.results[0].Ordered_products)
            setProducts(a)
            // console.log(a,"a")
            setState({...state,result:response.results[0],fetch: false,attempted: false,address_fetch:true})


        }
        else {
            window.location.href="/error/404/"
        }

    }
    async function getAllImages()
    {

        let req = new Request(`/Api/orders/Orders/get_all_images/`, {
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


        // console.log(response.results)
        // "detail": "Authentication credentials were not provided."
        // if (Reflect.has(response,"detail") && response["detail"] === "Authentication credentials were not provided.")
        // {
        //     console.log("do not show")
        //     window.location.href="/error/404/"
        // }


        // if (Reflect.has(response,"detail"))
        // {
        //     // this.setState({address_fetch:false,address_attempt:false})
        //     //    no address set yet
        //     setState({...state,err: true,err_msg:"next page not found",current_page:state.current_page-1,fetch: true})
        // }


        // console.log(response,"ddddddddddddddd")

        var a=JSON.parse(response)
        var e={}
        var f={}
        var j={}
        var err=false

        try {
            a.forEach(ev=>{
                f[ev.id]=ev.name
                e[ev.id]=`${origin}/media/${ev.default__image}`
                j[ev.id]=ev.category
            })
            // console.log(e,f,j)
        }
        catch (error)
        {
            err:tr
            // console.log(error)
        }

        setState({...state,
            images_list:e,
            err:err,
            name_list:f,
            cat_list: j,
            fetch: false,attempted: false,images_fetch:false})


    }
    async function getAddress(id)
    {

        if(props.admin === true)
        {
            setState({...state,address_result:state.result.Address,address_fetch: false,images_fetch: true,attempted: false})
            return true
        }

        let req = new Request(`/Api/orders/Address/?id=${id}`, {
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


        if(response.results.length === 1)
        {

            setState({...state,address_result:response.results[0],address_fetch: false,images_fetch: true,attempted: false})
        }
        // else
        // {
        //     window.location.href="/error/404/"
        // }

    }

    function modalClose()
    {
        setModal(!modal)
    }
    function modalClose2()
    {
        setModal2(!modal2)
    }
    function modalClose3()
    {
        setModal3(!modal3)
    }
    if(state.fetch === true && state.attempted === false)
    {
        setState({...state,attempted:true})
        getOrder()
    }

    if(state.address_fetch === true && state.attempted === false)
    {
        setState({...state,attempted:true})
        getAddress(state.result.address_id)
    }
    if(state.images_fetch === true && state.attempted === false)
    {
        setState({...state,attempted:true})
        getAllImages()
    }
    // console.log(state)
    // console.log(mDetail)
    return<>
        {state.attempted?
            <><>
                <div className="loadercontainer" >
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </></>:<>
                {state.err  &&
                <>
                    {<>
                        {console.log(setTimeout(ev=>{
                            setState({...state,err:false,err_msg:""})
                        },3000))}
                    </> }
                    <CustomizedSnackbars message={state.err_msg}   severity="error" />
                </>
                }

                <CancelorderDialog setState={setState} state={state}   admin={props.admin} setModal={setModal} modal={modal}/>
                <OrderAdminStatusChange setState={setState} state={state}   setModal={setModal3} modal={modal3}/>
                {modal2 &&
                <PdfCreate setState={setState} state={state}   setModal={setModal2} modal={modal2} />
                }

                <div className={mDetail.orderdetailcontainer} >
                    <h2 className={mDetail.orderdetailhead}>Order Details</h2>
                    <div className={mDetail.container}>




                        <ul className={mDetail.progressbar}>
                            {/*<li className={mDetail.active}>Placed</li>*/}
                            <li className={
                                ( state.result.Order_status === "placed" || state.result.Order_status === "Processing" || state.result.Order_status === "Shipped" || state.result.Order_status === "Out For Delivery" || state.result.Order_status === "Delivered" )&&
                                mDetail.active}>Placed</li>
                            <li className={
                                (state.result.Order_status === "Processing" || state.result.Order_status === "Shipped" || state.result.Order_status === "Out For Delivery" || state.result.Order_status === "Delivered" )&&
                                mDetail.active}
                            >Preparing</li>
                            <li
                                className={
                                    (  state.result.Order_status === "Shipped" || state.result.Order_status === "Out For Delivery" || state.result.Order_status === "Delivered") &&
                                    mDetail.active}
                            >Shipped</li>
                            <li
                                className={
                                    (state.result.Order_status === "Out For Delivery" || state.result.Order_status === "Delivered") &&
                                    mDetail.active}
                            >Out For Delivery</li>
                            <li
                                className={
                                    state.result.Order_status === "Delivered" &&
                                    mDetail.active}
                            >Delivered</li>
                        </ul>
                    </div>
                    <div className={mDetail.orderdetail}>
        <span className={mDetail.detailcontainer}>
          <p className={mDetail.orderid}>Order ID: <span>{state.result.OrderId}</span></p>
          <p className={mDetail.orderid}>First Name: <span>{state.address_result.First_name}</span></p>
          <p className={mDetail.orderid}>Last Name: <span>{state.address_result.Last_name}</span></p>
        <p className={mDetail.orderid}>Phone Number: <span>{state.address_result.phone_number}</span></p>


          <p className={mDetail.address}>
            Shipping Address:<span>

              {`${state.address_result.address} ,${state.address_result.address_2} ,${state.address_result.city} ,${state.address_result.State}
               ${state.address_result.country} , ${state.address_result.pincode}`}
          </span>
          </p>
          <p className={mDetail.status}>Status: <span> {state.result.Order_status}</span></p>


            {state.result.Order_status === "Cancelled" || state.result.Order_status === "UserCancle" &&
            <p className={mDetail.orderid}>Reason for Cancelation: <span>{state.result.reason}</span></p>
            }

            <p className={mDetail.paymenttype}>Payment: <span> {
                (ev=>{
                    if(state.result.payment_method === "cod")
                        return "Cash on delivery"
                    if(state.result.payment_method === "razorpay")
                        return "Online Payment"

                    return "None"
                })()
            }</span></p>
            {props.admin === true && state.result.payment_method === "razorpay" && <><p className={mDetail.status}>Razorpay OrderID: <span> {state.result.RazorpayOrderId_}</span></p></>}
            <p className={mDetail.paymenttype}>Coupon Applied: <span> {state.result.coupons === null?"None":state.result.coupon_name}</span></p>
            {state.result.Order_status === "placed"  &&
            <button className={mDetail.cancel} onClick={modalClose}>Cancel Order</button>
            }


            {props.admin === true &&<>
                {state.result.Order_status === "placed" && <button className={mDetail.cancel} onClick={modalClose3}>Change Status to Processing</button>
                }

                {state.result.Order_status === "Processing" &&  <button className={mDetail.cancel} onClick={modalClose}>Cancel Order</button>
                }
                {state.result.Order_status === "Processing" && <button className={mDetail.cancel} onClick={modalClose3}>Change Status to  Shipped</button>
                }
                {state.result.Order_status === "Shipped" &&  <button className={mDetail.cancel} onClick={modalClose}>Cancel Order</button>
                }
            </>}
            <button className={mDetail["print-reciept"]} onClick={modalClose2}>Print Reciept</button>

        </span>
                        <div className={mDetail.billingdetailcontainer}>
                            <p className="detailhead">Billing Details</p>
                            <ul>
                                <li className="carrtotal">
                                    Cart Total
                                    <span>RS.{state.result.total_}</span>
                                </li>
                                <li className="shippingcharges">
                                    Shipping Charges
                                    <span>RS. {state.result.shipingcharge_}</span>
                                </li>
                                {state.result.giftwrap === true &&
                                <li className="shippingcharges">
                                    Gift Wrap Charge
                                    <span>RS. {state.result.giftwrapcharge_}</span>
                                </li>}

                                <li className="totalpayable">
                                    Total Payable
                                    <span>RS. {state.result.with_shiphing_charge_}</span>
                                </li>

                                {state.result.coupons !== null &&
                                <li className="totalpayable">
                                    Total Payable(coupon applied)
                                    <span>RS. {state.result.after_coupon_applied_}</span>
                                </li>}
                            </ul>
                        </div>
                    </div>

                    <div className={mDetail.productcontainer}>

                        {products.map(ev=>{

                            return <div className={mDetail.product}>
                                <div className={mDetail.productimgcontainer}>
                                    <img src={state.images_list[ev.Product]} alt=""/>
                                </div>
                                <div className={mDetail.productdetail}>
                                    <a className={mDetail.productname} href={`/product/${ev.Product}`}><span>{state.name_list[ev.Product]}</span></a>
                                    <h2 className={mDetail.productname}>Product ID: <span><a style={{textDecoration:"none"}} href={`/oupu/product/Detail_retrive/?unique_u14=${ev.unique_u14}`}> {ev.unique_u14}</a> </span></h2>
                                    <p className={mDetail.productcategory}>Product Category: <span>{state.cat_list[ev.Product]}</span></p>
                                    {ev.size !== "" &&        <p className={mDetail.productcategory}>Size: <span>{ev.size}</span></p>}

                                    {/*{console.log(ev.QrJson,"ddddddddddddddd")}*/}
                                    {/*<div className={mDetail.qrbox} style={{ width:" fit-content",height: "fit-content"}}>*/}
                                    {/*    <QRCustom qroptions={JSON.parse(ev.QrJson)}  width={100} height={100} Oup_url={`${window.location.protocol}//${window.location.host}/oupu/product/Detail_retrive/?unique_u14=${ev.unique_u14}`}/>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        })}




                    </div>
                </div>
            </>}


    </>
}