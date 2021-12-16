import React from "react";
import m700 from "../../stylemodules/700.module.css";
import a700svg from "../../../images/701svg.svg";


export default function Custom701()
{


    return<>
        <div className={m700.container}>
            <div className={m700.imgcontainer}>
                <img src={a700svg} alt=""/>
            </div>
            <div className={m700.button}>
                <a href="/">Go To Home</a>
            </div>
        </div>
        {/*ur illegal hostname*/}
    </>
}
