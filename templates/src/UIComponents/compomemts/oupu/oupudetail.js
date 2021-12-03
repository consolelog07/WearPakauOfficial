import React from "react";


export default function OupuDetail()
{


    return<>

        <div className="loadercontainer" >
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
        you will be navigated to <br/>
        {window.WP_navto}
        in 3 sec ...
        {console.log(setTimeout(ev=>{
            window.location.href=window.WP_navto
        },2000))}
    </>
}
