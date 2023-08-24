import React from 'react'
import { Link, useNavigate } from "react-router-dom"
// import logo from "../images/logowhite.png"
import "./Nav.css"
export default function Nav() {
    const navigate = useNavigate();
    return (
        <div className='bartop'>
            <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" >
                <div class="container-fluid">
                    {/* <img src={logo} alt='image' id="logo" /> */}
                    <div class="collapse navbar-collapse m-5 p-5 l-8" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item m-3">
                                <a class="nav-link active" aria-current="page" href="#top">Home</a>
                            </li>
                            <li class="nav-item m-3">
                                <a class="nav-link active" aria-current="page" href="#about">About Us</a>
                            </li>
                            <li class="nav-item m-3">
                                <a class="nav-link active" aria-current="page" href="#contact">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div class="rightbar">
                        <ul class="rightbar">
                            <li><Link to='/login' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>Login</Link></li>
                            <li><Link to='/register' style={{ "listStyle": "none", "textDecoration": "none", "margin": "25px", "color": 'black', "fontSize": "20px" }}>Register</Link></li>
                            <li><Link to='/login'
                                onClick={() => {
                                    alert("Should have an account to Appy....\npress OK to login/register");
                                    navigate("/login");
                                }} style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>Careers</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}
