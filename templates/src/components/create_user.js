import React, {Component, useState} from "react";
import forms from "./styles/forms.css"
import {Redirect} from "react-router-dom";

export default function Createuser(props)
{
    // console.log(props)
    const [created,setCreated]=useState(false)
    const [attemted,setAttemted]=useState(false)
    const [error,setError]=useState(false)


    // console.log(created,attemted,error,'error')
    if ( created === true)
    {
        return <>
            <Redirect to='/auth/emailverifysent/'/>
        </>
    }



    return<>
        {created && <>
        <h1>created suceesfully</h1>
        </>}
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
                    <h2 className="formheading">Welcome to Wear Pakau </h2>
                    <form
                        onSubmit=
                            {
                                (ev)=>
                                {
                                    ev.preventDefault()
                                    setAttemted(true)
                                    props.create_user(setCreated,setAttemted,setError)
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
                                required={true}
                            />
                        </div>

                        <div className="inputcontainer">
                            <label htmlFor="password" className="passwordlabel">Password</label>
                            <input
                                name="password" type="password"  value={props.Gstate.password}
                                onChange={(ev)=>{props.SGstate({password:ev.target.value})}}
                                required={true}
                                    autocomplete={"off"}
                            />
                        </div>
                        <div className="inputcontainer">
                            <label htmlFor="password" className="passwordlabel">Confirm password</label>
                            <input
                                name="re_password"
                                type="password"
                                value={props.Gstate.re_password}
                                onChange={(ev)=>{props.SGstate({re_password:ev.target.value})}}
                                required={true}
                                autocomplete={"off"}
                            />
                        </div>

                        <input type="submit" className="submitbutton" value="Sign Up"
                               onClick={ev=>{
                                   //     setAttemted(true)
                                   //     props.create_user(setCreated,setAttemted,setError)
                               }
                               }

                        />
                        {(error === true && props.Gstate.re_password_error)&& <span className="formwarning">Password doesnot match</span>}
                        {(error === true && props.Gstate.password_error)&& <span className="formwarning">Password too weak</span>}
                        {error === true && props.Gstate.email_error === true && <span className="formwarning">User with same email exist</span>}
                        {(error === true && props.Gstate.phonenumber_error)&& <span className="formwarning">User with same phonenumber exist</span>}
                        <span className="privacynotice"><p>By continuing, you agree to Wear Pakau's <a href="">Terms and Condition </a>and<a
                            href=""> Privacy Policy.</a></p></span>
                       <span className="alreadyhaveacc"><p>Already have an account? <a href="/auth/login/">Sign in</a></p></span>
                    </form>
                </div>
            </>}

        </div>

    </>
}