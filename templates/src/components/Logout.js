import React, { Component } from "react";



export default function Logout(props)
{
    return <>
        <button onClick={ev=>{console.log(props.logout())}}>logout</button>
    </>
}