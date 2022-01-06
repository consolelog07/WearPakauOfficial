import React, {Component, useEffect, useRef, useState} from "react";
import productdetail from "../../style/productdetail.css"
import closeicon from "../../../images/closeicon.svg"
import QRCodeStyling from "qr-code-styling";
import QRCustom from "../../QRCustom";
import meta from  "../../../images/Meta.jpg"
import pdm from "../../stylemodules/detailP.module.css"
import imagessss from "./imagessss";

export default function  Modalqr(props) {

    const [color,setColor]=useState({
        color1:"",
        color2:""

    })
    const [err,setErr]=useState({
        err:false,
        errmsg:""
    })

    return <>
        <div className={"nimish"} style={{width:"100vw",height:"400vh",display:"block"}}></div>
        <div className={pdm.modalcontainer} style={{display:"block",zIndex:500}}>
            <div className={pdm.closemodal} onClick={props.setmodalFalse}>
                <img src={closeicon} alt=""/>
            </div>
            <h2 className={pdm.customqrhead}>Customise Your QR Below</h2>
            <div className={pdm.collapsiblecontainer}>
                <details open>
                    <summary>Dots Option</summary>
                    <div className={pdm.selectstyle}>
                        <label className={pdm.select} htmlFor="slct">
                            <select id="slct" required="required" onChange={ev=>{
                                props.setStateQr({options:{...props.qroptions,dotsOptions: {...props.qroptions.dotsOptions,type:ev.target.value}}})
                                // console.log(ev.target.value)
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
                        <svg className={pdm.sprites}>
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1"></polyline>
                            </symbol>
                        </svg>

                        <p className="colorlabel">Select color</p>
                        <input node="dotsOptions.color" id="color1"
                               onFocus={ev=>{}}

                               onChange={ev=>{
                                   if(window.innerWidth < 786)
                                   {
                                       props.setStateQr({options:{...props.qroptions,dotsOptions: {...props.qroptions.dotsOptions,color:ev.target.value}}})
                                   }
                               }}
                               onBlur={ev=>{
                                   if(window.innerWidth > 786)
                                   {
                                       props.setStateQr({options:{...props.qroptions,dotsOptions: {...props.qroptions.dotsOptions,color:ev.target.value}}})
                                   }
                               }}
                               type="color"   />


                    </div>

                </details>
                <details>
                    <summary>Corner Square Option</summary>
                    <div className={pdm.selectstyle}>
                        <label className={pdm.select} htmlFor="slct">
                            <select id="slct" required="required" onChange={ev=>{
                                if (ev.target.value==="")
                                {

                                }
                                props.setStateQr({options:{...props.qroptions,cornersSquareOptions: {...props.qroptions.cornersSquareOptions,type:ev.target.value}}})
                                // console.log(ev.target.value)
                            }
                            } >
                                <option value="" disabled="disabled"  hidden selected="selected">
                                    Select corner square style
                                </option>
                                <option value="dot">Dot</option>
                                <option value="square">Square</option>
                                <option value="extra-rounded">Extra rounded</option>
                            </select>
                            <svg>
                                <use xlinkHref="#select-arrow-down"></use>
                            </svg>
                        </label>
                        {/*// <!-- SVG Sprites-->*/}
                        <svg className={pdm.sprites}>
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1"></polyline>
                            </symbol>
                        </svg>
                        <p className="colorlabel">Select color</p>
                        <input node="dotsOptions.color" id="color1"
                               onFocus={ev=>{}}
                               onChange={ev=>{
                                   if(window.innerWidth < 786)
                                   {
                                       props.setStateQr({options:{...props.qroptions,cornersSquareOptions: {...props.qroptions.cornersSquareOptions,color:ev.target.value}}})
                                   }
                               }}
                               onBlur={ev=>{

                                   if(window.innerWidth > 786)
                                   {
                                       props.setStateQr({options:{...props.qroptions,cornersSquareOptions: {...props.qroptions.cornersSquareOptions,color:ev.target.value}}})
                                   }
                               }}
                               type="color"   />

                    </div>

                </details>
                <details>
                    <summary>Corners Dot Option</summary>
                    <div className={pdm.selectstyle}>
                        <label className={pdm.select} htmlFor="slct">
                            <select id="slct" required="required" onChange={ev=>{
                                props.setStateQr({options:{...props.qroptions,cornersDotOptions: {...props.qroptions.cornersDotOptions,type:ev.target.value}}})
                                // console.log(ev.target.value)
                            }
                            } >
                                <option value="" disabled="disabled" hidden selected="selected">
                                    Select Corners Dot Option
                                </option>
                                <option value="dot">Dot</option>
                                <option value="square">Square</option>
                                <option value="extra-rounded">Extra rounded</option>
                            </select>
                            <svg>
                                <use xlinkHref="#select-arrow-down"></use>
                            </svg>
                        </label>
                        {/*// <!-- SVG Sprites-->*/}
                        <svg className={pdm.sprites}>
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1"></polyline>
                            </symbol>
                        </svg>
                        <p className="colorlabel">Select color</p>
                        <input node="dotsOptions.color" id="color1"
                               onChange={ev=>{
                                if(window.innerWidth < 786)
                                {
                                    props.setStateQr({options:{...props.qroptions,cornersDotOptions: {...props.qroptions.cornersDotOptions,color:ev.target.value}}})
                                }
                               }}
                               onBlur={ev=>{
                                   if(window.innerWidth > 786)
                                   {
                                       props.setStateQr({options:{...props.qroptions,cornersDotOptions: {...props.qroptions.cornersDotOptions,color:ev.target.value}}})
                                   }
                               }}
                               type="color"   />

                    </div>

                </details>
                <details>
                    <summary>logo Options</summary>
                    <div className={pdm.selectstyle}>
                        <label className={pdm.select} htmlFor="slct">
                            <select id="slct" required="required" onChange={ev=>{
                                let val=ev.target.value
                                if(ev.target.value === "alert")
                                {
                                    val=null
                                }
                                props.setStateQr({options:{...props.qroptions,image: val}})

                            }
                            } >
                                <option value="" disabled="disabled" selected="selected">
                                    Select logo
                                </option>
                                <option value="alert">None</option>
                                {/*<option value={imagessss.wearpakau}>WearPakau</option>*/}
                                {/*<option value={imagessss.meta}>Meta</option>*/}
                                {/*<option value={imagessss.Apple}>Apple</option>*/}
                                {/*<option value={imagessss.instagram}>Instagram</option>*/}
                                {/*<option value={imagessss.twitter}>Twitter</option>*/}
                                {/*<option value={imagessss.BurgerKing}>BurgerKing</option>*/}
                                {/*<option value={imagessss.tinder}>Tinder</option>*/}
                            </select>
                            <svg>
                                <use xlinkHref="#select-arrow-down"></use>
                            </svg>
                        </label>
                        {/*// <!-- SVG Sprites-->*/}
                        <svg className={pdm.sprites}>
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1"></polyline>
                            </symbol>
                        </svg>
                        {/*<p className="colorlabel"> OR Choose image</p>*/}
                        {/*<input type="file" id="img" name="img" accept="image/*" />*/}
                    </div>
                </details>

            </div>
            <div className={pdm.qrboxcontainer}>
                <p className={pdm.qrtitle}>Your QR</p>
                <QRCustom qroptions={props.qroptions} />
                {/*<div className="canvas" style={{width: 300,height:300}} ></div>*/}
            </div>
            <div className={pdm.modalbtncontainer}>
                {/*// <!-- <button class="cancelcustomisation">Cancel</button> -->*/}
                <button className={pdm.donecustomisation} onClick={props.setmodalFalse} >Done</button>
            </div>
        </div>

        </>
}
