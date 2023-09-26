import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
// import logo from "../images/logowhite.png"
import "./Nav.css"
import { useLocation } from 'react-router-dom';
export default function NavafterLogin(props) {
    const [notifications, setnotifications] = useState()
    const [value, setvalue] = useState()
    let p = { ...props }
    console.log(p)
    let admin = sessionStorage.getItem('Admin')
    let user = sessionStorage.getItem('user')
    const location = useLocation()
    const navigate = useNavigate();
    console.log(admin)
    console.log(user)
    function notidisplay() {
        setvalue(true)
        console.log('notifications')
    }
    return (
        <>
            {
                ((user)?user.includes('user'):!admin) ?
                    <div className='bartop' style={{ zIndex: '2' }}>
                        <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" >
                            <div class="container-fluid">
                                {/* <img src={logo} alt='image' id="logo" /> */}
                                <div class="collapse navbar-collapse m-0 p-3 l-8" id="navbarSupportedContent">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item m-3"><a href='/' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>Home</a></li>

                                        {/* <li class="nav-item m-3">
                                <a class="nav-link active" aria-current="page" href="#contact">Contact Us</a>
                            </li> */}
                                    </ul>
                                </div>
                                <div class="rightbar">
                                    <ul class="rightbar">
                                        <li><Link to='/usersfiles' onClick={() => p = false} style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>Filesdata</Link></li>
                                        <li><Link to='/createjob' style={{ "listStyle": "none", "textDecoration": "none", "margin": "25px", "color": 'black', "fontSize": "20px" }}>Create-Job</Link></li>
                                        <li><Link to='/alljob' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>Careers</Link></li>
                                        {(!window.location.toString().includes('fileupload')) ? <li><Link to='/fileupload' style={{
                                            marginLeft: '10px',
                                            "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px"
                                        }}>fileupload</Link></li> : ''}
                                        <li><button type="button" class="btn btn-danger btn-lg LRbtns" onClick={() => {
                                            sessionStorage.clear()
                                            navigate('/login')
                                        }}>Logout</button></li>
                                    </ul>
                                </div>
                                <i class="fa-solid fa-bell noti" style={{ "font-size": "30px" }} onClick={() => { notidisplay() }}></i>
                            </div>
                        </nav>

                    </div>
                    : <>
                        <div className='bartop' style={{ zIndex: '2' }}>
                            <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" >
                                <div class="container-fluid " id='Adminrightbar'>
                                    <div class="rightbar" >
                                        <ul class="rightbar" >
                                            <li>{(!window.location.toString().includes('Admin')) ? <Link to='/Admin' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px", marginRight: '15px' }}>Home</Link> : ''}</li>
                                            {/* <li><Link to='/adminrequest' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" ,padding:"20px"}}>Requests</Link></li> */}
                                            <li><Link to='/fileusers' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>Filesdata</Link></li>
                                            {console.log(window.location.toString())}
                                            <li><Link to='/createjob' style={{
                                                "width": "100px",
                                                "listStyle": "none", "textDecoration": "none", "margin": "25px", "color": 'black', "fontSize": "20px"
                                            }}>Create-Job</Link></li>
                                            <li><Link to='/alljob' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>Careers</Link></li>
                                            {(!window.location.toString().includes('fileupload')) ? <li><Link to='/fileupload' style={{
                                                marginLeft: '10px',
                                                "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px"
                                            }}>fileupload</Link></li> : ''}
                                            <li style={{marginLeft:'10px'}}>
                                                <Link to='/allusers' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>DBusers</Link>
                                            </li>
                                            <li><button type="button" class="btn btn-danger btn-lg LRbtns" onClick={() => {
                                                sessionStorage.clear()
                                                navigate('/login')
                                            }}>Logout</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </>
            }
            {(value) ?
                <div class="notification">
                    <div className='noticontent'>
                        <button className='contentbtn' onClick={() => {
                            setvalue(false)
                        }}>X</button>
                        hyvihb
                        <hr />
                        hyvihb
                        <hr />
                        hyvihb
                        <hr />
                    </div>
                </div> :
                <></>}
        </>
    )
}
