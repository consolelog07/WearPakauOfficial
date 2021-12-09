import React, { Component } from "react";



export default function Logout(props)
{
    return <>
        <li className="navlink" onClick={ev=>{console.log(props.logout())}}><a href="#">Logout</a></li>
        {/*<button onClick={ev=>{console.log(props.logout())}}>logout</button>*/}
    </>
}