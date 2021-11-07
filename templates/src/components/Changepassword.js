import React, {Component, useState} from "react";
import forms from "./styles/forms.css"

export default function Changepassword(props)
{
    // console.log(props)
    const [created,setCreated]=useState(false)
    const [attemted,setAttemted]=useState(false)
    const [error,setError]=useState(false)
    const [error_msg,setError_msg]=useState("")
    const [re_pass,setRe_pass]=useState("")

    return<>
        {/*<form onSubmit={(ev)=>{ev.preventDefault()}}>*/}
        {/*    <input name="email"  type="email"  value={props.Gstate.old_password} onChange={(ev)=>{props.SGstate({old_password:ev.target.value})}}/>*/}
        {/*    <input name="password" type="text"  value={props.Gstate.new_password} onChange={(ev)=>{props.SGstate({new_password:ev.target.value})}} />*/}
        {/*    <button onClick={ev=>{props.ChangePassword()}}> ChangePassword </button>*/}
        {/*</form>*/}
        {created && <h1>paswword reset successfull</h1>}
        <div className="outerformcontainer">
            <div className="formcontainer">
                <h2 className="formheading">Change password</h2>
                <form onSubmit={
                        (ev)=>
                        {
                            ev.preventDefault()

                            if (props.Gstate.new_password === re_pass)
                            {
                                setAttemted(true)
                                setError(false)
                                setError_msg("")
                                props.ChangePassword(setCreated,setAttemted,setError,setError_msg)
                            }
                            else
                            {
                                setError(true)
                                setError_msg("New password does not match Confirm password")
                            }
                        }
                        }
                      className="loginform">

                    <div className="inputcontainer">
                        <label htmlFor="password" className="passwordlabel">Current password</label>
                        <input type="password" name="password"
                               value={props.Gstate.old_password}
                               onChange={(ev)=>
                                {props.SGstate({old_password:ev.target.value})}}
                               required
                        />
                    </div>
                    <div className="inputcontainer">
                        <label htmlFor="password" className="passwordlabel">New password</label>
                        <input type="password" name="password"
                               value={props.Gstate.new_password}
                               onChange={(ev)=>
                               {props.SGstate({new_password:ev.target.value})}}
                                required
                        />
                    </div>
                    <div className="inputcontainer">
                        <label htmlFor="password" className="passwordlabel">Confirm password</label>
                        <input type="password" name="password"
                               value={re_pass}
                               onChange={(ev)=> { setRe_pass(ev.target.value)}}
                            required
                        />
                    </div>
                    <input type="submit" className="submitbutton" value="Change My Password"/>
                    {error && <span className="formwarning">{error_msg}</span>}
                </form>
            </div>
        </div>
    </>
}