import React, {Component, useState} from "react";
import CustomizedSnackbars from "../UIComponents/compomemts/alert";

export default function  SMSverifyconform(props)
{


    const [created,setCreated]=useState(false)
    const [created2,setCreated2]=useState(false)

    const [attemted,setAttemted]=useState(false)
    const [error,setError]=useState(false)
    const [error_msg,setError_msg]=useState(false)

    const [phone_number,setPhone_number]=useState()
    // console.log(props.Gstate)
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
                    {created && <h2 className="formheading">Number verified</h2>}
                    {created &&
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


                        </>}


                </div>

            </>}


        </div>
    </>
}




