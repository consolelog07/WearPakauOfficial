import React from "react";
import mPB from "../../../stylemodules/PrimaryBefore.module.css"
import scanner from "../../../../images/scanner.svg"
import exclamation from "../../../../images/exclamation.svg"

export default function PrmaryBefore(props)
{
    return <>
        <div className={mPB.productactivatecontainer}>
            <div className={mPB.uppercontainer}>
                <div className={mPB.imgcontainer}>
                    <img src={scanner} alt=""/>
                </div>
                <button className={mPB.activatebtn} onClick={
                    ev=>{
                        props.setAgstate({...props.AGstate,
                            Active_primary:false,
                            Active_secondary:true,
                        })
                    }
                }>Click To Activate</button>
            </div>
            <div className={mPB.lowercontainer}>
                <div className={mPB.card}>
                    <div className={mPB.exclamationcontainer}>
                        <img src={exclamation} alt=""/>
                    </div>
                    <p className={mPB.cardhead}>
                        Read the instructions below to learn how to activate your product
                    </p>
                    <ul className={mPB.cardlist}>
                        <li>Click on the button above to initiate the process</li>
                        <li>Scan the QR code on your product</li>
                        <li>
                            Confirm the details of your product and confirm to activate it
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </>
}