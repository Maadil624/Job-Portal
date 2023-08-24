import React, { useState, useEffect } from 'react'
import "./user.css"
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import GLogin from './GLogin';
import FbLogin from './FbLogin';
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
        setmsg(data.message);
        settkn(data.token);
        console.log(msg);
        console.log("data", data);
      });
  }
  const [email, setemail] = useState("")
  const [pass, setpass] = useState("")
  const [msg, setmsg] = useState("")
  const [alt, setalt] = useState(false)
  const [chk, setchk] = useState(false)
  const [active, setactive] = useState(true)
  const [tkn, settkn] = useState()


  useEffect(() => {
    // setTimeout(() => {
    //   // alert('hello')
    //   sessionStorage.removeItem('token')
    //   sessionStorage.removeItem('sucess')
    // }, 10000);
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
        sessionStorage.setItem('active',false)
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
        sessionStorage.setItem("email", email)
        sessionStorage.setItem("chk", chk)
        sessionStorage.setItem("pass", pass)
        Swal.fire({
          position: "center",
          title: `${msg}`,
          timer: 3000,
          icon: 'success'
        }).then(() => {
          if (tkn) {
            navigate('/fileupload')
          }
        })
        if (active) {
          sessionStorage.setItem("active", true)
          setemail(sessionStorage.getItem('email'))
          setpass(sessionStorage.getItem('pass'))
        }
      }
      sessionStorage.setItem("active", true)
      if (chk == false) {
        sessionStorage.removeItem("email", email)
        sessionStorage.removeItem("pass", pass)
        setemail(sessionStorage.removeItem(email))
        setpass(sessionStorage.removeItem(pass))
        sessionStorage.removeItem("token", tkn)
      }
      Swal.fire({
        position: "center",
        title: `${msg}`,
        timer: 3000,
        icon: 'success'
      }).then(() => {
        if (tkn) {
          navigate('/fileupload')
        }
        else {
          navigate('/login')
        }
      })
    }
    else {
      if (chk) {
        setemail(sessionStorage.getItem('email'))
        setpass(sessionStorage.getItem('pass'))
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
  return (
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
          <button type="submit" class="btn btn-success btn-lg" >Submit</button>
          <b><hr></hr></b>
          <h6>Don`t Have an account ?</h6>
          <button type="button" class="btn btn-danger btn-lg" >
          <Link to="/register" style={{ "textDecoration": "none", "listStyle": "none", "color": "white" }}>Register Here
          </Link></button>
        </div>
        <b><hr></hr></b>
        <br/>
          <div class="g-signin2" data-onsuccess="onSignIn" className='G_FB_login' >
           <GLogin/>
           <FbLogin/>
           {/* <LinkedInPage/> */}
          <a href='http://localhost:5000/auth/linkedin' >
            <img src={img}/>
            </a>
          </div>
      </form>
    </div>
  )
}