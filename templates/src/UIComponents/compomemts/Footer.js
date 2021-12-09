import React from "react";
import footer from "../style/footer.css"
import logowc from '../../images/logowc.png'
import instagramicon from '../../images/instagramicon.svg'
import facebookicon from '../../images/facebookicon.svg'
import twittericon from '../../images/twittericon.svg'


export default class Footer extends React.Component
{

    render() {
        return<>

            <footer>
                <div className="footerhead">
                    <div className="footerlogocontainer">
                        <img src={logowc} alt=""/>
                    </div>
                </div>
                <div className="footerlinkscontainer">
                    <div className="footercol1">
                        <h3 className="footercoltitle">CUSTOMER SERVICE</h3>
                        <ul className="footercollinklist">
                            <li><a href="/ContactUs">Contact Us</a></li>
                            <li><a href="/order/orderList">Track Order</a></li>
                            <li><a href="/order/orderList">Return Order</a></li>
                            <li><a href="/order/orderList">Cancel Order</a></li>
                        </ul>
                    </div>
                    <div className="footercol2">
                        <h3 className="footercoltitle">COMPANY</h3>
                        <ul className="footercollinklist">
                            <li><a href="/AboutUs">About Us</a></li>
                            <li><a href="/TermsAndConditionAndPrivacyPolicy">Terms & Condition</a></li>
                            <li><a href="/TermsAndConditionAndPrivacyPolicy">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="footercol3">
                        <h3 className="footercoltitle">CONNECT WITH US</h3>
                        <ul className="footercollinklist footersocialicons">
                            <li>
                                <a href="#"
                                ><img src={instagramicon} alt=""
                                /></a>
                            </li>
                            <li>
                                <a href="#"><img src={twittericon} alt=""/></a>
                            </li>
                            <li>
                                <a href="#"
                                ><img src={facebookicon} alt=""
                                /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    }
}