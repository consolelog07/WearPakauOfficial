import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import mDetail from "../../stylemodules/orderDetail.module.css";
import getCookie from "../../../components/getcooke";

export default function OrderAdminStatusChange (props)
{
    const setState=props.setState
    const state=props.state
    const {modal,setModal}=props


    async function CancelOrder(reason)
    {
        console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

        // 59/Shipped/
        let req = new Request(`/Api/orders/AdminOrders/${state.result.id}/${reason}/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent
            method: 'Post',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },

            // body: JSON.stringify({reason:reason})
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

    }
    // console.log(state,props)

    function proceed()
    {

        state.result.Order_status === "placed"

        setState({
            ...state,
            err:false,
            err_msg:"",
            attempted: true
        })
        setModal(false)
        state.result.Order_status === "placed" ?CancelOrder("Process"): CancelOrder("Shipped")
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
            <DialogTitle>Status Change Admin</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do u want to change order Status to {state.result.Order_status === "placed" ? "Processing" : "Shipped"}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={modalClose}>Cancel</Button>
                <Button onClick={proceed} color="error" variant="contained" >Continue</Button>
            </DialogActions>
        </Dialog>


    </>


}