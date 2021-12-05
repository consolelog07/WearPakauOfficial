import React, {useState} from "react";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import QRCustom from "./QRCustom";

export default function JsonTOQr()
{
    const [state,setState]=useState({
        json:"",
        proxy:false,
        display:false
    })
    const[err,setError]=useState(false)

    console.log(state)
    function verify(ev)
    {
        console.log("ddddddddddddddddddddddddddd")
        try {
            JSON.parse(state.proxy)
        }
        catch (err)
        {
            console.log("errrrrrr",err)
            setState({...state,display:False,json:""})
            setError(true)
        }
        console.log("ddddddddddddddddddddddddddddddddssssssssssssssssss")

        setState({json:state.proxy,display:true,proxy:state.proxy})
        console.log("sssssssssssssssssdddddddds")
    }

    return<>
        <Grid container spacing={2}
              direction="row"
              xs={12}
              md={12}
              justifyContent="center"
              alignItems="center"
              style={{height:"fit-content",justifyContent:"center"}}
        >
            <Grid item xs={10} md={4}  >
                <Paper elevation={3} style={{backgroundColor:"white",height:"400px",marginLeft:"2vw"}} >
                    {state.display === false && <Typography variant="h1" component="h2">
                        Json not provided
                    </Typography>}
                    {state.display === true && <QRCustom qroptions={JSON.parse(state.json)} />}
                </Paper>
            </Grid>
            <Grid item xs={10} md={8}>
                <Paper elevation={3} style={{backgroundColor:"white",height:"400px"}} >
                    <TextField fullWidth label="fullWidth" id="fullWidth" value={state.proxy}
                    onChange={ev=>{
                        setState({...state,proxy:ev.target.value})
                    }}/>
                    <Button variant="contained" onClick={verify}>Contained</Button>
                </Paper>
            </Grid>
        </Grid>

    </>

}