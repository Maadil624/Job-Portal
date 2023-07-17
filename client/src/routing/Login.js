import React, { useState } from 'react'
import "./user.css"
import { Link, useNavigate } from "react-router-dom"
export default function Login() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    let url = "http://localhost:5000/login"
    // POST request using fetch()
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pass
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then((data) => {
        setmsg(data.message);
        console.log("data", data);
      });
    alert(msg.concat("\nThank you😊.....\n"));
    // console.log(msg)
    // console.log(pass)
    setemail('')
    setpass('')
    if (msg.includes("login") && msg.includes("sucessfull")) {
      navigate('/alljob')
    }
  }
  const [email, setemail] = useState("")
  const [pass, setpass] = useState("")
  const [msg, setmsg] = useState("")
  // console.log(email)
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
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1">Remember me</label>
          </div><br />
          <button type="submit" class="btn btn-success btn-lg" >Submit</button>
          <b><hr></hr></b>
          <h6>Don`t Have an account ?</h6>
          <button type="button" class="btn btn-danger btn-lg" ><Link to="/register" style={{ "textDecoration": "none", "listStyle": "none", "color": "white" }}>Register Here</Link></button>
        </div>
      </form>
    </div>
  )
}