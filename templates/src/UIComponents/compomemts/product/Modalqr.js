import React, {Component, useEffect, useRef, useState} from "react";
import productdetail from "../../style/productdetail.css"
import closeicon from "../../../images/closeicon.svg"
import QRCodeStyling from "qr-code-styling";
import QRCustom from "../../QRCustom";
import meta from  "../../../images/Meta.jpg"

export default function  Modalqr(props) {

    const [color,setColor]=useState({
        color1:"",
        color2:""

    })
    // console.log(props.qroptions)
    //setStateQr
    return <>
        <div className="modalcontainer" style={{display:"block"}}>
            <div className="closemodal" onClick={props.setmodalFalse}>
                <img src={closeicon} alt=""/>
            </div>
            <h2 className="customqrhead">Customise Your QR Below</h2>

            <div className="qrboxcontainer">
                <QRCustom qroptions={props.qroptions} />
                {/*<div className="canvas" style={{width: 300,height:300}} ></div>*/}
            </div>
            <div className="collapsiblecontainer">
                <details open>
                    <summary>Dots Option</summary>
                    <div className="selectstyle">
                        <label className="select" htmlFor="slct">
                            <select id="slct" required="required" onChange={ev=>{
                                props.setStateQr({options:{...props.qroptions,dotsOptions: {...props.qroptions.dotsOptions,type:ev.target.value}}})
                                console.log(ev.target.value)
                            }
                            } >
                                <option value="" disabled="disabled" selected="selected">
                                    Select dot style
                                </option>
                                <option value="square">Square</option>
                                <option value="dots">Dots</option>
                                <option value="rounded">Rounded</option>
                                <option value="extra-rounded">Extra rounded</option>
                                <option value="classy">Classy</option>
                                <option value="classy-rounded">Classy rounded</option>
                            </select>
                            <svg>
                                <use xlinkHref="#select-arrow-down"></use>
                            </svg>
                        </label>

                            {/*// <!-- SVG Sprites-->*/}
                        <svg className="sprites">
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1"></polyline>
                            </symbol>
                        </svg>
                    </div>
                    <div className="selectstyle">
                        <label className="select" htmlFor="slct" >

                            <input node="dotsOptions.color" id="color1" type="color"   />
                            {/*<svg>*/}
                            {/*    <use xlinkHref="#select-arrow-down"></use>*/}
                            {/*</svg>*/}
                            <button onClick={
                                ev=>{
                                    props.setStateQr({options:{...props.qroptions,dotsOptions: {...props.qroptions.dotsOptions,color:document.querySelector("#color1").value}}})
                                    // console.log(ev.target.value)
                                }
                            } >Change Color</button>
                        </label>

                        {/*// <!-- SVG Sprites-->*/}
                        <svg className="sprites">
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1"></polyline>
                            </symbol>
                        </svg>
                    </div>
                </details>
                <details>
                    <summary>Corner Square Option</summary>
                    <div className="selectstyle">
                        <label className="select" htmlFor="slct">
                            <select id="slct" required="required" onChange={ev=>{
                                props.setStateQr({options:{...props.qroptions,cornersSquareOptions: {...props.qroptions.cornersSquareOptions,type:ev.target.value}}})
                                console.log(ev.target.value)
                            }
                            } >
                                <option value="" disabled="disabled" selected="selected">
                                    Select corner square style
                                </option>
                                <option value="">None</option>
                                <option value="dot">Dot</option>
                                <option value="square">Square</option>
                                <option value="extra-rounded">Extra rounded</option>
                            </select>
                            <svg>
                                <use xlinkHref="#select-arrow-down"></use>
                            </svg>
                        </label>
                        {/*// <!-- SVG Sprites-->*/}
                        <svg className="sprites">
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1"></polyline>
                            </symbol>
                        </svg>
                    </div>
                    <div className="selectstyle">
                        <label className="select" htmlFor="slct" >

                            <input node="dotsOptions.color" id="color2" type="color"   />
                            {/*<svg>*/}
                            {/*    <use xlinkHref="#select-arrow-down"></use>*/}
                            {/*</svg>*/}
                            <button onClick={
                                ev=>{
                                    props.setStateQr({options:{...props.qroptions,cornersSquareOptions: {...props.qroptions.cornersSquareOptions,color:document.querySelector("#color2").value}}})
                                    // console.log(ev.target.value)
                                }
                            } >Change Color</button>
                        </label>

                        {/*// <!-- SVG Sprites-->*/}
                        <svg className="sprites">
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1"></polyline>
                            </symbol>
                        </svg>
                    </div>
                </details>
                <details>
                    <summary>Corners Dot Option</summary>
                    <div className="selectstyle">
                        <label className="select" htmlFor="slct">
                            <select id="slct" required="required" onChange={ev=>{
                                props.setStateQr({options:{...props.qroptions,cornersDotOptions: {...props.qroptions.cornersDotOptions,type:ev.target.value}}})
                                console.log(ev.target.value)
                            }
                            } >
                                <option value="" disabled="disabled" selected="selected">
                                    Select Corners Dot Option
                                </option>
                                <option value="">None</option>
                                <option value="dot">Dot</option>
                                <option value="square">Square</option>
                                <option value="extra-rounded">Extra rounded</option>
                            </select>
                            <svg>
                                <use xlinkHref="#select-arrow-down"></use>
                            </svg>
                        </label>
                        {/*// <!-- SVG Sprites-->*/}
                        <svg className="sprites">
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1"></polyline>
                            </symbol>
                        </svg>
                    </div>
                    <div className="selectstyle">
                        <label className="select" htmlFor="slct" >

                            <input node="dotsOptions.color" id="color3" type="color"   />
                            {/*<svg>*/}
                            {/*    <use xlinkHref="#select-arrow-down"></use>*/}
                            {/*</svg>*/}
                            <button onClick={
                                ev=>{
                                        props.setStateQr({options:{...props.qroptions,cornersDotOptions: {...props.qroptions.cornersDotOptions,color:document.querySelector("#color3").value}}})
                                    // console.log(ev.target.value)
                                }
                            } >Change Color</button>
                        </label>

                        {/*// <!-- SVG Sprites-->*/}
                        <svg className="sprites">
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1"></polyline>
                            </symbol>
                        </svg>
                    </div>
                </details>
                <details>
                    <summary>logo Options</summary>
                    <div className="selectstyle">
                        <label className="select" htmlFor="slct">
                            <select id="slct" required="required" onChange={ev=>{
                                let val=ev.target.value
                                if(ev.target.value === "alert")
                                {
                                    val=null
                                }
                                props.setStateQr({options:{...props.qroptions,image: val}})
                                console.log(ev.target.value)
                            }
                            } >
                                <option value="" disabled="disabled" selected="selected">
                                    Select logo
                                </option>
                                <option value="alert">None</option>
                                <option value={meta}>Meta</option>
                                {/*<option value="square">Dot</option>*/}
                                {/*<option value="extra-rounded">Extra rounded</option>*/}
                            </select>
                            <svg>
                                <use xlinkHref="#select-arrow-down"></use>
                            </svg>
                        </label>
                        {/*// <!-- SVG Sprites-->*/}
                        <svg className="sprites">
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1"></polyline>
                            </symbol>
                        </svg>
                    </div>
                </details>

            </div>
            <div className="modalbtncontainer">
                {/*// <!-- <button class="cancelcustomisation">Cancel</button> -->*/}
                <button className="donecustomisation" onClick={props.setmodalFalse} >Done</button>
            </div>
        </div>
    </>
}
