import React, {Component, useState} from "react";
import forms from "./styles/forms.css"
// import loader from "./styles/loader.css"
import nexttransport from "./nexttransport";
import {Snackbar} from "@material-ui/core";

export default function LoginView(props)
{
    // console.log(props)
    const [created,setCreated]=useState(false)
    const [attemted,setAttemted]=useState(false)
    const [error,setError]=useState(false)
    const [error_msg,setError_msg]=useState("")



    if(created)
    {

    }
    return<>

        {/*<h1>Loginnnnnnnnnnnnnnnnnn</h1>*/}
        {/*<form onSubmit={(ev)=>{ev.preventDefault()}}>*/}
        {/*    <input name="email"  type="email"  value={props.Gstate.email} onChange={(ev)=>{props.SGstate({email:ev.target.value})}}/>*/}
        {/*    <input name="password" type="text"  value={props.Gstate.password} onChange={(ev)=>{props.SGstate({password:ev.target.value})}} />*/}
        {/*    <button onClick={ev=>{props.login()}}> login </button>*/}
        {/*</form>*/}
        <Snackbar
            anchorOrigin={{  vertical:"top", horizontal:"center" }}
            open={created}
            // onClose={handleClose}
            message="looged in"
            key={"top" + "center"}
            style={{backgroundColor:"#a878d8"}}
        />

        {created  && nexttransport("/auth/")}

        <div className="outerformcontainer">
            {attemted?  <>
            <div className="loadercontainer" >
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
                    
            </div>
                    </> :

            <>
                <div className="formcontainer">
                    <h2 className="formheading">Log in to your account</h2>
                    <form
                        onSubmit=
                            {
                                (ev)=>
                                {
                                    ev.preventDefault()
                                    setAttemted(true)
                                    setError(false)
                                    setError_msg("")
                                    props.login(setCreated,setAttemted,setError,setError_msg)
                                }
                            }
                        className="loginform">


                        <div className="inputcontainer">
                            <label htmlFor="name" className="emaillabel">Your email</label>
                            <input
                                name="email"
                                type="email"
                                value={props.Gstate.email}
                                onChange={(ev)=>{props.SGstate({email:ev.target.value})}}
                                autoComplete="nope"
                                required={true}
                            />
                        </div>

                        <div className="inputcontainer">
                            <label htmlFor="password" className="passwordlabel">Password</label>
                            <input

                                name="password"
                                type="password"  value={props.Gstate.password}
                                onChange={(ev)=>{props.SGstate({password:ev.target.value})}}
                                autoComplete="off"
                                required={true}
                            />
                        </div>


                        <input type="submit" className="submitbutton" value="Login"/>
                        {error === true && <span className="formwarning">{error_msg}</span>}
                        {error === true && error_msg === "account not activated yet" &&
                        <span className="forgotpass">
                        <a href="/auth/emailverifysent/">activate account?
                        </a></span>}
                        <span className="privacynotice"><p>By continuing, you agree to Wear Pakau's <a href="/TermsAndConditionAndPrivacyPolicy">Terms and Condition </a>and<a
                            href="/TermsAndConditionAndPrivacyPolicy"> Privacy Policy.</a></p></span>
                        <span className="forgotpass"><a href="/auth/password_reset/">Forgot password?</a></span>
                        <span className="alreadyhaveacc"><p>Don't have an account? <a href="/auth/Createuser/">Sign Up</a></p></span>
                    </form>
                </div>
            </>}

        </div>

    </>
}