import React, { useState, useEffect } from 'react'
import NavafterLogin from './NavafterLogin'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'
export default function Database_users() {
  const [token, settoken] = useState()
  const [data, setdata] = useState()
  let [role, setrole] = useState()
  let navigate=useNavigate();
  async function fetchApi() {
    try{
      let url = 'http://localhost:5000/allusers'+
      `?data=${role}`
      // encodeURIComponent(`?data=${role}`)
      await fetch(url, {
      method: 'GET',
      headers: {
        'x-access-token': sessionStorage.getItem('token')
      }
    })
    .then(json => json.json()).then(async (data) => {
      // console.log('data',data)
      // console.log('data',Object.values(data.data)[0])
      // let dt=data.data
      (data)?
      setdata(Object.values(data.data)[0])
      :setdata(null)
    })
  }catch(err){
    console.log('err at fetch ',err)
  }
}

useEffect(() => {
  let tokn=sessionStorage.getItem('token')
  console.log(sessionStorage.getItem('token'))
  settoken(tokn)
  let data=document.cookie.split(';')
  data.forEach((data)=>{
    let ck=data.split('=')
    // console.log(ck[0].includes('role'))
    if(ck[0].includes('role')){
      role=ck[1] 
      // console.log(ck[1]) 
    }
    // console.log(ck)
  })
  console.log(role)
  // console.log('39 all cookies',document.cookie)
  if(!tokn){
      Swal.fire(
        'Token Expired',
        'redirecting to login page',
        'error'
        ).then(()=>{
          navigate('/login')
        })
      }
      fetchApi();
  }, [])
  return (
    <div>
      <NavafterLogin />
      <div class="card m-5 mb-3" id='display' style={{ Height: "100%" }}>
        <div className='d-flex flex-wrap' id="main" >
          {
            (data)
              ?
              <>
                {data.map((data, id) => {
                  return (
                    <>
                      <div class="card d-flex flex-wrap text-left justify-content-center m-5 p-2" style={{ width: "35rem", margin: '3rem' }}>
                        <div class="card-body" id='id1'>
                          name : {data.name}<br/>
                          email : {data.email}<br/>
                          role : {data.role}
                        </div>
                      </div>
                    </>)
                })}
              </>
              :
              <>no data</>
          }
        </div>
      </div>
    </div>
  )
}
