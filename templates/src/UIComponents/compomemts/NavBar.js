import React from "react";
import searchicon from  '../../images/searchicon.svg'
import MENUBURGER from  '../../images/MENUBURGER.svg'
import amazon_logo from '../../images/amazon_logo.png'
import carticon from '../../images/carticon.svg'
import profileicon from  '../../images/profileicon.svg'
import closeicon from '../../images/closeicon.svg'
import header from '../style/header.css'
import {CircularProgress, Slide} from "@material-ui/core";
import loader from "../style/loader.css"

export default  class NavBar extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            burger:false,
            toggled:false

        }
        this.burger_function=this.burger_function.bind(this)
    }


    burger_function(e)
    {
    // console.log("hello")
    this.setState((state,props)=>{

        if (state.burger )
        {
            document.body.style.overflow='visible'
        }
        else
        {
            document.body.style.overflow='hidden'
        }

        return {burger:!state.burger}
    })

    }


    render() {
        // navlinks
        if(this.state.burger === true && this.state.toggled === false)
        {
            setTimeout(ev=>{document.querySelector(".navlinks").classList.toggle('navactive')},10)
            setTimeout(ev=>{document.querySelector(".closebutton").classList.toggle('showclosebutton')},10)
            this.setState({toggled:true})
        }
        else
            if(this.state.burger === false && this.state.toggled === true)
            {
            setTimeout(ev=>{document.querySelector(".navlinks").classList.toggle('navactive')},10)
            setTimeout(ev=>{document.querySelector(".closebutton").classList.toggle('showclosebutton')},10)
                this.setState({toggled:false})
            }

        return (
            <>
                <nav>
                    <div className="burger" onClick={this.burger_function} >
                        <img src={MENUBURGER} alt=""/>
                    </div>
                    <div className="logo" onClick={ev=>{
                        window.location.href="/"}}>
                        <img src={amazon_logo} alt=""/>
                    </div>
                    <div className="searchcontainer">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            name="search"
                            autoComplete="off"
                        />
                        <button><img src={searchicon} alt=""/></button>
                    </div>
                    <div className="cartcontainer">
                        <img src={carticon} alt=""/>
                    </div>
                    <div className="profilecontainer" onClick={ev=>{
                        window.location.href="/auth/"
                    }}>
                        <img src={profileicon} alt=""/>
                    </div>


                    {this.state.burger?
                        <div className="nimish" style={{display: "block"}}>
                        </div>:
                        <div className="nimish" style={{display: "none"}}>
                        </div>
                    }


                    {/*{this.state.burger === false &&*/}
                    <ul className="navlinks">
                        <div className="closebutton" onClick={this.burger_function}>
                            <img src={closeicon} alt=""/>
                        </div>
                        <li className="navlink"><a href="#">Xyz</a></li>
                        <li className="navlink"><a href="#">Xyz</a></li>
                        <li className="navlink"><a href="#">Xyz</a></li>
                        <li className="navlink"><a href="#">Xyz</a></li>
                    </ul>
                    {/*// }*/}


                    {/*{this.state.burger === true &&*/}
                    {/*<ul className="navlinks " >*/}
                    {/*    <div className="closebutton showclosebutton" onClick={this.burger_function}>*/}
                    {/*        <img src={closeicon} alt=""/>*/}
                    {/*    </div>*/}
                    {/*    <li className="navlink"><a href="#">Xyz</a></li>*/}
                    {/*    <li className="navlink"><a href="#">Xyz</a></li>*/}
                    {/*    <li className="navlink"><a href="#">Xyz</a></li>*/}
                    {/*    <li className="navlink"><a href="#">Xyz</a></li>*/}
                    {/*</ul>}*/}



                </nav>
                <div className="searchcontainermobile">
                    <div className="searchmobile">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            name="search"
                            autoComplete="off"
                        />
                        <button><img src={searchicon} alt=""/></button>
                    </div>
                </div>
            </>
        );
    }
}