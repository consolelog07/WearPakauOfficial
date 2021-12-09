import React from "react"
import m404 from "../../stylemodules/400.module.css"
import S404svg from "../../../images/404svg.svg"
export  default function F404(props){

    return<>
        <div className={m404.container}>
            <div className={m404.imgcontainer}>
                <img src={S404svg} alt=""/>
            </div>
            <div className="button">
                <a href="/">Go To Home</a>
            </div>
        </div>

    </>
}