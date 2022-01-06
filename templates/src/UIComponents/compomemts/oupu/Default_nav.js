import React from "react";
import "../../style/emptyurl.css"


export default function Default_nav (props)
{
    return<>
        <div className="externalcontainer">
            <div className="container_empty">
                <h2>Check out the video below to change the redirect URL.</h2>
                <div className="videocontainer">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/Sy8nPI85Ih4"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    </>
}