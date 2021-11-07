

import React, {Component, useState} from "react";
import nexttransport from "./nexttransport";
import {Snackbar} from "@material-ui/core";


export default function Emailverifyconform(props)
{
    // console.log(props)
    const [attempt,setAttempt]=useState(false)
    const [success,setSuccess]=useState(false)
    const [token_err,setToken_err]=useState(false)
    const [err,setErr]=useState(false)

    const token=window.location.search.substring(window.location.search.indexOf('=')+1,window.location.search.length)
    if (token ==="" && token_err === false)
    {
      setToken_err(true)
    }
    else if(attempt === false)
    {
        setAttempt(true)
        setSuccess(false)
        setErr(false)
        props.emailverifyconfirm(token,setAttempt,setSuccess,setToken_err,setErr)
    }

    return<>

        {success && nexttransport("/auth/login")}
        <Snackbar
            anchorOrigin={{  vertical:"top", horizontal:"center" }}
            open={success}
            // onClose={handleClose}
            message="you will be redirected to login"
            key={"top" + "center"}
            style={{backgroundColor:"#a878d8"}}
        />


        <div className="outerformcontainer">
            <div className="formcontainer">

                {token_err === true &&
                <h2 className="formheading">
                Invalid Token
                </h2>}
                {success === true &&
                <h2 className="formheading">
                    Your email address has been verified, Thanks for joining us
                </h2>
                }



            </div>
        </div>

        {/*<h1>password resrt</h1>*/}
        {/*<form onSubmit={(ev)=>{ev.preventDefault()}}>*/}
        {/*    <input name="password"  type="password"  value={email} onChange={(ev)=>{setEmail(ev.target.value)}}/>*/}
        {/*    <button onClick={ev=>{props.paswoedresetconfirm(token,email)}}> ChangePassword </button>*/}
        {/*</form>*/}
    </>
}