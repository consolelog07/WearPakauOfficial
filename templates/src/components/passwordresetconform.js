import React, {Component, useState} from "react";

export default class Passwordresetconform extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            success:false,
            attempted:false,
            error:false,
            error_msg:"",
            checked:false,
            token_error:false,
            password:"",
            re_password:""

        }
        this.token=window.location.search.substring(window.location.search.indexOf('=')+1,window.location.search.length)
        // console.log(this.token)
        this.setState_reset=this.setState.bind(this)

    }

    componentDidMount() {
        if (this.state.token_error === false && this.token !=="")
        {
            this.setState({checked:false})
            this.props.PasswordResetTokenverify(this.token,this.setState_reset)
            // console.log("done")
        }

    }



    render() {


        return<>
            <div className="outerformcontainer">

                {this.state.attempted  ?  <>

                        <div className="loadercontainer" >
                            <div className="lds-ripple">
                                <div></div>
                                <div></div>
                            </div>

                        </div>
                    </> :<>


                    <div className="formcontainer">

                        <h2 className="formheading">password Reset</h2>
                        {this.state.success === true &&
                        <>
                            <h1> Password reset sucessfully</h1>
                            <span className="alreadyhaveacc"><p>Now u can sign in  <a href="/auth/login/">Sign in</a></p></span>
                        </>
                        }

                        {this.state.checked === true && this.state.token_error === false && this.state.success === false &&
                        <>
                            <h1>Valid Token</h1>

                            <form
                                onSubmit={
                                    (ev)=>
                                    {
                                        ev.preventDefault()

                                        if (this.state.password === this.state.re_password)
                                        {
                                            this.setState({attempted:true,error:false,error_msg:""})
                                            this.props.paswoedresetconfirm(this.token,this.state.password,this.setState_reset)
                                        }
                                        else
                                        {
                                            this.setState({
                                                error:true,
                                                error_msg:"New password does not match Confirm password"
                                            })
                                            // console.log("hello")
                                        }
                                    }
                                }

                                className="loginform">
                                <div className="inputcontainer">
                                    <label htmlFor="password" className="passwordlabel">New password</label>
                                    <input type="password" name="password"
                                           value={this.state.password}
                                           onChange={(ev) => {
                                               this.setState({password: ev.target.value})
                                           }
                                           }
                                           required
                                    />
                                </div>
                                <div className="inputcontainer">
                                    <label htmlFor="password" className="passwordlabel">Confirm password</label>
                                    <input type="password" name="password"
                                           value={this.state.re_password}
                                           onChange={(ev) => {
                                               this.setState({re_password: ev.target.value})
                                           }
                                           }
                                           required/>
                                </div>



                                <input type="submit" className="submitbutton" value="Change My Password"/>



                                {/*// <!-- <span class="forgotpass"><a href="#">Forgot password?</a></span>*/}

                                {this.state.error && <span className="formwarning">{this.state.error_msg}</span>}

                                <span className="alreadyhaveacc"><p>Already have an account?
                                <a href="">Sign in</a></p></span>

                            </form>
                        </>
                        }
                        {this.state.checked === true && this.state.token_error === true &&
                        <>
                            <h1 className="formwarning"
                                style={{color:"red"}}>In-Valid Token</h1>
                            <span className="alreadyhaveacc">
                            <p>  <a href="/auth/login/">Sign in</a></p></span>
                            <span className="alreadyhaveacc"><p><a href="/auth/Createuser/">Sign up </a></p></span>
                        </>}

                    </div>

                </>}


            </div>

        </>
    }

}
