import React, { Component } from "react";
import forms from "./styles/forms.css"
import {Route} from "react-router-dom";


export default class EmailVerifysend extends React.Component
{
    constructor(props) {
        super(props);
        if (this.props.Gstate.email !== "")
        {
            this.inner=true

        }
        else
        {
            this.inner=false
        }
        this.state={a:false,err:false,up:false,attempted:false}
        // console.log(props)
        this.update_a_true=this.update_a_true.bind(this)
        this.update_err_true=this.update_err_true.bind(this)
        this.update_err_false=this.update_err_false.bind(this)
        this.update_attempted_true=this.update_attempted_true.bind(this)
        this.update_attempted_false=this.update_attempted_false.bind(this)

    }
    componentDidMount() {

        if (this.props.Gstate.email !== "")
        {

            // this.setState({up:false,err:false})
            console.log(this.props.emailverifysend(this.update_a_true,this.update_err_true))
            // console.log('called')
        }
    }

    update_a_true()
    {
        this.setState({a:true})
    }

    update_err_true()
    {
        this.setState({err:true})
    }
    update_err_false()
    {
        this.setState({err:false})
    }

    update_attempted_true()
    {
        this.setState({attempted:true})
    }
    update_attempted_false()
    {
        this.setState({attempted:false})
    }


    render() {

        // console.log(this.props.Gstate.email,this.state.a)
        return <>

            <div className="outerformcontainer">
                {this.state.attempted?  <>
                        <div className="loadercontainer" >
                            <div className="lds-ripple">
                                <div></div>
                                <div></div>
                            </div>

                        </div>
                    </> :<>


                    <div className="formcontainer">
                        <h2 className="formheading">Verify your email address</h2>

                        {this.inner === true && <h2 className="formheading" style={{fontSize:14}}>Verification mail is sent on :{this.props.Gstate.email}</h2>}
                        {this.inner === false && this.state.a === true && <h2 className="formheading" style={{fontSize:14}}>Verification mail is sent on :{this.props.Gstate.email}</h2>}
                        {this.state.err === true && this.state.up === false &&  <span className="formwarning" style={{color:"red"}}>error with email address : {this.props.Gstate.email}</span> }

                        {
                            this.inner === false && this.state.a === false &&

                            <>
                                <div className="inputcontainer">
                                    <h2 className="formheading" style={{fontSize:14}}>Send Verification mail on email :</h2>

                                    <label htmlFor="name" className="emaillabel">Your email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={this.props.Gstate.email}
                                        onChange={(ev)=>{
                                            this.setState({up:true,err:false})
                                            // console.log("hhhhhhhhhhhhhhh")
                                            this.props.SGstate({email:ev.target.value}
                                            )}}
                                        required={true}
                                    />
                                </div>

                                <form onSubmit=
                                          {
                                              (ev)=>
                                              {
                                                  ev.preventDefault()
                                                  this.setState({up:false,err:false,attempted:true})
                                                  this.props.emailverifysend(this.update_a_true,this.update_err_true,this.update_err_false,this.update_attempted_false)
                                              }
                                          }
                                      className="loginform">


                                    <input type="submit" className="submitbutton" value="Send Verification Email"/>
                                </form>
                            </>




                        }



                    </div>

                </>}


            </div>

            {/*<h1>emailverifysend1111111111111111111111111111111111</h1>*/}
            {/*{this.state.a === true && <h1>sent succesfully</h1>}*/}
        </>
    }
}