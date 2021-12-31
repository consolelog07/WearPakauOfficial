import React from "react";
import creative1 from "../../images/creative1.jpg"
import categorycreative from "../../images/categorycreative.jpg"
import samplecreative from  "../../images/samplecreative.jpg"
import "../style/landing.css"
import {Splide, SplideSlide} from "@splidejs/react-splide";

export default function Landing ()
{
    const imageSet=[creative1,creative1,creative1,creative1,creative1,creative1]

    return<>
        <div className="landing-container">
            <div className="landing-carousel-container">
                <Splide
                    options={ {

                        // gap   : '1rem',
                        height:'100%',
                        width:'100%',
                        // arrows:true,
                        lazyLoad:false,
                        direction: 'rtl',
                        type : 'loop',
                        // autoplay: true,
                        // autoWidth: true,
                        // autoHeight:true,
                        perPage : 3,
                        perMove:1,
                        breakpoints: {
                            768: {
                                perPage:2,
                                // gap   : '1rem',
                            },
                            480: {
                              perPage:1,
                                width:"90vw",
                                // autoWidth: true,
                                // height:"60vh",
                                // gap:"5vw"
                            },
                        }

                    } }
                >
                    {
                        imageSet.map(ev=><>
                            <SplideSlide>
                                <div className="landing-carousel-card">
                                    <a href="" className="landing-carousel-card-link">
                                        <img
                                            src={ev}
                                            className="landing-carousel-card-link-img"
                                        />
                                    </a>
                                </div>
                            </SplideSlide>
                        </>)
                    }
                </Splide>

            </div>
            <div className="landing-category-container">
                <ul className="landing-category-ul">
                    <li className="landing-category-ul-li">
                        <a href="#" className="landing-category-ul-li-a"
                        >
                            <div className="landing-category-ul-li-a-card">
                                <div className="landing-category-ul-li-a-card-img-container">
                                    <img src={categorycreative} alt=""/>
                                </div>
                                <p className="landing-category-ul-li-a-card-text">Best Sellers</p>
                            </div>
                        </a
                        >
                    </li>
                    <li className="landing-category-ul-li">
                        <a href="#" className="landing-category-ul-li-a"
                        >
                            <div className="landing-category-ul-li-a-card">
                                <div className="landing-category-ul-li-a-card-img-container">
                                    <img src={categorycreative} alt=""/>
                                </div>
                                <p className="landing-category-ul-li-a-card-text">Best Sellers</p>
                            </div>
                        </a
                        >
                    </li>
                    <li className="landing-category-ul-li">
                        <a href="#" className="landing-category-ul-li-a"
                        >
                            <div className="landing-category-ul-li-a-card">
                                <div className="landing-category-ul-li-a-card-img-container">
                                    <img src={categorycreative} alt=""/>
                                </div>
                                <p className="landing-category-ul-li-a-card-text">Best Sellers</p>
                            </div>
                        </a
                        >
                    </li>
                    <li className="landing-category-ul-li">
                        <a href="#" className="landing-category-ul-li-a"
                        >
                            <div className="landing-category-ul-li-a-card">
                                <div className="landing-category-ul-li-a-card-img-container">
                                    <img src={categorycreative} alt=""/>
                                </div>
                                <p className="landing-category-ul-li-a-card-text">Best Sellers</p>
                            </div>
                        </a
                        >
                    </li>
                    <li className="landing-category-ul-li">
                        <a href="#" className="landing-category-ul-li-a"
                        >
                            <div className="landing-category-ul-li-a-card">
                                <div className="landing-category-ul-li-a-card-img-container">
                                    <img src={categorycreative} alt=""/>
                                </div>
                                <p className="landing-category-ul-li-a-card-text">Best Sellers</p>
                            </div>
                        </a
                        >
                    </li>
                    <li className="landing-category-ul-li">
                        <a href="#" className="landing-category-ul-li-a"
                        >
                            <div className="landing-category-ul-li-a-card">
                                <div className="landing-category-ul-li-a-card-img-container">
                                    <img src={categorycreative} alt=""/>
                                </div>
                                <p className="landing-category-ul-li-a-card-text">Best Sellers</p>
                            </div>
                        </a
                        >
                    </li>
                    <li className="landing-category-ul-li">
                        <a href="#" className="landing-category-ul-li-a"
                        >
                            <div className="landing-category-ul-li-a-card">
                                <div className="landing-category-ul-li-a-card-img-container">
                                    <img src={categorycreative} alt=""/>
                                </div>
                                <p className="landing-category-ul-li-a-card-text">Best Sellers</p>
                            </div>
                        </a
                        >
                    </li>
                    <li className="landing-category-ul-li">
                        <a href="#" className="landing-category-ul-li-a"
                        >
                            <div className="landing-category-ul-li-a-card">
                                <div className="landing-category-ul-li-a-card-img-container">
                                    <img src={categorycreative} alt=""/>
                                </div>
                                <p className="landing-category-ul-li-a-card-text">Best Sellers</p>
                            </div>
                        </a
                        >
                    </li>
                    <li className="landing-category-ul-li">
                        <a href="#" className="landing-category-ul-li-a"
                        >
                            <div className="landing-category-ul-li-a-card">
                                <div className="landing-category-ul-li-a-card-img-container">
                                    <img src={categorycreative} alt=""/>
                                </div>
                                <p className="landing-category-ul-li-a-card-text">Best Sellers</p>
                            </div>
                        </a
                        >
                    </li>
                </ul>
            </div>
            <div className="landing-creative-container">
                <div className="landing-creative-box">
                    <a href="#"
                    >
                        <img
                            src={samplecreative}
                            alt=""
                            className="creative"
                        />
                    </a>
                </div>
            </div>
            <div className="landing-creative-container">
                <div className="landing-creative-box">
                    <a href="#"
                    >
                        <img
                            src={samplecreative}
                            alt=""
                            className="creative"
                        />
                    </a>
                </div>
            </div>
            <div className="landing-creative-container">
                <div className="landing-creative-box">
                    <a href="#"
                    >
                        <img
                            src={samplecreative}
                            alt=""
                            className="creative"
                        />
                    </a>
                </div>
            </div>
            <div className="landing-creative-container">
                <div className="landing-creative-box">
                    <a href="#"
                    >
                        <img
                            src={samplecreative}
                            alt=""
                            className="creative"
                        />
                    </a>
                </div>
            </div>
        </div>
    </>
}