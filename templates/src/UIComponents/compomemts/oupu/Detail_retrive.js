import React, {useState} from "react";
import PrmaryAfter from "./activeInner/TernaryActive";


export default function Detail_retrive (props)
{

    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    const [state,setState]=useState({
        show_active_button:false,
        unique_u14:window.location.search.split("=")[1],
        valid: regexExp.test(window.location.search.split("=")[1])
    })

    return<>
        {state.valid ?<>
                <PrmaryAfter AGstate={state} setAgstate={setState} Gstate={props.Gstate}/>
            </>:
            <>
            invalid uuid
            </>
        }
    </>
}