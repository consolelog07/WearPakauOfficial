import React from "react";
import searchicon from  '../../images/searchicon.svg'
import MENUBURGER from  '../../images/MENUBURGER.svg'
import amazon_logo from '../../images/final logo trans.png'
import carticon from '../../images/carticon.svg'
import profileicon from  '../../images/profileicon.svg'
import closeicon from '../../images/closeicon.svg'
import header from '../style/header.css'
// import mheader from '../stylemodules/header.module.css'


import "../style/loader.css"
import Logout from "../../components/Logout";
import {Route} from "react-router-dom";

// console.log(mheader)

export default  class NavBar extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            burger:false,
            toggled:false,
            search:"",
            redirect:false

        }

        this.listofpages=[
            "/auth/",
            "/auth/emailverifysent/"
        ]
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

        if(this.state.redirect)
        {
            window.location.href=`/product/list/?search=${this.state.search}`
        }
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
                        <img src={amazon_logo}
                             alt=""/>
                    </div>

                    <div className="searchcontainer">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            name="search"
                            autoComplete="off"
                            value={this.state.search}
                            onChange={ev=>{this.setState({search:ev.target.value})}}
                            onKeyUp={ev=>{
                                if(ev.keyCode === 13)
                                {
                                    this.setState({redirect:true})
                                }
                            }}

                        />
                        <button onClick={ev=>{this.setState({redirect:true})}}
                        ><img src={searchicon} alt=""/></button>
                    </div>

                    <div className="cartcontainer"onClick={ev=>{
                        window.location.href="/cart/"
                    }}>
                        <img src={carticon} alt=""/>
                    </div>
                    <div className="profilecontainer" onClick={ev=>{
                        window.location.href="/auth/"
                    }}>
                        <img src={profileicon} alt=""/>
                    </div>


                    {this.state.burger?
                        <div className="nimish"  onClick={this.burger_function} style={{display: "block"}}>
                        </div>:
                        <div className="nimish" onClick={this.burger_function} style={{display: "none"}}>
                        </div>
                    }


                    <ul className="navlinks">
                        <h3 className="menuheading">Welcome { this.props.Gstate.login=== true? this.props.Gstate.First_name : "User"}</h3>
                        <div className="closebutton" onClick={this.burger_function}>
                            <img src={closeicon} alt=""/>
                        </div>
                        <li className="navlink"><a href="/auth/">Profile</a></li>
                        <li className="navlink"><a href="/order/orderList">Orders</a></li>
                        <li className="navlink"><a href="/cart/">Cart</a></li>
                        <li className="navlink"><a href="/Settings">Settings</a></li>
                        <li className="navlink"><a href="/ContactUs">Contact us</a></li>
                        {this.props.Gstate.login=== true ?
                        <Logout logout={this.props.logout} />:<li className="navlink"><a href="/auth/">Login</a></li>

                        }

                    </ul>



                </nav>
                {this.listofpages.find(ev=>{
                    if(window.location.pathname === ev)
                    {
                        return true
                    }
                    if(window.location.pathname.search(ev) !== -1)
                    {
                        return true
                    }
                    return false

                }) === undefined  &&  <div className="searchcontainermobile">
                    <div className="searchmobile">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            name="search"
                            autoComplete="off"
                            value={this.state.search}
                            onChange={ev=>{this.setState({search:ev.target.value})}}
                            onKeyUp={ev=>{
                                if(ev.keyCode === 13)
                                {
                                    this.setState({redirect:true})
                                }
                            }}
                        />
                        <button onClick={ev=>{this.setState({redirect:true})}}
                        ><img src={searchicon} alt=""/></button>
                    </div>
                </div>}

            </>
        );
    }
}