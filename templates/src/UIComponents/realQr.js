import React from "react";
import QrScanner_component from "./compomemts/oupu/activeInner/QrScanner";


export default  function QrScannerCam()
{
    function redirect(value)
    {
     window.location.href=value
    }
    return <>




        <QrScanner_component AGstate={state} setAgstate={setState} Gstate={props.Gstate} setResult={redirect}/>
    </>
}