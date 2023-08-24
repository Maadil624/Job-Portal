import React, { useEffect, useState } from 'react'
import axios from "axios"
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom'
export default function Files() {
  const navigate = useNavigate();
  const [file, setfile] = useState();
  let [msg, setmsg] = useState();
  let [errfile, seterrfile] = useState();
  let [sucess, setsucess] = useState();
  let files = file ? [...file] : []
  // const [upfile, setupfile] = useState([]);
  let handleChange = (event) => {
    setfile(event.target.files);
    // console.log(file)
  }
  // if(window.location.reload){
  //   sessionStorage.removeItem('sucess')
  // }
  useEffect(() => {
    // fileUpload()
    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('sucess');
    });
    console.log(sucess)
    setsucess(sessionStorage.getItem('sucess'))

  }, [])
  // let filesdatas=Object.entries(file);
  async function fileUpload(e) {
    e.preventDefault();
    // console.log(file)
    try {
      // console.log(typeof(filesdata))
      let filesdata = file ? [...file] : []
      // defining file extentions
      let allowedTypes = [
        "application/vnd.ms-excel",
        "application/msexcel",
        "application/x-ms-excell",
        "application/x-excel",
        "application/xls",
        "application/csv",
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/x-msexcel"
      ]
      filesdata.forEach(file => {
        if (!allowedTypes.includes(file.type)) {
          seterrfile(file.name)
          // console.log(errfile)
        }
      })
      if (filesdata.length > 3 || filesdata.length <= 0) {
        Swal.fire(
          'Select Min 1 & Max 3 Files',
          '',
          'error'
        )
        setfile(null)
      }
      // console.log(filesdata)
      if (filesdata.length <= 3) {
        const formData = new FormData();
        // console.log(typeof(filesdata))
        filesdata.forEach((file, i) => {
          formData.append(`file-${i}`, file)
          // console.log(...formData.values())  
        });
        const values = [...formData.values()];
        // console.log(values,"line 17 files");
        const response = await axios.post('http://localhost:5000/fileupload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (response) {
          setmsg(response.data.message)
          Swal.fire(
            'File Uploaded',
            `${response.data.message}`,
            'sucess'
          ).then(() => {
            navigate('/fileusers')
          })
        }
        console.log(response)
      }
    } catch (error) {
      console.log('at Files', error)
      if (error) {
        // let err=error?error.response.data.message:'please upload csv file'
        Swal.fire(
          'upload Error',
          // `${err}`,
          'warning'
        )
      }
    }
  }
  return (<>
    {
      (sucess) ?
        <form encType='multipart/form-data' id='form1' onSubmit={fileUpload}>
          <div className='files'>
            <label htmlFor='file' id='lbl' name='file'>
              {(file) ? `Total files selected : ${file.length}` : "Click Here to Upload Files"}
              <input type='file' id='file' name='file' multiple
                onChange={handleChange}>
              </input>
            </label>
            <button type="submit" className="btn btn-danger btn-lg" id='upldbtn' name='btn'>Upload</button>
            <div>

              {(file) ?
                <div style={{ textAlign: 'center' }}>
                  {files.map((file, id) => {
                    return (<>
                      <h6 key={id}>Name : {file.name}</h6>
                    </>)
                  })}
                  {/* <h6>Type: {file[0].type}</h6> */}
                </div>
                : <h1 style={{ textAlign: 'center' }}>
                  select a file...
                </h1>
              }
            </div>

          </div>
        </form>
        : <div className='failed'>
          <h1>please login first</h1><br/>
          <button type="button" class="btn btn-danger btn-lg" >
            <Link to="/login" style={{ "textDecoration": "none", "listStyle": "none", "color": "white" }}>Login
            </Link></button>
        </div>}
  </>
  )
}



// console.log(formdata.append('file',file))
  // async function fileUpload(e){
  //   e.preventDefault();
  //   let url="http://localhost:5000/fileupload"
  //   const formdata=new FormData();
  //   formdata.append('filed',file)
  //   console.log(formdata," form at 7")
  //       fetch(url, {
  //           method: "POST",
  //           body:formdata,
  //           headers: {
  //               'Content-Type': 'multipart/form-data'
  //           }
  //       }).then(response => response.json())
  //           .then((data) => {
  //               console.log("data", data);
  //           }).catch(err=>{
  //             console.log("error at file uploading",err)
  //           })
  //       // alert("uploaded")
  //   }