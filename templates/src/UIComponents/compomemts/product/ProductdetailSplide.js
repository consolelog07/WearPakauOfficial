import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

export default function  Productdetailsplide(props)  {

    // console.log(props.imagesSet.Images)
    return (
        <>
        <Splide
                options={ {
                    type:"fade",
                    gap   : '1rem',
                    height   : '80vh',
                    width:'40rem',
                    arrows:true,
                    lazyLoad:false,

                    // autoWidth: true,
                    // autoHeight:true,
                    perPage:1,
                    perMove:1,
                    breakpoints: {
                        768: {
                            width:"",
                            height:"60vh"
                        },
                        480: {
                            width:"100%",
                            height:"60vh",
                            gap:"5vw"
                        },
                    }

                } }
            >
            {
                props.imagesSet.Images.map(ev=><>
                    <SplideSlide>
                        <img src={ev.image}  style={{width:"100%",height:"90%"}} alt=""/>
                    </SplideSlide>
                </>)
            }


        {/*//     <SplideSlide>*/}
        {/*//         <img src="https://raw.githubusercontent.com/consolelog07/wearpakau/master/styles/images/tshirtimage.jpg" alt=""/>*/}
        {/*//     </SplideSlide>*/}
        </Splide>
        </>
    );
}