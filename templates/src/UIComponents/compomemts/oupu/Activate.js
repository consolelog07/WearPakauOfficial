import React, {useState} from "react";
import PrmaryBefore from "./activeInner/primaryBefore";
import PrmaryAfter from "./activeInner/TernaryActive";


import QrScanner_component from "./activeInner/QrScanner";


export default function Activate (props)
{
    const [state,setState]=useState({
        Active_primary:true    ,
        Active_secondary:false,
        Active_Ternary:false,
        show_active_button:true,
        unique_u14:"7975d1c4-7846-4266-8a52-092638743108",
    })
    const pattern2 = new RegExp('^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$');


    function setuniqe14value(result)
    {
        console.log("helllooooooooooooooooooooooooooooooooooooooo",result)
        // setState({...state,
        //     // unique_u14:value2,
        //     Active_Ternary:true
        //     ,Active_secondary:false})

        var b=result.substr(result.lastIndexOf("/")+1,result.length)
            if(b.search("unique_u14") != -1)
            {
                b=b.split("=")[1]
            }

        if(pattern2.test(b))
        {
            console.log("terrrrrqqqqqqqqqqqqqqqqqqqqqqqqqq",b)
            setState({...state,unique_u14:b,Active_Ternary:true,Active_secondary:false})
        }
        else {
            console.log("ffffffffffffffffffffffffffffffffff")
        }
        }
    return<>
        {state.Active_primary === true && <PrmaryBefore AGstate={state} setAgstate={setState} Gstate={props.Gstate}/>}
        {state.Active_secondary === true && <QrScanner_component AGstate={state} setAgstate={setState} Gstate={props.Gstate} setResult={setuniqe14value}/>}
        {state.Active_Ternary === true && <PrmaryAfter AGstate={state} setAgstate={setState} Gstate={props.Gstate}/>}
    </>
}