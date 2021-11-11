import React, { Component } from "react";
import { render } from "react-dom";
import Globalauth from "./components/Globalauth";
import Navbar from "./components/Navbar";
import {Route,BrowserRouter as Router,Switch} from "react-router-dom";
import Hello from "./UIComponents/Trial";
import Footer from "./UIComponents/compomemts/Footer"


export default class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {


    return (
        <>
            <Globalauth  />

        </>

    );
  }
}


const appDiv = document.getElementById("app");
render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    , appDiv);
