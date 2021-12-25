import React from "react";
import mset from "../../stylemodules/settings.module.css"
export default function Settings()
{
    // console.log(mset)
    return<>
        <div className={mset["external-container"]}>
            <h1 className={mset["setting-head"]}>Settings</h1>
            <ul className={mset["setting-options"]}>
                <li className={mset["option"]}><a href="auth/Changepassword/">Change Password</a></li>
                <li className={mset["option"]}><a href="auth/UpdateBasicUserDetail/">Change User Detail</a></li>
                <li className={mset["option"]}><a href="auth/DefaultAddress/">Change Billing Address</a></li>
                {/*<li className={mset["option"]}><a href="#">Change Password</a></li>*/}
            </ul>
        </div>
    </>
}