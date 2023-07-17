import React, { useState } from 'react'

export default function CreateJobs() {
    function handleSubmit(e) {
        e.preventDefault();
        let url = "http://localhost:5000/createjob";
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                company,
                position
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
            .then(json =>
                // setmsg(json.message));
                console.log("data", json));
        alert("hello...", msg);
        setcompany('')
        setposition('')
    }
    const [company, setcompany] = useState("")
    const [position, setposition] = useState("")
    const [msg, setmsg] = useState("")
    return (
        <div className='form'>
            <div class='form1'>
                <form onSubmit={handleSubmit} >
                    <div className='logo'>
                    </div>
                    <br />
                    <div class="col-md-15 mb-4 name">
                        <label for="validationDefault01">Enter Company Name</label>
                        <input type="text" value={company} onChange={(e) => setcompany(e.target.value)} class="form-control" id="validationDefault01" placeholder="Enter Your name" required />
                    </div>
                    <div class="col-md-15 mb-4 name">
                        <label for="validationDefault01">Enter Company Name</label>
                        <input type="text" value={position} onChange={(e) => setposition(e.target.value)} class="form-control" id="validationDefault01" placeholder="Enter Your name" required />
                    </div>
                    <br />
                    <br />
                    <button type="submit" class="btn btn-success btn-lg" >Add Job</button>
                </form>
            </div>
        </div>
    )
}