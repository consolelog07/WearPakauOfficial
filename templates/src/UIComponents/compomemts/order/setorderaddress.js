import React from "react";
import getCookie from "../../../components/getcooke";
import Address_Create from "./AddressCreate";
import "../../style/conformadd.css"

import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, Dialog, DialogActions, DialogContent, DialogTitle,
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import mac from "../../stylemodules/conformadd.module.css";

export default class SetorderAddress extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            result:{},
            order_created:false,
            order_fetch:false,
            err:false,
            err_msg:"",
            order_result:{},
            datafetch:false,
            attempted:false,
            prepared:false,
            address_fetch:false,
            address_result:{},
            address_attempt:false,
            order_address:false,
            ask_user_if_address_continue:false,
            modalopen:true
        }

        this.getDefault_address=this.getDefault_address.bind(this)
        this.getOrder=this.getOrder.bind(this)
        this.getAddress=this.getAddress.bind(this)
        this.call_get_add=this.call_get_add.bind(this)
        // this.setCreateOrder=this.setCreateOrder.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.CreateOrder=this.CreateOrder.bind(this)
        this.UpdateAddress=this.UpdateAddress.bind(this)
    }
    async  getDefault_address()
    {
        if (this.props.Gstate.login === false)
        {
            return setTimeout(ev=>{
                this.getDefault_address()
            },3000)
        }

        // console.log(this.props.Gstate.login)

        let req = new Request(`/Api/orders/Address/?default=true&user=${this.props.Gstate.id}`, {
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
        if(response.results.length >= 1)
        {
            this.setState({result:response.results[0],datafetch:true})
            this.getOrder()
        }
        else
        {
            window.location.href="/auth/DefaultAddress/"
        }

    }

    async getOrder()
    {
        if (this.props.Gstate.login === false)
        {
            return setTimeout(ev=>{
                this.getOrder()
            },3000)
        }
        // console.log(this.props.Gstate.login)

            let req = new Request(`/Api/orders/Orders/get_current_order/`, {
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

        if (Reflect.has(response,"error"))
        {
            this.setState({order_created:false,order_fetch:true})
            // console.log("errrrrrrrrrrrrrr")
        }

        if(Object.entries(response).length> 1)
        {
            this.setState({order_result:response,order_created:true,order_fetch:true})
        }



    }


    async getAddress(id)
    {

        if (this.props.Gstate.login === false)
        {
            return setTimeout(ev=>{
                this.getAddress(id)
            },3000)
        }
        // console.log(this.props.Gstate.login)

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


        // console.log(response)

        if (Reflect.has(response,"error"))
        {
            this.setState({address_fetch:false,address_attempt:false})
        //    no address set yet
        }

        if(response.results.length === 1)
        {
            this.setState({address_result:response.results[0],address_fetch:true,address_attempt:false})
        }
        else {}

    }

    call_get_add(id)
    {
        this.setState({address_result: {},address_fetch:false,address_attempt:true})
        this.getAddress(id)
    }



    componentDidMount() {
        this.getDefault_address()
    }


    async UpdateAddress(id)
    {
            console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        let req = new Request(`/Api/orders/Orders/UpdateAddress/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({address_id:id})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        // console.log(response)

        if (Reflect.has(response,"error"))
        {
            this.setState({address_fetch:false,address_attempt:false})
            //    no address set yet
        }
        if (Reflect.has(response,"Success"))
        {
            window.location.href="/order/"

        }

    }
    async CreateOrder(id)
    {

        let req = new Request(`/Api/orders/Orders/CreateOrder/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({address_id:id})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        console.log(response)

        if (Reflect.has(response,"error"))
        {
            this.setState({address_fetch:false,address_attempt:false})
            //    no address set yet
        }
        if (Reflect.has(response,"success") || Reflect.has(response,"Success"))
        {
            window.location.href="/order/"
            // this.setState({address_fetch:false,address_attempt:false})
            //    no address set yet
        }

    }
    createData(fields, value) {
        return {fields, value };

    }
    handleClose()
    {
        this.setState({modalopen:false,ask_user_if_address_continue:true})
    }

    render() {


        if (this.state.datafetch === false ) {
            return <>
                <div className="loadercontainer">
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </>
        }


        if(this.state.order_created && this.state.order_address === false && typeof(this.state.order_result.address_id) === "number" )
        {
            // console.log("heloooooooooooo")
            this.setState({order_address:true})
            this.call_get_add(this.state.order_result.address_id)
        }
        else {
            // console.log("hhhhhhhhhhhhhhhhhh",this.state.order_result.address_id,typeof(this.state.order_result.address_id),this.state.order_created)
        }

        if(this.state.datafetch && this.state.prepared===false)
        {
            this.rows = [
                this.createData("First_name",this.state.result.First_name),
                this.createData("Last_name",this.state.result.Last_name),
                this.createData('address', this.state.result.address),
                this.createData('address_2', this.state.result.address_2),
                this.createData('city', this.state.result.city),
                this.createData('State', this.state.result.State),
                this.createData('pincode', this.state.result.pincode),
                this.createData('country', this.state.result.country),
                this.createData('phone_number', this.state.result.phone_number),
            ];
        }
        // console.log(this.state.address_result.default)
        // console.log( this.state.order_address  , this.state.address_fetch  ,
        //     this.state.ask_user_if_address_continue, this.state.order_address === true && this.state.address_fetch === true &&
        //     this.state.ask_user_if_address_continue === false)

        if(this.state.order_fetch === true && this.state.order_created === true)
        {

        }

        return <>



            {this.state.attempted  ?
                <>
                    <>
                        <div className="loadercontainer">
                            <div className="lds-ripple">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </>
                </> : <>

                    {
                        this.state.order_address === true && this.state.address_fetch === true &&
                        this.state.ask_user_if_address_continue === false &&
                        <>
                            <Dialog
                                open={this.state.modalopen}
                                fullScreen
                                onClose={this.handleClose}
                                // style={{width:"40vw"}}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                {/* <DialogTitle id="alert-dialog-title">
                                    Place Order With this address
                                </DialogTitle> */}
                                <DialogContent>



                                    <div className={"external-container"}>
                                        <div className={"internal-container"}>
                                            <h2 className={"address-confirmation-heading"}>
                                                Confirm Your Address
                                            </h2>
                                            <div className={"detail-container"}>
                                                <label htmlFor="Name" className={"detail-label"}>Name</label>
                                                <p className={"detail-text"}>{this.state.result.First_name} {this.state.result.Last_name}</p>
                                            </div>
                                            <div className={"detail-container"}>
                                                <label htmlFor="address" className={"detail-label"}>Address</label>
                                                <p className={"detail-text"}>{this.state.result.address} {this.state.result.address_2}</p>
                                            </div>
                                            <div className={"detail-container"}>
                                                <label htmlFor="zipcode" className={"detail-label"}>Pin Code</label>
                                                <p className={"detail-text"}>{this.state.result.pincode}</p>
                                            </div>
                                            <div className={"detail-container"}>
                                                <label htmlFor="city" className={"detail-label"}>City</label>
                                                <p className={"detail-text"}>{this.state.result.city}</p>
                                            </div>
                                            <div className={"detail-container"}>
                                                <label htmlFor="state" className={"detail-label"}>State</label>
                                                <p className={"detail-text"}>{this.state.result.State}</p>
                                            </div>
                                            <div className={"detail-container"}>
                                                <label htmlFor="state" className={"detail-label"}>Country</label>
                                                <p className={"detail-text"}>{this.state.result.country}</p>
                                            </div>

                                            <div className={"detail-container"}>
                                                <label htmlFor="state" className={"detail-label"}>Default Billing Addess</label>
                                                <p className={"detail-text"}>{this.state.address_result.default === true ? "Yes":"NO"}</p>
                                            </div>
                                            <div className={"button-container"}>
                                                <button className={"edit-button"} onClick={this.handleClose} >Edit</button>
                                                <button className={"confirm-button"} onClick={ev=>{
                                                    window.location.href="/order/"
                                                }}>Confirm</button>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                                {/*<DialogActions>*/}
                                {/*    <Button onClick={this.handleClose}>Disagree</Button>*/}
                                {/*    <Button onClick={*/}
                                {/*        ev=>{*/}
                                {/*            window.location.href="/order/"*/}
                                {/*        }*/}
                                {/*    } autoFocus>*/}
                                {/*        Agree*/}
                                {/*    </Button>*/}
                                {/*</DialogActions>*/}
                            </Dialog>

                        </>

                    }

                    <div className="Shippingcontainer"  >
                        <h1 className="shipping-h1">Shipping Address</h1>
                        <hr class="hr1"></hr>
                        <div className="form">
                            <div className="fields fields--2">
                                <label className="field">
                                    <span className="field__label" htmlFor="firstname">First name</span>
                                    <input className="field__input" style={{border:"none"}} type="text" id="firstname" value={this.state.result.First_name} disabled/>
                                </label>
                                <label className="field">
                                    <span className="field__label" htmlFor="lastname">Last name</span>
                                    <input className="field__input" type="text" style={{border:"none"}} id="lastname" value={this.state.result.Last_name} disabled/>
                                </label>
                            </div>
                            <label className="field">
                                <span className="field__label" htmlFor="address">Address</span>
                                <input className="field__input" type="text" id="address"
                                       value={this.state.result.address}
                                       style={{border:"none"}}
                                       disabled
                                />
                            </label>
                            <label className="field">
                                <span className="field__label" htmlFor="landmark">Land mark</span>
                                <input className="field__input" type="text" id="landmark" value={this.state.result.address_2}
                                       style={{border:"none"}}
                                       disabled/>
                            </label>
                            <div className="fields fields--3">
                                <label className="field">
                                    <span className="field__label" htmlFor="zipcode">Zip code</span>
                                    <input className="field__input" style={{border:"none"}} type="text" id="zipcode" value={this.state.result.pincode}disabled/>
                                </label>
                                <label className="field">
                                    <span className="field__label" htmlFor="city">City</span>
                                    <input className="field__input" type="text" id="city" style={{border:"none"}} value={this.state.result.city} disabled/>
                                </label>
                                <label className="field">
                                    <span className="field__label" htmlFor="state">State / UT</span>
                                    <select className="field__input" id="state" disabled>
                                        <option value={this.state.result.city}>{this.state.result.city}</option>

                                    </select>
                                </label>
                            </div>
                        </div>
                        <hr />
                            <button className="button"
                                    onClick={ev=>{
                                        if(this.state.ask_user_if_address_continue){
                                            this.UpdateAddress(this.state.result.id)
                                        }
                                        else{
                                            this.CreateOrder(this.state.result.id)
                                        }
                                    }
                                    }>
                            Continue with Billing address</button>

                    </div>

<div className="container2">
                <Address_Create Gstate={this.props.Gstate} SGstate={this.props.SGstate} Title={"Want to use another address?"} default={false}
                                success_nav_to="/order/"
                                order_created={this.state.order_created}
                                CreateOrder={this.CreateOrder}
                                UpdateAddress={this.UpdateAddress}
                                redirect={false}

                />
                </div>


                        {/*<Card sx={{ maxWidth: 345 }} className={"container"} style={{heigh:"38vh",padding:"15px",minHeight:"500px"}}>*/}
                        {/*        <Typography gutterBottom variant="h5" component="div">*/}
                        {/*                 Default Billing Address                            </Typography>*/}

                        {/*        <CardContent>*/}
                        {/*            <TableContainer component={Paper}>*/}
                        {/*                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">*/}
                        {/*                    <TableHead>*/}
                        {/*                        <TableRow>*/}
                        {/*                            <TableCell>fields</TableCell>*/}
                        {/*                            <TableCell> value</TableCell>*/}
                        {/*                        </TableRow>*/}
                        {/*                    </TableHead>*/}
                        {/*                    <TableBody>*/}
                        {/*                        {this.rows.map((row) => (*/}
                        {/*                            <TableRow*/}
                        {/*                                key={row.fields}*/}
                        {/*                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/}
                        {/*                            >*/}
                        {/*                                <TableCell component="th" scope="row">*/}
                        {/*                                    {row.fields}*/}
                        {/*                                </TableCell>*/}
                        {/*                                <TableCell align="right">{row.value}</TableCell>*/}
                        {/*                            </TableRow>*/}
                        {/*                        ))}*/}
                        {/*                    </TableBody>*/}
                        {/*                </Table>*/}
                        {/*            </TableContainer>*/}
                        {/*        </CardContent>*/}

                        {/*    <CardActions>*/}
                        {/*        <Button size="small" style={{backgroundColor: "#a878d8"} }variant="contained" className={"button"}*/}

                                {/*onClick={ev=>{*/}
                                {/*    if(this.state.ask_user_if_address_continue){*/}
                                {/*        this.UpdateAddress(this.state.result.id)*/}
                                {/*    }*/}
                                {/*    else{*/}
                                {/*        this.CreateOrder(this.state.result.id)*/}
                                {/*    }*/}
                                {/*}*/}
                                {/*}>*/}
                        {/*            Set Default Billing Address for Order SHiping Address*/}
                        {/*        </Button>*/}
                        {/*    </CardActions>*/}
                        {/*</Card>*/}
                </>
            }
        </>
    }
}


// <TableContainer component={Paper}>
//     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead>
//             <TableRow>
//                 <TableCell>fields</TableCell>
//                 <TableCell>value</TableCell>
//             </TableRow>
//         </TableHead>
//         <TableBody>
//             {
//                 Object.keys(this.state.address_result).map(ev=>{
//                     if (ev === "id" || ev === "user" )
//                     {
//                         return
//                     }
//                     let ev2=ev
//                     if (ev === "default"  )
//                     {
//                         ev2="Billing address"
//                         if(this.state.address_result[ev] === true)
//                         {
//                             this.state.address_result[ev]="yes"
//                         }
//
//                         if(this.state.address_result[ev] === false)
//                         {
//                             this.state.address_result[ev]="no"
//                         }
//                     }
//                     return <TableRow
//                         key={ev2}
//                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                     >
//                         <TableCell component="th" scope="row">
//                             {ev2}
//                         </TableCell>
//                         <TableCell align="right">{this.state.address_result[ev]}</TableCell>
//                     </TableRow>
//                 })
{/*            }*/}

{/*        </TableBody>*/}
{/*    </Table>*/}
{/*</TableContainer>*/}