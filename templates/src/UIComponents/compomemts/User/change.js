import React, {useState} from "react";


export default function Change(props)
{
    const [value,setValue]=useState("")
    function onchageclickwrapper(ev)
    {
        props.setState({...props.state,urlVal:value})
        // console.log("ssssssssssssssssssssssssddddddddddddd")
        props.onchange_click(ev)
    }
    return<>
        <div className="panel " style={{display:"block"}}>
            <input type="url" name="url" id="url" className="coupon" placeholder="Paste URL here"
                   value={value}
                   onChange={
                       ev=>{
                          setValue(ev.target.value)
                           // console.log(ev.target.value)

                       }
                   }/>
            <button className="applycoupon" onClick={onchageclickwrapper}>Change</button>
        </div>

    </>
}