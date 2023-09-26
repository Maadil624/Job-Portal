import React, { useState, useEffect } from 'react'
import "./user.css"
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import GLogin from './GLogin';
import FbLogin from './FbLogin';
import Nav from './Nav.js'
import img from '../images/Sign-in-Large---Active.png'
// import LinkedInPage from './LinkedinLogin';

// toast.configure()

export default function Login() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    let url = "http://localhost:5000/login"
    // POST request using fetch()
    let responce = fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pass
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
      .then(async (data) => {
        setalt(true);
        try{
          if(data.role.includes('Admin')){
            console.log(data.role)
            sessionStorage.setItem('Admin',data.pass.email+","+data.pass.name+','+data.role)
          }
          if(data.role.includes('user')){
            sessionStorage.setItem('user',data.pass.email+","+data.pass.name+','+data.role)
          }
        }catch(err){
          console.log(err)
        }
        setmsg(data.message);
        settkn(data.token);
        setrole(data.role)
        document.cookie = `role=${data.role}; max-age=60*60*1`;
        console.log(msg);
        console.log("data", data);
      });
  }
  const [email, setemail] = useState()
  const [pass, setpass] = useState()
  const [msg, setmsg] = useState("")
  const [alt, setalt] = useState(false)
  const [chk, setchk] = useState(false)
  const [active, setactive] = useState(true)
  const [tkn, settkn] = useState()
  const [role, setrole] = useState()


  useEffect(() => {
    clearTimeout(sessionStorage.getItem('timeoutid'))
    if (active) {
      setactive(sessionStorage.getItem('active'))
      setemail(sessionStorage.getItem('email'))
      setpass(sessionStorage.getItem('pass'))
      sessionStorage.setItem("loginpage", true)
      // sessionStorage.setItem("active", false)
      sessionStorage.setItem("jobsitepage", false)
      let jobsitepageactive = sessionStorage.getItem("jobsitepage")
      // console.log(!!jobsitepageactive)
      if (!!jobsitepageactive) {
        sessionStorage.setItem('active', false)
        sessionStorage.removeItem('token')
      }
      sessionStorage.removeItem('sucess')
    }
  }, [])
  // console.log(chk,"chk")
  if (alt && handleSubmit) {
    if (msg.includes("login") && msg.includes("sucessfull") && tkn) {
      sessionStorage.setItem("token", tkn)
      sessionStorage.setItem("sucess", true)
      if (chk) {
        sessionStorage.setItem("chk", chk)
        sessionStorage.setItem("email", email)
        sessionStorage.setItem("pass", pass)
        Swal.fire({
          position: "center",
          title: `${msg}`,
          timer: 3000,
          icon: 'success'
        }).then(() => {
          console.log('object')
          if (tkn&&role.includes('user')) {
            navigate('/fileupload')
          }
          if(tkn&&role.includes('Admin')){
            navigate('/Admin')
          }
        })
        if (active) {
          sessionStorage.setItem("active", true)
          // setemail(sessionStorage.getItem('email'))
          // setpass(sessionStorage.getItem('pass'))
        }
      }
      sessionStorage.setItem("active", true)
      if (!chk) {
        sessionStorage.removeItem("email", email)
        sessionStorage.removeItem("pass", pass)
        // sessionStorage.removeItem("token", tkn)
      }
      Swal.fire({
        position: "center",
        title: `${msg}`,
        timer: 3000,
        icon: 'success'
      }).then(() => {
        console.log(tkn&&role.includes('user'))
        if (tkn&&role.includes('user')) {
          navigate('/fileupload')
        }
        else if(tkn&&role.includes('Admin')){
          navigate('/Admin')
        }
        else {
          navigate('/login')
        }
      })
    }
    else {
      if (chk) {
        setemail(email)
        setpass(pass)
        Swal.fire({
          position: "center",
          title: `${msg}`,
          timer: 3000,
          icon: 'warning'
        })
      }
      else {
        setemail('')
        setpass('')
        Swal.fire({
          position: "center",
          title: `${msg}`,
          timer: 3000,
          icon: 'warning'
        })
      }
    }
    setalt(false)
  }
  // console.log(role)
  return (<>
    <Nav />
    <div className='form'>
      <form onSubmit={handleSubmit} >
        <div class='form1'>
          <div className='logo'>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <br />
            <input type="email" value={email} onChange={(e) => setemail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group"><br />
            <label for="exampleInputPassword1">Password</label><br />
            <input type="password" value={pass} onChange={(e) => setpass(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div class="form-group form-check"><br />
            <input type="checkbox" class="form-check-input" value={chk} id="exampleCheck1" onChange={(e) => { setchk(e.target.checked) }} />
            <label class="form-check-label" for="exampleCheck1">Remember me</label>
          </div><br />
          <button type="submit" class="btn btn-success btn-lg LRbtns" >Submit</button>
          {/* <b><hr></hr></b> */}
          {/* <h6>Don`t Have an account ?</h6> */}
          <button type="button" class="btn btn-danger btn-lg LRbtns" >
            <Link to="/register" style={{ "textDecoration": "none", "listStyle": "none", "color": "white" }}>Register Here
            </Link></button>
        </div>
        <b><hr></hr></b>
        <br />
        <div class="g-signin2" data-onsuccess="onSignIn" className='G_FB_login' >
          <GLogin />
          {/* <LinkedInPage/> */}
        </div>
        <FbLogin /><br />
        <a href='http://localhost:5000/auth/linkedin' >
          <img src={img} />
        </a>
      </form>
    </div>
  </>
  )
}