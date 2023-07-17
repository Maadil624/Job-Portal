import React, { useEffect, useState } from 'react'
import img from "../images/abt.png"
import logo from "../images/logowhite.png"
import "./user.css"
export default function Jobsite() {
  const [jobs, setjobs] = useState([])
  const [totaljobs, settotaljobs] = useState(0)
  let url = "http://localhost:5000/alljob"
  function fetchApi() {
    fetch(url).then(json => json.json()).then(data => {
      console.log(data)
      setjobs(data.job)
      settotaljobs(data.totalJobs)
    })
  }
  useEffect(() => {
    fetchApi();
  }, [totaljobs])
  return (
    <div>
      <label className='joblogo'><img src={logo} alt='logo' />
      </label>
      <div class="card m-5 mb-3" style={{ "max-width": " 900px", maxHeight: "700px" }}>
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src={img} class="card-img" alt="Pago Logo" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Jobs Available To Apply : {totaljobs}</h5><br />
              <p class="card-text">We provide a full and professional solution for the Job needs for your career by offering a wide range of services and specialties in this It field to get you into the job and make your professional life sucessful.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex flex-wrap' id="main" >
        {
          jobs.map(job => {
            // console.log(job)
            return <>

              <div class="card d-flex flex-wrap text-center justify-content-center m-5 p-2" style={{ width: "35rem", margin: '3rem' }}>
                <div class="card-header">
                  Company Name : <b>{job.company}</b>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Position : <b>{job.position}</b></h5>
                  <br />
                  <h6>Location: <b>{job.location} </b></h6><br />
                  <button type="button" class="btn btn-primary" onClick={() => alert("Applied for the job.......")}>Apply</button>
                </div>
              </div>
            </>
          })}
      </div>
    </div>
  )
}