import React, {Component, useState} from "react";
import CustomizedSnackbars from "../UIComponents/compomemts/alert";

export default function  SMSverifyconform(props)
{


    const [created,setCreated]=useState(false)
    const [created2,setCreated2]=useState(false)

    const [attemted,setAttemted]=useState(false)
    const [error,setError]=useState(false)
    const [error_msg,setError_msg]=useState(false)
    const [resend,setResend]=useState(false)
    const [resendclick,setResendclick]=useState(false)

    const [phone_number,setPhone_number]=useState(props.Gstate.phone_number)
    // console.log(props.Gstate)
    // console.log(resendclick)
    return <>



        <div className="outerformcontainer">


            {attemted?  <>
                <div className="loadercontainer" >
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>

                </div>
            </> :<>
                <div className="formcontainer">
                    <h2 className="formheading">OTP verificatin</h2>

                    {created && resendclick &&
                    <>
                        {console.log(setTimeout(ev=>{window.location.href="/auth/SMSverifyconform/"},2000))}
                        <CustomizedSnackbars message="Otp Sent sucesfully"  severity="success" />
                    </>}

                    {created && resendclick === false && <h2 className="formheading">Number verified</h2>}
                    {created &&  resendclick === false &&
                        <>
                            {console.log(setTimeout(ev=>{window.location.href="/auth/"},2000))}
                            <CustomizedSnackbars message="number verified sucesfully" severity="Success"/>

                        </>
                    }


                    {props.Gstate.phone_number_verify ?
                        <h1>User phone number {props.Gstate.phone_number} already verified</h1>:<>
                            <p>Enter 4 digit otp sent on ur phone number</p>
                            <form action="" className="loginform"
                                  onSubmit={
                                      (ev)=>
                                      {
                                          ev.preventDefault()

                                          if (props.Gstate.login=== true )
                                          {
                                              setAttemted(true)
                                              setError(false)
                                              setError_msg("")
                                              setCreated(false)
                                              props.SMSverifyconfirm(phone_number,setCreated,setCreated2,setAttemted,setError,setError_msg)
                                          }
                                          else
                                          {

                                              setError(true)
                                              setError_msg("login before verifing  password")

                                          }
                                      }
                                  }
                            >

                                <div className="inputcontainer">
                                    <label htmlFor="password" className="passwordlabel">OTP</label>
                                    <input
                                        type="tel" name="first name"
                                        pattern="...."
                                        value={phone_number}
                                        onChange={(ev)=> { setPhone_number(ev.target.value)}}
                                        required
                                    />
                                </div>


                                <input type="submit" className="submitbutton" value="Submit"/>
                                {error &&  <span className="formwarning">{error_msg}</span>}
                                {error &&
                                <CustomizedSnackbars message={error_msg} severity="error"/>
                                }

                            </form>
                            {resend ?
                                <span className="alreadyhaveacc"><p><a href={window.location.href} onClick={ev=>{
                                    ev.preventDefault()
                                    setAttemted(true)
                                    setError(false)
                                    setError_msg("")
                                    setCreated(false)
                                    setResendclick(true)
                                    let a=props.Gstate.phone_number
                                    // console.log(a)
                                    if(a.startsWith("0") === true)
                                    {
                                        a=a.substring(1,a.length)
                                        a=a.replace(" ","")
                                    }
                                    // console.log(a)
                                    if (/^[789][0-9]{9}$/.test(a) === false)
                                    {
                                        window.location.href="/auth/SMSverifysent/"
                                    }
                                    props.SMSverifysend(a,setCreated,setCreated2,setAttemted,setError,setError_msg)

                                }}>Resend Otp</a></p></span>
                                :
                                <>
                                    {console.log(setTimeout(ev=>{
                                        setResend(true)
                                    },30000))}
                                    <span className="alreadyhaveacc"><p style={{opacity:0.5}}>Resend Otp</p></span>
                                </>}

                        </>}


                </div>

            </>}


        </div>
    </>
}




