import React, {useState} from "react";
import QrScanner from 'qr-scanner';
import QrScannerWorkerPath from '!!file-loader!../../../../../node_modules/qr-scanner/qr-scanner-worker.min.js';
import {MenuItem, Select} from "@material-ui/core";

QrScanner.WORKER_PATH = QrScannerWorkerPath;
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class QrScanner_component extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            hasCam:QrScanner.hasCamera(),
            camlist:[],
            detectedvalue:null,
            currentcam:null,
        }
        console.log(QrScanner.listCameras(true).then(ev=>{
            console.log(ev)
            this.setState({camlist:ev})
        }))
        this.video = React.createRef();

        this.start=this.start.bind(this)
        this.stop=this.stop.bind(this)
        this.destroy=this.destroy.bind(this)
        this.toggle_flashlight=this.toggle_flashlight.bind(this)
        this.handelchange=this.handelchange.bind(this)
    }

    componentDidMount() {
        if(this.state.hasCam)
        {
            this.qrScanner = new QrScanner(this.video.current, result => {
                this.state.detectedvalue=result
            });
            this.setState({hasFlash:this.qrScanner.hasFlash()})
            this.qrScanner.start()
        }

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
    handelchange=(ev)=>{
        console.log(ev,ev.target.value)
        this.setState({currentcam:ev.target.value})
        this.qrScanner.setCamera(ev.target.value)
    }



    render() {
        return (
            <>
                <video ref={this.video} />
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.currentcam}
                    label="Age"
                    onChange={this.handelchange}
                >
                    {this.state.camlist.map(ev=>{return <MenuItem value={ev.id}>{ev.label}</MenuItem>})}
                </Select>
            </>
        );
    }


}
