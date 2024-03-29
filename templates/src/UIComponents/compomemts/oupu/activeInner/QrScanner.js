import React, {useState} from "react";
import QrScanner from 'qr-scanner';
import mc from "../../../stylemodules/cam.module.css"
import QrScannerWorkerPath from '!!file-loader!../../../../../node_modules/qr-scanner/qr-scanner-worker.min.js';
import rotatecam from "../../.././../images/rotatecam.svg"
import flashicon from "../../.././../images/flashicon.svg"

QrScanner.WORKER_PATH = QrScannerWorkerPath;
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class QrScanner_component extends React.Component
{
    constructor(props) {
        super(props);
        // this.props.setResult("http://127.0.0.1:8000/oupu/7975d1c4-7846-4266-8a52-092638743108")
        this.state={
            hasCam:false,
            camlist:[],
            detectedvalue:null,
            currentcam:null,
            hasFlash:false,
            ccn:0,
            objcreated:false,
            reqcheckflash:false,
            reqcheckcam:false,

        }
        QrScanner.hasCamera().then(ev=>{
            // console.log(ev,"dcamdd")
            this.setState({hasCam:ev})
        })
        QrScanner.listCameras(true).then(ev=>{
            console.log(ev,"sssss")
            this.setState({camlist:ev})
        })

        this.video = React.createRef();
        this.start=this.start.bind(this)
        this.stop=this.stop.bind(this)
        this.destroy=this.destroy.bind(this)
        this.toggle_flashlight=this.toggle_flashlight.bind(this)
        this.handelchange=this.handelchange.bind(this)
    }

    stop=()=>{
    this.qrScanner.stop();
    }
    start=()=>{
        // this.state({})
    this.qrScanner.start()
    }
    destroy=()=>{
    this.qrScanner.destroy();
    }
    toggle_flashlight=()=>{
    this.qrScanner.toggleFlash();
    }
    handelchange=()=>{

        let a=(this.state.ccn+1)%this.state.camlist.length
        this.setState({currentcam:this.state.camlist[a].id,ccn:a})
        this.qrScanner.setCamera(this.state.camlist[a].id)
        this.qrScanner.hasFlash().then(ev=>{
            console.log(ev)
            this.setState({hasFlash:ev})
        })

    }

        pattern = new RegExp('^https?:\/\/(www\.)?[a-zA-Z\.\\0-9\:]+/oupu/');
    pattern2 = new RegExp('^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$');


    render() {

        if(this.state.hasCam && this.state.objcreated === false)
        {
            console.log("hassssssssssssssssss")
            this.qrScanner = new QrScanner(this.video.current, result => {
                console.log(result,"dddddddddddddddddddddd")
                if(this.pattern.test(result))
                {
                    console.log("test trye")
                    var b=result.substr(result.lastIndexOf("/")+1,result.length)
                    if(b.search("unique_u14") != -1)
                    {
                        b=b.split("=")[1]
                    }
                    console.log("test trye",b)
                    if(this.pattern2.test(b))
                    {
                        console.log("taaaaerrrr",b)
                        this.destroy()
                        this.props.setResult(result)
                    }
                }

            });
            this.setState({objcreated:true,reqcheckflash:true})
            this.qrScanner.hasFlash().then(ev=>{
                this.setState({hasFlash:ev})
                console.log(ev,false)})
            this.qrScanner.start()
        }
        // if (this.state.reqcheckflash )
        // {
        //     this.setState({reqcheckflash:false})
        // }

        // console.log("hello")



        return (
            <>
                <div className={mc.container}>
                    <h3 className={mc.Customh3}>Scan Wear Pakau Qr </h3>
                    <div className={mc.camcontainer}>
                        <video ref={this.video} ></video>
                        <div className={mc.controls}>
                            {this.state.camlist.length >1 &&
                            <button className={mc.rotatecam} onClick={this.handelchange} ><img src={rotatecam} alt="" /></button>
                            }
                            {this.state.hasFlash &&
                            <button className={mc.flash} ><img src={flashicon} onClick={this.toggle_flashlight} alt="" /></button>
                            }

                        </div>
                    </div>
                </div>
                <div className={mc.ValidParent}>
                <h4 className={mc.Valid}>No valid qr detected</h4>
                </div>
            </>
        );
    }


}


// <video  />
// <Select
//     labelId="demo-simple-select-label"
//     id="demo-simple-select"
//     value={this.state.currentcam}
//     label="Age"
//     onChange={this.handelchange}
// >
//     {this.state.camlist.map(ev=>{return <MenuItem value={ev.id}>{ev.label}</MenuItem>})}
// </Select>