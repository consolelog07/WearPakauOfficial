import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";


import mDetail from "../../stylemodules/pdf.module.css";
import QRCustom from "../../QRCustom";
import CustomizedTables from "./table";
import ReactToPrint from "react-to-print";
import Detailview from "./table detailview";
function createData(Product_ID, Name, Size, qr, Price) {
    return { Product_ID, Name, Size, qr, Price};
}


export default class PdfCreate extends React.Component
{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        // console.log(props)
        this.rows=[]
        this.props.state.result.Ordered_products.forEach(ev=>{
            this.rows.push(createData(ev.unique_u14, this.props.state.name_list[ev.Product], ev.size, ev.QrJson, ev.price))

        })


        this.modalClose=this.modalClose.bind(this)
    }

    modalClose()
    {
        this.props.setModal(!this.props.modal)
    }
    render() {
        const state=this.props.state
        const rows = [
            // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        ];
        return<>
            <Dialog
                fullScreen
                open={this.props.modal}
                onClose={this.modalClose}
            >
                <DialogTitle className={mDetail.orderdetailhead}>Order Receipt</DialogTitle>
                <DialogContent  >
                    <Detailview ref={el => (this.componentRef = el)} state={this.props.state} rows={this.rows} date={this.date}/>
                </DialogContent>
                <DialogActions>
                    <ReactToPrint
                        trigger={() => {
                            return <a href="#">Print this out!</a>;
                        }}
                        content={() => this.componentRef}
                        documentTitle={`OrderReciept WearPakau orderid:${state.result.OrderId}`}
                    />
                    <Button onClick={this.modalClose}>Cancel</Button>
                </DialogActions>
            </Dialog>


        </>
    }

}