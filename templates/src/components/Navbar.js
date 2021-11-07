import React from'react'
import {Link, Route} from "react-router-dom";
import Globalauth from "./Globalauth";


export default class Navbar_proxy extends React.Component
{
    constructor(props) {
        super(props);

    }

    render()
    {
        return<>
        navbar
            <nav>
                <Globalauth out />
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/auth/login/">login</Link>
                    </li>
                    <li>
                        <Link to="/auth/logout/">logout </Link>
                    </li>
                    <li>
                        <Link to="/auth/Changepassword/">Changepassword</Link>
                    </li>
                    <li>
                        <Link to="/auth/password_reset/">password_reset</Link>
                    </li>
                    <li>
                        <Link to="/auth/password_reset_conform/">password_reset_conform</Link>
                    </li>
                    <li>
                        <Link to="/auth/login/">login</Link>
                    </li>
                    <li>
                        <Link to="/auth/login/">login</Link>
                    </li>

                </ul>
            </nav>
        </>
    }
}