import React, {Component, useState} from "react";
import CustomizedSnackbars from "../UIComponents/compomemts/alert";

export default function  SMSverifysent(props)
{
    // First_name:response.First_name,
    //     Last_name:response.Last_name,
    // phone_number:response.phone_number

    const [created,setCreated]=useState(false)
    const [created2,setCreated2]=useState(false)

    const [attemted,setAttemted]=useState(false)
    const [error,setError]=useState(false)
    const [error_msg,setError_msg]=useState(false)

    const [phone_number,setPhone_number]=useState(props.Gstate.phone_number)
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
                    <h2 className="formheading">Phone number Verify</h2>
                    {created && <h2 className="formheading">Otp sent</h2>}

                    {created &&
                    <>
                        {console.log(setTimeout(ev=>{window.location.href="/auth/SMSverifyconform/"},2000))}
                        <CustomizedSnackbars message="Otp Sent sucesfully"  severity="success" />
                    </>}


                    {props.Gstate.phone_number_verify ?
                        <h1>User phone number {props.Gstate.phone_number} already verified</h1>:<>
                            {created2 && <>
                                <h1>Otp already sent</h1>
                            </>}


                            { (created2 === false || created === false)  && <>

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
                                                  props.SMSverifysend(phone_number,setCreated,setCreated2,setAttemted,setError,setError_msg)
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
                                        <label htmlFor="password" className="passwordlabel">phone number</label>
                                        <input
                                            type="tel" name="first name"
                                            pattern="[789][0-9]{9}"
                                            value={phone_number}
                                            onChange={(ev)=> { setPhone_number(ev.target.value)}}
                                            required
                                        />
                                    </div>


                                    <input type="submit" className="submitbutton" value="Submit"/>
                                    {error &&  <span className="formwarning">{error_msg}</span>}
                                    {error &&
                                    <CustomizedSnackbars message={error_msg} severity="success"/>
                                    }
                                </form>

                                <span className="alreadyhaveacc"><p>Verify sent OTP? <a href="/auth/SMSverifyconform/">OTP</a></p></span>

                            </>}



                        </>}

                </div>
            </>}


        </div>
    </>
}




