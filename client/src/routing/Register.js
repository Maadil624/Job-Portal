import { useState } from "react";
import React from 'react'
import "./user.css"
import { Link, useNavigate } from "react-router-dom"
export default function Register() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    let url = "http://localhost:5000/register";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: pass
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
      .then((data) => {
        setmsg(data.message);
        console.log(data);
      });
    alert(msg.concat("\nThank you 😊.....\n"));
    // console.log(email)
    // console.log(pass)
    setemail('')
    setpass('')
    setname('')
    if (msg.includes("created") && msg.includes("sucessfully")) {
      navigate('/login')
    }
  }
  const [email, setemail] = useState("")
  const [pass, setpass] = useState("")
  const [name, setname] = useState("")
  const [msg, setmsg] = useState("")
  return (
    <div className='form'>
      <div class='form1'>
        <form onSubmit={handleSubmit} >
          <div className='logo'>
          </div>
          <div class="col-md-15 mb-4 name">
            <label for="validationDefault01">Enter Your Name</label>
            <input type="text" value={name} onChange={(e) => setname(e.target.value)} class="form-control" id="validationDefault01" placeholder="Enter Your name" required />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email Address</label>
            <br />
            <input type="email" value={email} onChange={(e) => setemail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group"><br />
            <label for="exampleInputPassword1">Password</label><br />
            <input type="password" value={pass} onChange={(e) => setpass(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <br />
          <br />
          <button type="submit" class="btn btn-success btn-lg" >Register</button>
          <b><hr></hr></b>
          <h6>Already Have an account ?</h6>
          <button type="button" class="btn btn-danger btn-lg" ><Link to="/login" style={{ "textDecoration": "none", "listStyle": "none", "color": "white" }}>Login Here</Link></button>
        </form>
      </div>
    </div>
  )
}
