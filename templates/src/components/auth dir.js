import React from "react";
import {func} from "prop-types";
import {Route, Switch} from "react-router-dom";
import LoginView from "./login";
import Logout from "./Logout";
import Changepassword from "./Changepassword";
import Createuser from "./create_user";
import PasswordResrt from "./PasswordReset";
import PasswordResrtconform from "./passwordresetconform";
import EmailVerifysend from "./emailverifysent";
import Emailverifyconform from "./emailVerifyConform";
import UpdateBasicUserDetail from "./UpdateBasicUserDetail";
import SMSverifysent from "./SMSverifysent";
import SMSverifyconform from "./SMSverifyconform";
import Address_Create from "../UIComponents/compomemts/order/AddressCreate";
import Profile from "../UIComponents/compomemts/User/UserProfilePage";
import DefaultAddress from "./DefaultAddress";

export default function Authurl(props)
{
    return<>

        <Route path="/auth/DefaultAddress/">
            <DefaultAddress Gstate={props.state} SGstate={props.setState}/>
        </Route>
        <Route path="/auth/login/">
            {/*<h1>login</h1>*/}
            <LoginView Gstate={props.state} SGstate={props.setState}  login={props.login}/>
        </Route>
        <Route path="/auth/logout/">
            {/*<Redirect to="/login" />*/}
            <Logout logout={props.logout} />
        </Route>
        <Route path="/auth/Changepassword/">
            {/*<h1>password change</h1>*/}
            <Changepassword Gstate={props.state} SGstate={props.setState}  ChangePassword={props.ChangePassword} />
        </Route>
        <Route path="/auth/Createuser/">
            {/*<h1>Create User</h1>*/}
            <Createuser  Gstate={props.state} SGstate={props.setState}  create_user={props.create_user}/>
        </Route>
        <Route path="/auth/password_reset/">
            < PasswordResrt paswoedreset={props.paswoedreset} />
        </Route>
        <Route path="/auth/password_reset_conform/">
            {/*<h1>password_reset_conform</h1>*/}
            <PasswordResrtconform paswoedresetconfirm={props.paswoedresetconfirm}
                                  PasswordResetTokenverify={props.PasswordResetTokenverify}/>
        </Route>
        <Route path="/auth/emailverifysent/">
            < EmailVerifysend Gstate={props.state} SGstate={props.setState}  emailverifysend={props.emailverifysend} />
        </Route>
        <Route path="/auth/emailverifyconform/">

           <Emailverifyconform Gstate={props.state} SGstate={props.setState}  emailverifyconfirm={props.emailverifyconfirm}/>
        </Route>
        <Route path="/auth/UpdateBasicUserDetail/">

            <UpdateBasicUserDetail
                Gstate={props.state}
                SGstate={props.setState}
                UpdateBasicUserDetail={props.UpdateBasicUserDetail}
            />

        </Route>

        <Route path="/auth/SMSverifysent/">
            <SMSverifysent
                Gstate={props.state}
                SGstate={props.setState}
                SMSverifysend={props.SMSverifysend}
            />
        </Route>

        <Route path="/auth/SMSverifyconform/">
            <SMSverifyconform
                Gstate={props.state}
                SGstate={props.setState}
                SMSverifyconfirm={props.SMSverifyconfirm}
            />
        </Route>

        <Route path="/auth/" exact>

            <Profile
                Gstate={props.state}
                SGstate={props.setState}

            />
                        <Logout logout={props.logout} />


            {/*<UpdateBasicUserDetail*/}
            {/*    Gstate={props.state}*/}
            {/*    SGstate={props.setState}*/}
            {/*    UpdateBasicUserDetail={props.UpdateBasicUserDetail}*/}
            {/*/>*/}

        </Route>
    </>
}