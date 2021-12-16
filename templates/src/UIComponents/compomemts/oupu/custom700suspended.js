import React from "react";
import a700svg from "../../../images/700svg.svg"
import m700 from '../../stylemodules/700.module.css'

export default function Custom700()
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
        {/*{window.WP_navto}*/}
        {/*ur suspended*/}
    </>
}
