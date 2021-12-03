import Alert from '@material-ui/lab/Alert';
import React from "react";
import {Button, Snackbar} from "@material-ui/core";

export default function CustomizedSnackbars(props) {

    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")

    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert variant="filled" onClose={handleClose}  sx={{ width: '100%' }} severity={props.severity}>
                    {`${props.message}`}
                </Alert>
            </Snackbar>
       </>
    );
}