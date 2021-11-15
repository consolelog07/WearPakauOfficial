import React, {Component, useState} from "react";
import nexttransport from "./nexttransport";
import CustomizedSnackbars from "../UIComponents/compomemts/alert";

export default function  UpdateBasicUserDetail(props)
{
    // First_name:response.First_name,
    //     Last_name:response.Last_name,
    // phone_number:response.phone_number

    const [created,setCreated]=useState(false)
    const [attemted,setAttemted]=useState(false)
    const [error,setError]=useState(false)
    const [error_msg,setError_msg]=useState(false)

    const [first_name,setFirst_name]=useState(props.Gstate.First_name)
    const [last_name,setLast_name]=useState(props.Gstate.Last_name)
    // const [phone_number,setPhone_number]=useState("")
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
            {created &&
            <>
            {setTimeout(ev=>{window.location.reload()},4000)}
            <CustomizedSnackbars message="Sucessfully updated"  severity="success" />
            </>}
                {created && <h2 className="formheading">Succesfully updated</h2>}

                <div className="formcontainer">
                    <h2 className="formheading">Basic User Detail</h2>
                    <form action="" className="loginform"
                          onSubmit={
                              (ev)=>
                              {
                                  ev.preventDefault()

                                  if (props.Gstate.login=== true && first_name !=="" && last_name !== "")
                                  {
                                      setAttemted(true)
                                      setError(false)
                                      setError_msg("")
                                      setCreated(false)
                                      props.UpdateBasicUserDetail(first_name,last_name,setCreated,setAttemted,setError,setError_msg)
                                  }
                                  else
                                  {

                                      setError(true)

                                      if (first_name === "")
                                      {
                                          setError_msg("First name empty")
                                      }

                                      if (last_name === "")
                                      {
                                          setError_msg("last name empty")
                                      }

                                      if (last_name === "" && first_name === "")
                                      {
                                          setError_msg("last name and last name cant beempty empty")
                                      }

                                  }
                              }
                          }
                    >
                        <div className="inputcontainer">
                            <label htmlFor="password" className="passwordlabel">First Name</label>
                            <input type="text" name="first name"
                                   value={first_name}
                                   onChange={(ev)=> { setFirst_name(ev.target.value)}}
                                   required
                            />
                        </div>
                        <div className="inputcontainer">
                            <label htmlFor="password" className="passwordlabel">Last Name</label>
                            <input type="text" name="last name"
                                   value={last_name}
                                   onChange={(ev)=> { setLast_name(ev.target.value)}}
                                   required

                            />
                        </div>
                        <input type="submit" className="submitbutton" value="Submit"/>
                        {error &&  <span className="formwarning">{error_msg}</span>}

                    </form>
                </div>

            </>}

        </div>
    </>
}




