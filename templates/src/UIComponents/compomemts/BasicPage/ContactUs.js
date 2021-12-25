import React from "react";
import mc from "../../stylemodules/tact.module.css"
import instagramicon from '../../../images/instagramicon.svg'
import facebookicon from '../../../images/facebookicon.svg'
import twittericon from '../../../images/twittericon.svg'
import phone from "../../../images/phone.svg"
import email from '../../../images/email.svg'
export default function ContactUs (props)
{

    return<>
        <div className={mc["contactcontainer"]}>
            <h2 className={mc["contactheading"]}>Get in touch</h2>
            <div className={mc["innercontainer"]}>
                <div className={mc["formcontainer"]}>
                    <form action="">
                        <div className={mc["inputcontainer"]}>
                            <input
                                type="text"
                                className="name"
                                placeholder="NAME"
                                autoCapitalize="on"
                            />
                        </div>
                        <div className={mc["inputcontainer"]}>
                            <input type="email" className={mc["name"]} placeholder="EMAIL"/>
                        </div>
                        <div className={mc["inputcontainer"]}>
              <textarea
                  rows="10"
                  placeholder="MESSAGE"
                  name="message"
                  required
              ></textarea>
                        </div>

                        <button className={mc["submit"]}>SEND</button>
                    </form>
                </div>
                <div className={mc["detailcontainer"]}>
                    <ul className={mc["contactinfo"]}>
                        <li>
              <span><img src={phone} alt=""/></span
              >1234567890
                        </li>
                        <li>
              <span><img src={email} alt=""/></span
              >abcd@emial.com
                        </li>
                    </ul>
                    <ul className={mc["sociallink"]}>
                        <li><img src={instagramicon} alt=""/></li>
                        <li><img src={facebookicon} alt=""/></li>
                        <li><img src={twittericon} alt=""/></li>
                    </ul>
                </div>
            </div>
        </div>
    </>
}