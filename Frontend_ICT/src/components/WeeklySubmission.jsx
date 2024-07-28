import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';

const WeeklySubmission = ({s_id}) => {

  const [s_start_date,set_s_start_date] = useState(null)

  const [week1ConditionMet, set_week1ConditionMet] = useState(false);
  const [week2ConditionMet, set_week2ConditionMet] = useState(false);
  const [week3ConditionMet, set_week3ConditionMet] = useState(false);
  const [week4ConditionMet, set_week4ConditionMet] = useState(false);

    const [form,setForm]=useState({
      selectedWeek:'',
      links:'',
      files:'',
      comments:''
    })

    // function captureFile(event){
    //     setFiles(event.target.files[0]);
    //     console.log(event.target.files[0]);
    // }

    useEffect(()=>{
      axios.get(`http://localhost:5000/princy/studentswithprojects/${s_id}`)
      .then((res)=>{
          console.log(`Axios res.data[0].start_date (studentswithprojects) in WeeklySubmission is - `)
          console.log(res.data[0].start_date)
          // const date = new Date(res.data[0].start_date).toLocaleDateString()
          // set_s_start_date(date)
          set_s_start_date(res.data[0].start_date)
          // set_s_start_date(new Date(res.data[0].start_date).toLocaleDateString())
          // console.log(`s_start_date is ${s_start_date}`)
      })
      // const date_currentDate = new Date()
      // // const date_start_date = new Date(s_start_date)
      // console.log(`date_currentDate  is ${date_currentDate}`);
      // console.log(`s_start_date  is ${s_start_date}`);

      console.log(`s_start_date is ${s_start_date}`)

      const string_currentDate = new Date().toLocaleDateString();
      const string_start_date = s_start_date;
      console.log(`string_currentDate  is ${string_currentDate}`);
      console.log(`string_start_date  is ${string_start_date}`);
    
      const date_currentDate = new Date(string_currentDate)
      const date_start_date = new Date(string_start_date)
      console.log(`date_currentDate  is ${date_currentDate}`);
      console.log(`date_start_date  is ${date_start_date}`);

      const week1_date = new Date(s_start_date)
      week1_date.setDate(week1_date.getDate() + 7);
      console.log(`week1_date  is ${week1_date}`);
      set_week1ConditionMet(date_currentDate >= week1_date)
      console.log(`week1ConditionMet is ${week1ConditionMet}`)

      const week2_date = new Date(s_start_date)
      week2_date.setDate(week2_date.getDate() + 14);
      console.log(`week2_date  is ${week2_date}`);
      set_week2ConditionMet(date_currentDate >= week2_date)
      console.log(`week2ConditionMet is ${week2ConditionMet}`)
      
      const week3_date = new Date(s_start_date)
      week3_date.setDate(week3_date.getDate() + 21);
      console.log(`week3_date  is ${week3_date}`);
      set_week3ConditionMet(date_currentDate >= week3_date)
      console.log(`week3ConditionMet is ${week3ConditionMet}`)
      
      const week4_date = new Date(s_start_date)
      week4_date.setDate(week4_date.getDate() + 28);
      console.log(`week4_date  is ${week4_date}`);
      set_week4ConditionMet(date_currentDate >= week4_date)
      console.log(`week4ConditionMet is ${week4ConditionMet}`)

    },[s_id,s_start_date])

    const  submitForm = async(e)=>{
      e.preventDefault()
      const formdata = new FormData()
      // formdata.append("weeklyfile",files)
      formdata.append("selectedWeek",form.selectedWeek)
      formdata.append("links",form.links)
      formdata.append("files",form.files)
      formdata.append("comments",form.comments)
      console.log('formdata is -')
      console.log(formdata)

      const result = await axios.post(`http://localhost:5000/princy/uploadWeek/${s_id}`,
        formdata,{headers:{"Content-Type":"multipart/form-data"}})
        .then((res)=>{
          console.log(`Axios res.data(projects) is - `)
          console.log(res.data)})

      alert('Congrats!!! Your have submitted your work for the week')
    }

  return (
    <div>
        <form className="formStyle" encType="multipart/form-data" onSubmit={submitForm}>
        <h2 className="text-primary py-2 text-center"><u>Weekly Submission</u></h2>
        <br/>
        <div className="row mb-3">
          <label className="col " >Select the week of submission:</label>
          {/* <div className="col  text-start d-flex justify-content-start align-items-start"> */}
          <div className="col ">
            <select className="form-select " aria-label="Default select example" value={form.selectedWeek} 
            onChange={(e)=>{
              setForm({...form,selectedWeek:e.target.value})
            }}>
                <option value="0" >--Select--</option>
                {(week1ConditionMet) 
                ? (<option value="1">Week 1</option>) 
                : (<option value="1" disabled>Week 1(You are not eligible now!!)</option>)}
                {(week2ConditionMet) 
                ? (<option value="2">Week 2</option>) 
                : (<option value="2" disabled>Week 2(You are not eligible now!!)</option>)}
                {(week3ConditionMet) 
                ? (<option value="3">Week 3</option>) 
                : (<option value="3" disabled>Week 3(You are not eligible now!!)</option>)}
                {(week4ConditionMet) 
                ? (<option value="4">Week 4</option>) 
                : (<option value="4" disabled>Week 4(You are not eligible now!!)</option>)}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col " >Submit your links here:</label>
          <div className="col ">
            {/* <textarea className="form-control" value={form.links} onChange={captureLinks}></textarea> */}
            <textarea className="form-control" value={form.links} 
            onChange={(e)=>{
              setForm({...form,links:e.target.value})
            }}></textarea>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col " >Upload your files here:</label>
          <div className="col ">
            <input className="form-control" type="file" name="weeklyFile"  
            onChange={(e)=>{
              setForm({...form,files:e.target.files[0]})
            }}/>
            {/* <input className="form-control" type="file" name="files[]" id="formFileMultiple" multiple onChange={captureFiles}/> */}
            {/* <Form action="/upload" method="POST" encType="multipart/form-data">
                <Form.Group className="mb-3">
                {/* <Form.Label>Choose files</Form.Label> */}
                    {/* <Form.Control type="file" name="fileUploads[]" multiple onChange={captureFiles} />
                </Form.Group>
                {/* <Button type="submit" variant="primary">Upload Files</Button> */}
            {/* </Form>           */} 
          </div>
        </div>
        <div className="row mb-3">
          <label className="col " >Your description/comments about the submission:</label>
          <div className="col ">
            <textarea className="form-control" value={form.comments} 
            onChange={(e)=>{
              setForm({...form,comments:e.target.value})
            }}></textarea>
          </div>
        </div>
        <br/>
        <div className="d-grid col-4 mx-auto">
          {/* <button type="submit" className="btn btn-primary" >Log in</button> */}
          <button type="submit" className="btn btn-primary d-grid mx-auto" >Add Submission</button>
        </div>
      </form>

    </div>
  )
}

export default WeeklySubmission

//---------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import { Button, Form } from 'react-bootstrap';

// const BasicFileUpload = () => {
//   const [files, setFiles] = useState([]);

//   const handleFileChange = (event) => {
//     setFiles(event.target.files);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     Array.from(files).forEach((file) => {
//       formData.append('files[]', file);
//     });

//     try {
//       const response = await fetch('/upload', {
//         method: 'POST',
//         body: formData,
//       });
//       if (!response.ok) throw new Error('Network response was not ok.');
//       alert('Files uploaded successfully.');
//     } catch (error) {
//       alert(`Upload failed: ${error.message}`);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Upload Multiple Files</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Choose files</Form.Label>
//           <Form.Control type="file" multiple onChange={handleFileChange} />
//         </Form.Group>
//         <Button type="submit" variant="primary">
//           Upload Files
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default BasicFileUpload;
