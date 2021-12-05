import React, {useState} from "react";
import "../../style/order_address.css"
import getCookie from "../../../components/getcooke";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import CustomizedSnackbars from "../alert";




export default class Address_Create extends React.Component
{
    constructor(props) {
        super(props);

        var form_value=
        {
            user: this.props.Gstate.id,
            First_name: "",
            Last_name: "",
            address: "",
            address_2: "",
            city: "",
            State: "",
            pincode: null,
            country: "India",
            phone_number: null,
            "default": this.props.default
        }


        if(props.default === true )
        {
            if(props.no_result === false)
            {
                this.id_add=props.default_address_.id
                // console.log(this.id_add)

                form_value={
                    ...form_value,
                    First_name:props.default_address_.First_name,
                    Last_name:props.default_address_.Last_name,
                    address:props.default_address_.address,
                    address_2:props.default_address_.address_2,
                    city:props.default_address_.city,
                    State:props.default_address_.State,
                    pincode:props.default_address_.pincode,
                    country:props.default_address_.country,
                    phone_number:props.default_address_.phone_number,

                }
            }
        }
        this.state={
            result:{},
            err:false,
            err_msg:"",
            attempted:false,
            modalopen:false,
            success:false,
            empty:false,
            form_value: form_value

        }

    this.onClickCreate=this.onClickCreate.bind(this)
    this.Post_address=this.Post_address.bind(this)
    this.handleClose=this.handleClose.bind(this)
    this.handleAgree=this.handleAgree.bind(this)

    }


