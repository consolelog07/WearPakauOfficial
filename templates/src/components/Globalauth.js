import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,

} from "react-router-dom";
import Logout from "./Logout";
import Authurl from "./auth dir";
import Footer from "../UIComponents/compomemts/Footer";
import Navbar_proxy from "./Navbar";
import NavBar from "../UIComponents/compomemts/NavBar";
import ProductDir from "../UIComponents/compomemts/product/ProductDir";
import Cartdir from "../UIComponents/compomemts/cart/cartdir";
import Errordir from "../UIComponents/compomemts/errors/error_dir";
import OupuDir from "../UIComponents/compomemts/oupu/oupu_dir";
import Order_dir from "../UIComponents/compomemts/order/Order_dir";
import Landing from "../UIComponents/compomemts/Landing";





export default class Globalauth extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            id:null,
            First_name:"",
            Last_name:"",
            email:"",
            password:"",
            re_password:"",
            login:false,
            email_error:false,
            password_error:false,
            re_password_error:false,
            old_password:"",
            new_password:"",
            old_password_error:"",
            new_password_error:"",
            error:false,
            emsg:"",
            change_password:false,
            emailverifysend:false,
            emailverifyconform:false,
            passwordverifysend:false,
            passwordverifyconform:false,
            phone_number_verify:false

        }
        window.abcdef=this.state

        this.Check_Authenticated=this.Check_Authenticated.bind(this)
        this.setBasicDetailOfUser=this.setBasicDetailOfUser.bind(this)
        this.reset=this.reset.bind(this)
        this.setState=this.setState.bind(this)
        this.login=this.login.bind(this)
        this.logout=this.logout.bind(this)
        this.create_user=this.create_user.bind(this)
        this.ChangePassword=this.ChangePassword.bind(this)
        this.emailverifysend=this.emailverifysend.bind(this)
        this.emailverifyconfirm=this.emailverifyconfirm.bind(this)
        this.paswoedreset=this.paswoedreset.bind(this)
        this.paswoedresetconfirm=this.paswoedresetconfirm.bind(this)
        this.PasswordResetTokenverify=this.PasswordResetTokenverify.bind(this)
        this.UpdateBasicUserDetail=this.UpdateBasicUserDetail.bind(this)
        this.SMSverifysend=this.SMSverifysend.bind(this)
        this.SMSverifyconfirm=this.SMSverifyconfirm.bind(this)
        this.send_to_verify_phone_number=this.send_to_verify_phone_number.bind(this)
        this.send_to_verify_Basic_detail=this.send_to_verify_Basic_detail.bind(this)
        if(Reflect.has(this.props,'out') && this.props.out === true)
        {
            // console.log(Reflect.has(this.props,'aaaaaaaaaa','out'),'logout global')

        }
        else
        {
            // console.log(Reflect.has(this.props,'aaaaaaaaaa','out'))

            this.setBasicDetailOfUser()
        }





    }
    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    async Check_Authenticated()
    {
        let req = new Request(`/Api/Check_Authenticated`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent
            // credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        });

        const response = await fetch(req)
            .then(ev=>ev.json())
            .catch(err=>console.log(err))
        // console.log(response)

        if (Reflect.has(response,'isAuthenticated') === true)
        {
            this.setState({login:true})

        }
        if (Reflect.has(response,'NotAuthenticated') === true)
        {
            this.setState({login:false})
            return false
        }
    }
    async setBasicDetailOfUser ()
    {

        let req = new Request(`/Api/User/User/BasicInfoOfAuthenticatedUser/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent
            // credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        });
        const response = await fetch(req)
        .then(ev=>ev.json()).catch(ev=>console.log(ev))

        // console.log(response)
        if (Reflect.has(response,'detail') === false)
        {
            // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
            let event = new Event("login")
            // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
            window.dispatchEvent(event)
            window.user_id=response.id


            this.setState({
                id:response.id,
                email:response.email,
                login:true,
                email_error:false,
                password_error:false,
                error:false,
                First_name:response.First_name,
                Last_name:response.Last_name,
                phone_number:response.phone_number,
                phone_number_verify:response.phone_number_verify,
            })
        }
        else
        {
            this.reset()
        }
    }
    reset()
    {
        this.setState({
            id:null,
            First_name:"",
            Last_name:"",
            email:"",
            password:"",
            re_password:"",
            login:false,
            email_error:false,
            password_error:false,
            re_password_error:false,
            old_password:"",
            new_password:"",
            old_password_error:"",
            new_password_error:"",
            error:false,
            emsg:"",
            change_password:false,
            emailverifysend:false,
            emailverifyconform:false,
            password_reset_error:false,
            passsword_reset_match_error:false,
            phone_number:0,
            phonenumber_error:false,
            phone_number_verify:false
        })
    }

    async login(setCreated,setAttemted,setError,setError_msg)
    {
        let req = new Request(`/Api/User/CUser/login/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({email:this.state.email,password:this.state.password})
        });
        const response = await fetch(req).then(ev=>ev.json())


        // console.log(response)
        if (Reflect.has(response,"success"))
        {
            this.setState({email_error:true})


            setCreated(true)
        }
        if (Reflect.has(response,"error"))
        {
            this.setState({login:false})
            setError(true)
            if(response['error'] === 'email does not exist')
            {
                setError_msg("email does not exist")
                this.setState({login:true})
            }
            if(response['error'] === 'wrong password')
            {
                setError_msg("wrong password")
                this.setState({password_error:true})
            }
            if(response['error'] === 'account not activated yet')
            {
                setError_msg("account not activated yet")
                this.setState({password_error:true})
            }

        }
        setAttemted(false)

    }

    async logout()
    {
        let req = new Request(`/Api/User/User/Logout/`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({email:this.state.email})
        });

        const response = await fetch(req).then(ev=>ev.json());

        // console.log(response);
        if (Reflect.has(response,"success"))
        {
            this.setState({login:false})
            this.reset()
            window.location.reload()
            return true;
        }

        if (Reflect.has(response,"error"))
        {

            return false
        }

    }

    async create_user(setCreated,setAttemted,setError,setEmail_error)
    {


        this.setState({error:false})
        let req = new Request(`/Api/User/CUser/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({email:this.state.email,
                password:this.state.password,
                re_password:this.state.re_password})
        });
        let err=false
        const response = await fetch(req).then(ev=> {
             // console.log(ev.ok,"pddddddddddddddd")
            if (ev.ok ===false)
            {
                err = true
            }
            return ev.json()
            }
        )

        console.log(response,err)
        if (Reflect.has(response,"success"))
        {
            this.setState({error:false})
            setCreated(true)
            setError(false)
            return true;
        }

        if (Reflect.has(response,"error") || err)
        {
            this.setState({login:false})
            setCreated(false)
            setError(true)
            // console.log("innnnnnnnnnnn")
            if(response['error'] === 'Passwords do not match')
            {
             // console.log("jjjjjjjjjjjjjjjjjjjj")
                this.setState({re_password_error:true})
            }

            if(response['error'] === 'password_short')
            {
                this.setState({password_error:true,emsg:response['error']})
            }

            if( Reflect.has(response,"email")  )
            {
                // console.log(  'jjjjjj')
                this.setState({email_error:true,emsg:response['error']})
            }

            if( Reflect.has(response,"phone_number")  )
            {
                this.setState({phonenumber_error:true,emsg:response['error']})
            }

            if(response['error'] === 'user with this Phonenumber already exists.')
            {
                this.setState({phonenumber_error:true,emsg:response['error']})
            }

            setAttemted(false)
            return false
        }



    }
    async ChangePassword(setCreated,setAttemted,setError,setError_msg)
    {
        let req = new Request(`/Api/User/CUser/${this.state.id}/change_password/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({old_password:this.state.old_password,new_password:this.state.new_password})
        });
        const response = await fetch(req).then(ev=>ev.json())

        // console.log(response)
        if (Reflect.has(response,"success"))
        {
            this.setState({error:false})
            setCreated(true)
            setError(false)
        }
        if (Reflect.has(response,"new_password"))
        {

            this.setState({error:false})
            setError(true)
            setError_msg(response['new_password'][0])
        }

        if (Reflect.has(response,"error"))
        {
            setError(true)
            this.setState({login:false})
            if(response['error'] === 'password_short')
            {
                this.setState({new_password_error:true})
                setError_msg(response['error'])
            }

            if(response['error'] === 'old password wrong')
            {
                this.setState({old_password_error:true,emsg:response['error']})
                setError_msg("current password  incorrect")
            }
            else
            {
                this.setState({old_password_error:true,emsg:response['error']})
                setError_msg(response['error'])
            }

        }


        setAttemted(false)
    }
    async emailverifysend(update_a_true,update_err_true,update_err_false,update_attempted_false)
    {


        let req = new Request(`/Api/User/CUser/email_verify/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({email:this.state.email})
        });


        const response = await fetch(req).then(ev=> {
            if (!ev.ok) {
                return false
            }
            return ev.json()
        })
        update_attempted_false()
        if (response === false)
        {
            return false
        }


        // console.log(response)
        if (Reflect.has(response,"success"))
        {
            this.setState({error:false,emailverifysend:true})
            update_a_true()
            update_err_false()
            return true;
        }
        if (Reflect.has(response,"error"))
        {
            update_err_true()
            this.setState({login:false})
            return false
        }
    }
    async emailverifyconfirm(token,setAttempt,setSuccess,setToken_err,setErr)
    {
        // /Api/password_reset/confirm/?token=a118e197b9d5b2320317dbf5bd10


        let req = new Request(`/Api/User/CUser/email_verify_conform/?token=${token}`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({token:token})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })



        if (Reflect.has(response,"success"))
        {
            setSuccess(true)
            console.log("success")
            this.setState({error:false,passwordverifyconform:true})
            return true;
        }
        if (Reflect.has(response,"token"))
        {
            setToken_err(true)
            console.log("token")
            this.setState({error:true,passwordverifyconform:false,emsg:response["email"]})
            return false
        }
        if (Reflect.has(response,"error"))
        {
            setErr(true)
            console.log("error")
            this.setState({error:true,passwordverifyconform:false,emsg:response["email"]})
            return false
        }

        setAttempt(false)
    }

    async SMSverifysend(phone_number,setCreated,setCreated2,setAttemted,setError,setError_msg)
    {


        let req = new Request(`/Api/User/CUser/SMS_verify/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({phone_number:phone_number})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })



        // console.log(response)

        if (Reflect.has(response,"success-already"))
        {
            // this.setState({error:false,emailverifysend:true})
            setCreated2(true)

        }
        if (Reflect.has(response,"success"))
        {
            // this.setState({error:false,emailverifysend:true})
            setCreated(true)

        }

        if (Reflect.has(response,"phone_number"))
        {

            console.log('ppppppppppppppppppppppppppppppppppppppppppppppp')
            setError(true)
            setError_msg("enter a valid indan phone number")

        }
        if (Reflect.has(response,"error"))
        {

            setError(true)
            setError_msg(response["error"])

        }
        if (Reflect.has(response,"already"))
        {
            // this.setState({error:false,emailverifysend:true})
            setCreated(true)
        }

        if (Reflect.has(response,"auth"))
        {

            setError(false)
            setError_msg(response["error"])

        }

        setAttemted(false)
    }

    async SMSverifyconfirm(token,setCreated,setCreated2,setAttemted,setError,setError_msg)
    {

        let req = new Request(`/Api/User/CUser/SMS_verify_conform/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({token:token})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        // console.log(response)
        if (Reflect.has(response,"success"))
        {
            setCreated(true)
        }
        if (Reflect.has(response,"error"))
        {
            setError(true)
            setError_msg(response['error'])
        }
        setAttemted(false)
    }

    async paswoedreset(email,setErr,setErr_msg,setStatus,setInner)
    {


        let req = new Request(`/Api/password_reset/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({email:email})
        });


        const response = await fetch(req).then(ev=> {
            // if (!ev.ok) {
            //     // make the promise be rejected if we didn't get a 2xx response
            //     return false
            // }
            return ev.json()
        })
        if (response === false)
        {
            return false
        }


        // console.log(response)
        if (Reflect.has(response,"status"))
        {
            setStatus(true)
            this.setState({error:false,passwordverifysend:true})
        }
        if (Reflect.has(response,"email"))
        {

            setErr(true)
            setErr_msg(response["email"])
            console.log("emailemailemailemailemailemail")
            this.setState({error:true,passwordverifysend:false,emsg:response["email"]})

        }
        setInner(false)
    }
    async paswoedresetconfirm(token,password,setState_reset)
    {
        // /Api/password_reset/confirm/?token=a118e197b9d5b2320317dbf5bd10


        let req = new Request(`/Api/password_reset/confirm/?token=${token}`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({password:password,token:token})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })



        // console.log(response)

        if (Reflect.has(response,"status"))
        {
            setState_reset({attempted:false,error:false,error_msg:"",success:true})
        }
        if (Reflect.has(response,"password"))
        {
             setState_reset({attempted:false,error:true,error_msg:"Password tooo short",success:false})
        }
        if (Reflect.has(response,"detail"))
        {
            setState_reset({token_error:true,checked:true,error_msg:"invalid token",
                attempted:false,error:true,success:false})
        }

    }

    async PasswordResetTokenverify(token,setState_reset)
    {
        // /Api/password_reset/confirm/?token=a118e197b9d5b2320317dbf5bd10


        let req = new Request(`/Api/password_reset/validate_token/?token=${token}`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({token:token})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })



        if (Reflect.has(response,"status"))
        {
            // console.log("success")
            setState_reset({token_error:false,checked:true})

        }
        if (Reflect.has(response,"detail"))
        {

            // console.log("token")
            setState_reset({token_error:true,checked:true,error_msg:"invalid token"})

        }
        if (Reflect.has(response,"error"))
        {
            // setErr(true)
            // console.log("error")
            setState_reset({token_error:true,checked:true,error_msg:"invalid token"})

            // this.setState({error:true,passwordverifyconform:false,emsg:response["email"]})
            // return false
        }

        // setAttempt(false)
    }

    async UpdateBasicUserDetail(first_name,last_name,setCreated,setAttemted,setError,setError_msg)
    {


        let req = new Request(`/Api/User/User/${this.state.id}/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'PUT',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({First_name:first_name,Last_name:last_name})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })

        // console.log(response)

        if (Reflect.has(response,"detail"))
        {

            // console.log("token")
            setError(true)
            setError_msg("Login with same account")
            // setState_reset({token_error:true,checked:true,error_msg:"invalid token"})
        }
        else
        {
            setCreated(true)
            setError(false)
            setError_msg("")
            // console.log("hhhhhhhhhhhhhhhhhhhhh")
        }
        setAttemted(false)

    }

    send_to_verify_phone_number()
    {
        if(this.state.phone_number_verify === true)
        {
            return true
        }

        if(window.location.href.search("/auth/SMSverifysent/" )=== -1 )
        {
            if (window.location.href.search("/auth/SMSverifyconform/" )!== -1)
            {
             return false
            }
            else
            {
                // console.log("kalllllllllllllllllllllllllllllllllllllllllll")
                window.location.href=`/auth/SMSverifysent/`
            }

        }

        return false
    }
    send_to_verify_Basic_detail()
    {
        if(this.state.First_name !== null || this.state.Last_name !== null )
        {
            // console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",this.state.First_name,this.state.Last_name  )

            if(this.state.phone_number_verify === true)
            {
                return false
            }


            return true
        }

        if(window.location.href.search("/auth/UpdateBasicUserDetail/" )=== -1)
        {
            window.location.href=`/auth/UpdateBasicUserDetail/`
        }
        return false

    }

    render() {

        if(Reflect.has(this.props,'out'))
        {
            console.log(Reflect.has(this.props,'aaaaaaaaaa','out'))
           return < >
                <Logout logout={this.logout} />
                </>
        }

        // console.log(this.state)

        if(this.state.login)
        {
            if (this.send_to_verify_Basic_detail() === true)
            {
                // console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
                if( this.send_to_verify_phone_number() === true)
                {

                    console.log("ready")
                }
            }
            // console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')


        }


        return <>
            <Router>
                <NavBar  />
                <Switch>




                    <Route path="/user/">
                        <h1>user</h1>
                    </Route>
                    <Route path="/auth/">
                        <Authurl setState={this.setState}
                                 state={this.state}
                                 Check_Authenticated={this.Check_Authenticated}
                                 setBasicDetailOfUser={this.setBasicDetailOfUser}
                                 reset={this.reset}
                                 login={this.login}
                                 logout={this.logout}
                                 create_user={this.create_user}
                                 ChangePassword={this.ChangePassword}
                                 emailverifysend={this.emailverifysend}
                                 paswoedreset={this.paswoedreset}
                                 paswoedresetconfirm={this.paswoedresetconfirm}
                                 emailverifyconfirm={this.emailverifyconfirm}
                                 PasswordResetTokenverify={this.PasswordResetTokenverify}
                                 UpdateBasicUserDetail={this.UpdateBasicUserDetail}
                                 SMSverifysend={this.SMSverifysend}
                                 SMSverifyconfirm={this.SMSverifyconfirm}
                        />
                        {/*<button onClick={   ev=>{console.log(this.setBasicDetailOfUser())}}>set auth basic info</button>*/}
                        {/*<button onClick={ev=>{this.Check_Authenticated()}}>check auth</button>*/}

                    </Route>

                    <Route path="/order/">
                        <Order_dir
                            setState={this.setState}
                            state={this.state}
                        />

                    </Route>

                    <Route path="/oupu/">
                        <OupuDir
                            setState={this.setState}
                            state={this.state}
                        />

                    </Route>

                    <Route path="/product/">
                        <ProductDir
                            setState={this.setState}
                            state={this.state}
                        />

                    </Route>

                    <Route path="/error/">

                        <Errordir
                            setState={this.setState}
                            state={this.state}
                        />
                    </Route>


                    <Route path="/cart/">

                        <Cartdir
                            setState={this.setState}
                            state={this.state}
                        />
                    </Route>


                    <Route path="">
                        <Landing />
                    </Route>
                </Switch>

                <Footer />

            </Router>



    </>

    }


}




// {/*<Route path="/auth/login/">*/}
// {/*    <h1>login</h1>*/}
// {/*    <LoginView Gstate={temailverifyconformhis.state} SGstate={this.setState}  login={this.login}/>*/}
// {/*</Route>*/}
// {/*<Route path="/auth/logout/">*/}
// {/*    /!*<Redirect to="/login" />*!/*/}
// {/*    <Logout logout={this.logout} />*/}
// {/*</Route>*/}
// {/*<Route path="/auth/Changepassword/">*/}
// {/*    <h1>password change</h1>*/}
// {/*    <Changepassword Gstate={this.state} SGstate={this.setState}  ChangePassword={this.ChangePassword} />*/}
// {/*</Route>*/}
// {/*<Route path="/auth/Createuser/">*/}
// {/*    <h1>Create User</h1>*/}
// {/*    <Createuser  Gstate={this.state} SGstate={this.setState}  create_user={this.create_user}/>*/}
// {/*</Route>*/}
// {/*<Route path="/auth/password_reset/">*/}
// {/*    < PasswordResrt paswoedreset={this.paswoedreset} />*/}
// {/*</Route>*/}
// {/*<Route path="/auth/password_reset_conform/">*/}
// {/*    <h1>password_reset_conform</h1>*/}
// {/*    <PasswordResrtconform paswoedresetconfirm={this.paswoedresetconfirm}/>*/}
// {/*</Route>*/}
// {/*<Route path="/auth/emailverifysent/">*/}
// {/*    < EmailVerifysend Gstate={this.state} SGstate={this.setState}  emailverifysend={this.emailverifysend} />*/}
// {/*</Route>*/}
// {/*<Route path="/auth/emailverifyconform/">*/}
// {/*    <h1>emailverifyconform</h1>*/}
// {/*</Route>*/}
//
