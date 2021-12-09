import React, {useState} from "react";
import PrmaryBefore from "./activeInner/primaryBefore";
import PrmaryAfter from "./activeInner/TernaryActive";

import QrScanner_component from "./activeInner/QrScanner";


export default function Activate (props)
{
    const [state,setState]=useState({
        Active_primary:false,
        Active_secondary:true,
        Active_Ternary:false,
        show_active_button:true,
        unique_u14:"448b646a-ede1-40c5-88fd-7ad99e8e526d",
    })

    function setuniqe14value(value)
    {
        var value2=value
        setState({...state,unique_u14:value2,Active_Ternary:true,Active_secondary:false})
    }
    return<>
        {state.Active_primary === true && <PrmaryBefore AGstate={state} setAgstate={setState} Gstate={props.Gstate}/>}
        {state.Active_secondary === true && <QrScanner_component AGstate={state} setAgstate={setState} Gstate={props.Gstate} setResult={setuniqe14value}/>}
        {state.Active_Ternary === true && <PrmaryAfter AGstate={state} setAgstate={setState} Gstate={props.Gstate}/>}
    </>
}