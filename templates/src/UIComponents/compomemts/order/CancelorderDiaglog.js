import React, {useState} from "react";
import getCookie from "../../../components/getcooke";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";

export default function CancelorderDialog(props)
{
    const setState=props.setState
    const state=props.state
    const {modal,setModal}=props

    const [reason,setReason]=useState("")
    async function CancelOrder(reason)
    {
        console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

        let ur=`/Api/orders/Orders/${state.result.id}/cancel_order/`

        if(props.admin !== undefined)
        {
            ur=`/Api/orders/AdminOrders/${state.result.id}/Cancellation/`
        }

        let req = new Request(ur, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent
            method: 'Post',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({reason:reason})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })

        console.log(response)
        if(Reflect.has(response,"error") )
        {
            setState({
                ...state,
                err:true,
                err_msg:response["error"],
                attempted: false
            })
        }
        if(Reflect.has(response,"Success") )
        {
            window.location.reload()
        }
        // if(response.results.length === 1)
        // {
        //
        //     setState({...state,address_result:response.results[0],address_fetch: false,images_fetch: true,attempted: false})
        // }
        // else
        // {
        //     window.location.href="/error/404/"
        // }

    }

    function cancelorderUpper()
    {

        if(reason === "" || reason.length < 15)
        {

            setState({
                ...state,
                err:true,
                err_msg:"reason of cancel order should contain max 15 leters ",
            })
            return
        }

        setState({
            ...state,
            err:false,
            err_msg:"",
            attempted: true
        })
        setModal(false)
        CancelOrder(reason)
    }
    function modalClose()
    {
        setModal(!modal)
    }
    return<>
        <Dialog
            // fullScreen
            open={modal}
            onClose={modalClose}
        >
            {props.admin !== undefined &&
            <DialogTitle>Admin CancelOrder</DialogTitle>
            }

            {props.admin === undefined &&
            <DialogTitle>Cancel Order</DialogTitle>
            }
            <DialogContent>
                {props.admin !== undefined &&
                <DialogContentText>
                    Do u want to change order status to Cancel?
                </DialogContentText>
                }
                {props.admin === undefined && state.result.payment_method === "razorpay" &&
                <DialogContentText>
                    only 20 % of total payment will be refunded
                </DialogContentText>
                }

                <TextField
                    id="name"
                    label="Reason for Cancel order"
                    type="Text"
                    fullWidth
                    variant="standard"
                    value={reason}
                    onChange={ev=>{
                        setReason(ev.target.value)
                    }}

                />
            </DialogContent>
            <DialogActions>
                <Button onClick={modalClose}>Cancel</Button>
                <Button onClick={cancelorderUpper} color="error" variant="contained" >Order Cancel</Button>
            </DialogActions>
        </Dialog>


    </>


}