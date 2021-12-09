import React from "react";
// import mred from "../../stylemodules/redirect.module.css"
import "../../style/redirect.css"
import frontimage from "../../../images/final logo trans.png"
import backimage from "../../../images/qrcode.png"

export default function OupuDetail()
{


    return<>

            <div className="container">
                <div className="card">
                    <div className="card-front" >
                        <img src={frontimage}  alt={"logo"}/>
                    </div>
                    <div className="card-back" >
                        <img src={backimage}  alt={"logo"}/>
                    </div>
                </div>
            </div>

        {/*<div className="container">*/}
        {/*    <div className="card">*/}
        {/*        <div className="card-front" >*/}
        {/*            <img src={frontimage}  alt={"logo"}/>*/}
        {/*        </div>*/}
        {/*        <div className="card-back" >*/}
        {/*            <img src={backimage} style={{width:"30%",height:"30%"}} alt={"logo"}/>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}

        {/*you will be navigated to <br/>*/}
        {/*{window.WP_navto}*/}
        {/*in 3 sec ...*/}
        {console.log(setTimeout(ev=>{
            window.location.href=window.WP_navto
        },2000))}
    </>
}
