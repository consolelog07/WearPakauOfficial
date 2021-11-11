import React, {useEffect, useRef, useState} from "react";
import QRCodeStyling from "qr-code-styling";

export default function  QRCustom(props)
{
    // console.log(props.qroptions)
    const [qrCode] = useState(new QRCodeStyling(props.qroptions));
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            qrCode.append(ref.current);
        }
    }, [qrCode, ref]);

    useEffect(() => {
        if (!qrCode) return;
        qrCode.update(props.qroptions);
    }, [qrCode, props.qroptions]);


    return<>
        <div className="canvas"  ref={ref} style={{width: "fit-content",height: "fit-content",border:""}} ></div>
    </>
}