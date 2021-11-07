import React, {Component, useState} from "react";


export default function PasswordResrt(props)
{
    // console.log(props)
    const [email,setEmail]=useState("")
    const [err,setErr]=useState(false)
    const [err_msg,setErr_msg]=useState("")
    const [status,setStatus]=useState(false)
    const [inner,setInner]=useState(false)


    return<>
        {/*<h1>password resrt</h1>*/}
        {/*<form onSubmit={(ev)=>{ev.preventDefault()}}>*/}
        {/*    <input name="email"  type="email"  value={email} onChange={(ev)=>{setEmail(ev.target.value)}}/>*/}
        {/*    <button onClick={ev=>{props.paswoedreset(email)}}> ChangePassword </button>*/}
        {/*</form>*/}

        <div className="outerformcontainer">
            {inner?  <>
                    <div className="loadercontainer" >
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>

                    </div>
                </> :<>

                <div className="formcontainer">
                    <h2 className="formheading">Forgot Password</h2>

                    {status === true && <h2 className="formheading" style={{fontSize:14}}>Password reset mail is sent on :{email}</h2>}


                    {err === true &&   <span className="formwarning" style={{color:"red"}}>{err_msg} : {email}</span> }


                    <div className="inputcontainer">
                        {status === false && <>


                            <h2 className="formheading" style={{fontSize:14}}>
                                Enter your email and we'll send you a link to get back into your account.:</h2>

                            <label htmlFor="name" className="emaillabel">Your email</label>
                            <input
                                name="email"
                                type="email"
                                value={email}
                                onChange={(ev)=>{
                                    setErr(false)

                                    setEmail(ev.target.value)

                                }}
                                required={true}
                            />

                        </>
                        }
                    </div>

                    {status === false &&
                    <form onSubmit=
                              {
                                  (ev)=>
                                  {
                                      ev.preventDefault()
                                      setErr(false)
                                      setErr_msg("")
                                      setInner(true)
                                      props.paswoedreset(email,setErr,setErr_msg,setStatus,setInner)
                                      // this.setState({up:false,err:false})
                                      // this.props.emailverifysend(this.update_a_true,this.update_err_true)
                                  }
                              }
                          className="loginform">


                        <input type="submit" className="submitbutton" value="Send Verification Email"/>
                    </form>}

                    {/*    </>*/}




                    {/*}*/}



                </div>


            </>}

        </div>
    </>
}