    onClickCreate()
    {
        // console.log(this.state.form_value)
        if (this.state.form_value.First_name === "")
        {

            this.setState({empty:true,err_msg:"First_name cannot be empty"})
            return false
        }

        if ( this.state.form_value.Last_name=== "")
        {
            this.setState({empty:true,err_msg:"Last_name cannot be empty"})
            return false
        }
        if (this.state.form_value.address=== "")
        {

            this.setState({empty:true,err_msg:"address cannot be empty"})
            return false
        }
        if (this.state.form_value.address_2=== "")
        {
            this.setState({empty:true,err_msg:"landmark cannot be empty"})
            return false
        }
        if (this.state.form_value.city=== "")
        {
            this.setState({empty:true,err_msg:"city cannot be empty"})
            return false
        }
        if (this.state.form_value.State=== "")
        {
            this.setState({empty:true,err_msg:"State cannot be empty"})
            return false
        }
        if (this.state.form_value.pincode=== null)
        {
            this.setState({empty:true,err_msg:"pincode cannot be empty"})
            return false
        }
        if (this.state.form_value.phone_number === null )
        {
            this.setState({empty:true,err_msg:"phone_number cannot be empty"})
            return false
        }
        if (this.state.form_value.phone_number === "" )
        {
            this.setState({empty:true,err_msg:"phone_number cannot be empty"})
            return false
        }
        if(document.querySelector(".phonenumber").checkValidity() === false)
        {
            this.setState({empty:true,err_msg:"enter an valid indian phone_number"})
            return false
        }


         // showmodal
        this.setState({modalopen:true,empty:false,err_msg:""})
    }
    async  Post_address()
    {
        // console.log(this.topicId)
        let req = new Request(`/Api/orders/Address/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({...this.state.form_value})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        // console.log(response)
        if(Object.entries(response).length> 1)
        {
            this.setState({attempted:false,success:true})
            if(this.props.default === false)
            {

                if(this.props.order_created === false )
                {
                    this.props.CreateOrder(response.id)
                }else {
                    this.props.UpdateAddress(response.id)
                }

            }



        }
        else
        {
            this.setState({attempted:false,success:false,err:true,err_msg:response[Object.keys(a)[0]][0]})
        }

    }
    async  Update_default_Post_address()
    {
        // console.log(this.topicId)
        let req = new Request(`/Api/orders/Address/${this.id_add}/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'PUT',

            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({...this.state.form_value})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        // console.log(response)
        if(Object.entries(response).length> 1)
        {
            this.setState({attempted:false,success:true})
            if(this.state.default === false)
            {

                if(this.props.order_created === false )
                {
                    this.props.CreateOrder(response.id)
                }else {
                    this.props.UpdateAddress(response.id)
                }

            }

        }
        else
        {
            this.setState({attempted:false,success:false,err:true,err_msg:response[Object.keys(a)[0]][0]})
        }

    }


    handleAgree()
    {
        this.setState({attempted:true,success:false,err:false,err_msg:""})
        if(this.props.default === true && this.props.no_result === false )
        {
            this.Update_default_Post_address()
        }
        else {
            this.Post_address()
        }

    }
    handleClose()
    {
        this.setState({modalopen:false,empty:false,err_msg:""})
    }


    createData(fields, value) {
        return {fields, value };

    }

    render() {
        if(this.state.modalopen)
        {
            this.rows = [
                this.createData("First_name",this.state.form_value.First_name),
                this.createData("Last_name",this.state.form_value.Last_name),
                this.createData('address', this.state.form_value.address),
                this.createData('address_2', this.state.form_value.address_2),
                this.createData('city', this.state.form_value.city),
                this.createData('State', this.state.form_value.State),
                this.createData('pincode', this.state.form_value.pincode),
                this.createData('country', this.state.form_value.country),
                this.createData('phone_number', this.state.form_value.phone_number),
            ];

        }

        return<>


            {this.state.attempted?
            <>
                <>
                    <div className="loadercontainer" >
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </>
            </>:<>
                    {this.state.success  &&
                    <>
                        { this.props.redirect &&<>
                            {
                                console.log(
                                    setTimeout(ev=>{
                                        window.location.href=this.props.success_nav_to
                                    },3000))
                            }
                        </> }

                        <CustomizedSnackbars message={"address added succesfully"}   severity="success" />
                    </>
                    }

                    {this.state.err  &&
                    <>
                        {<>
                            {console.log(setTimeout(ev=>{
                                this.setState({
                                    err:false
                                })
                            },3000))}
                            </> }
                        <CustomizedSnackbars message={this.state.err_msg}   severity="error" />
                    </>
                    }



                    {this.state.empty  &&
                    <>
                        {console.log(setTimeout(ev=>{
                            this.setState({
                                empty:false
                            })
                        },3000))}
                        <CustomizedSnackbars message={this.state.err_msg}   severity="error" />
                    </>
                    }

                    {this.state.modalopen &&
                    <Dialog
                        open={this.state.modalopen}
                        fullScreen
                        onClose={this.handleClose}
                        // style={{width:"40vw"}}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {this.props.Title}
                        </DialogTitle>
                        <DialogContent>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>fields</TableCell>
                                            <TableCell> value</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.rows.map((row) => (
                                            <TableRow
                                                key={row.fields}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.fields}
                                                </TableCell>
                                                <TableCell align="right">{row.value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Disagree</Button>
                            <Button onClick={this.handleAgree} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                    }


                    <div className="container">
                        <h1>{this.props.Title}</h1>
                        {/*Shipping*/}
                        <p>Please enter your shipping details.</p>
                        <hr/>
                        <div className="form">

                            <div className="fields fields--2">
                                <label className="field">
                                    <span className="field__label" htmlFor="firstname">First name</span>
                                    <input className="field__input" type="text" id="firstname"
                                           value={this.state.form_value.First_name}
                                           pattern="[a-zA-Z]*"
                                           onChange={ev=>{this.setState(
                                               (state, props)=>(
                                                   {
                                                       form_value: {
                                                           ...state.form_value,           // copy all other key-value pairs of food object
                                                           First_name:ev.target.value
                                                       }
                                                   }
                                               )
                                           )
                                            }
                                           }
                                           required
                                    />
                                </label>
                                <label className="field">
                                    <span className="field__label" htmlFor="lastname">Last name</span>
                                    <input className="field__input" type="text" id="lastname"
                                           // value={this.state.form_value.Last_name}
                                           value={`${this.state.form_value.Last_name}`}
                                           required
                                           onChange={ev=>{this.setState(
                                               (state, props)=>(
                                                   {
                                                       form_value: {
                                                           ...state.form_value,           // copy all other key-value pairs of food object
                                                           Last_name:ev.target.value
                                                       }
                                                   }
                                               )
                                           )
                                           }
                                           }


                                    />
                                </label>
                            </div>
                            <label className="field">
                                <span className="field__label" htmlFor="address">Phonenumber</span>
                                <input className="field__input phonenumber" type="text" id="address"

                                       value={this.state.form_value.phone_number}
                                       pattern="[789][0-9]{9}"
                                       onChange={ev=>{this.setState(
                                           (state, props)=>(
                                               {
                                                   form_value: {
                                                       ...state.form_value,           // copy all other key-value pairs of food object
                                                       phone_number:ev.target.value
                                                   }
                                               }
                                           )
                                       )
                                       }
                                       }


                                       required
                                />
                            </label>


                            <label className="field">
                                <span className="field__label" htmlFor="address">Address</span>
                                <input className="field__input" type="text" id="address"
                                       value={this.state.form_value.address}

                                       onChange={ev=>{this.setState(
                                           (state, props)=>(
                                               {
                                                   form_value: {
                                                       ...state.form_value,           // copy all other key-value pairs of food object
                                                       address:ev.target.value
                                                   }
                                               }
                                           )
                                       )
                                       }
                                       }
                                       required
                                />
                            </label>
                            <label className="field">
                                <span className="field__label" htmlFor="landmark">Land mark</span>
                                <input className="field__input" type="text" id="landmark"
                                       value={this.state.form_value.address_2}

                                       required
                                       onChange={ev=>{this.setState(
                                           (state, props)=>(
                                               {
                                                   form_value: {
                                                       ...state.form_value,           // copy all other key-value pairs of food object
                                                       address_2:ev.target.value
                                                   }
                                               }
                                           )
                                       )
                                       }
                                       }
                                />
                            </label>
                            <div className="fields fields--3">
                                <label className="field">
                                    <span className="field__label" htmlFor="zipcode">Pin code</span>
                                    <input className="field__input" type="text"
                                           value={this.state.form_value.pincode}
                                           pattern="[0-9]{6}"

                                           required
                                           onChange={ev=>{this.setState(
                                               (state, props)=>(
                                                   {
                                                       form_value: {
                                                           ...state.form_value,           // copy all other key-value pairs of food object
                                                           pincode:ev.target.value
                                                       }
                                                   }
                                               )
                                           )
                                           }
                                           }

                                           id="zipcode"/>
                                </label>
                                <label className="field">
                                    <span className="field__label" htmlFor="city">City</span>
                                    <input className="field__input" type="text" id="city"
                                           value={this.state.form_value.city}

                                           required
                                           onChange={ev=>{this.setState(
                                               (state, props)=>(
                                                   {
                                                       form_value: {
                                                           ...state.form_value,           // copy all other key-value pairs of food object
                                                           city:ev.target.value
                                                       }
                                                   }
                                               )
                                           )
                                           }
                                           }
                                    />
                                </label>
                                <label className="field">
                                    <span className="field__label" htmlFor="state">State / UT</span>
                                    <select className="field__input" id="state"
                                            required
                                    value={this.state.form_value.State}
                                            onChange={ev=>{this.setState(
                                                (state, props)=>(
                                                    {
                                                        form_value: {
                                                            ...state.form_value,           // copy all other key-value pairs of food object
                                                            State:ev.target.value
                                                        }
                                                    }
                                                )
                                            )
                                            }
                                            }
                                    >
                                        <option value="" default></option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Dadra Nagar Haveli and Daman Diu">Dadra Nagar Haveli and Daman
                                            Diu
                                        </option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Ladakh">Ladakh</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Puducherry">Puducherry</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <hr/>
                            <button className="button" onClick={this.onClickCreate}>Continue</button>
                    </div>
                </>}

        </>
    }

    // return
}