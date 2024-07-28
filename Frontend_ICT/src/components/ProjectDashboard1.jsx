import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import WeeklySubmission from './WeeklySubmission'
import axios from 'axios';
import FinalProjectSubmission from './FinalProjectSubmission';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import VivaVoce from './VivaVoce';
import DiscussionForum from './DiscussionForum';
import References from './References';
import Grades from './Grades';

const ProjectDashboard1 = () => {
  const [isConditionMet, setIsConditionMet] = useState(true);
  // const currentDate = new Date(); // Create a new Date object with the current date/time
  // const string_currentDate = new Date().toLocaleDateString();
  // const navigate = useNavigate(); // Initialize navigate
  const location = useLocation();
  const { s_id } = location.state || {};
  const [student,setStudent]=useState({
    sp_id:'',
    sp_name:'',
    p_id:'',
    p_name:'',
    // start_date:''
    start_date:''
})

  useEffect(()=>{
    axios.get(`http://localhost:5000/princy/studentswithprojects/${s_id}`)
    .then((res)=>{
        console.log(`Axios res.data(studentswithprojects) in ProjectDashboard1 is - `)
        console.log(res.data[0])
        setStudent({
          sp_id:res.data[0].sp_id,
          sp_name:res.data[0].sp_name,
          p_id:res.data[0].p_id,
          p_name:res.data[0].p_name,
          start_date:new Date(res.data[0].start_date).toLocaleDateString(),
          // start_date:res.data[0].start_date,
      })
        console.log('Student data is - ')
        console.log(student)
    })
        const string_currentDate = new Date().toLocaleDateString();
        const string_start_date = student.start_date;
        console.log(`string_currentDate  is ${string_currentDate}`);
        console.log(`string_start_date  is ${string_start_date}`);
      
        const date_currentDate = new Date(string_currentDate)
        const date_start_date = new Date(string_start_date)
        console.log(`date_currentDate  is ${date_currentDate}`);
        console.log(`date_start_date  is ${date_start_date}`);
      
        const week4_date = new Date(string_start_date)
        week4_date.setDate(week4_date.getDate() + 28);
        console.log(`week4_date  is ${week4_date}`);
        setIsConditionMet(date_currentDate >= week4_date)
        console.log(`isConditionMet is ${isConditionMet}`)
  },[s_id,student.start_date])

  return (
    <div>
        <Navbar/>
        <br/>
        <h2 className="text-primary py-2 text-center"><b><u>THE PROJECT DASHBOARD</u></b></h2>
        <h4 className="py-2 text-center"><u><i>Hi</i> <b>{student.sp_name},{student.p_id}</b>,  <i>You have started on : </i><b>{student.start_date}</b> </u></h4>
        <div class="row">
        <div class="d-flex ">
          <div class="col-2 ">
          {/* <br/> */}
            <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              {/* <button><b><u>Logout</u></b></button><br/><br/> */}
              <button class="nav-link navLink active" id="v-pills-pjtDoc-tab" data-bs-toggle="pill" data-bs-target="#v-pills-pjtDoc" type="button" role="tab" aria-controls="v-pills-pjtDoc" aria-selected="true">PROJECT OVERVIEW DOCUMENT</button>
              -----------------
              <button class="nav-link navLink " id="v-pills-reference-tab" data-bs-toggle="pill" data-bs-target="#v-pills-reference" type="button" role="tab" aria-controls="v-pills-reference" aria-selected="false">REFERENCE MATERIALS</button>
              -----------------
              <button class="nav-link navLink" id="v-pills-weekly-tab" data-bs-toggle="pill" data-bs-target="#v-pills-weekly" type="button" role="tab" aria-controls="v-pills-weekly" aria-selected="false">WEEKLY SUBMISSION</button>
              -----------------
              <button class="nav-link navLink" id="v-pills-discussion-tab" data-bs-toggle="pill" data-bs-target="#v-pills-discussion" type="button" role="tab" aria-controls="v-pills-discussion" aria-selected="false">DISCUSSION FORUM</button>              
              -----------------
              <button class="nav-link navLink" id="v-pills-grades-tab" data-bs-toggle="pill" data-bs-target="#v-pills-grades" type="button" role="tab" aria-controls="v-pills-grades" aria-selected="false">MY GRADES</button>              
              -----------------
              {(isConditionMet) ? (
              <button class="nav-link navLink" id="v-pills-final-tab" data-bs-toggle="pill" data-bs-target="#v-pills-final" type="button" role="tab" aria-controls="v-pills-final" aria-selected="false" >FINAL PROJECT SUBMISSION</button>
              ):(<div>
              <button class="nav-link navLink" id="v-pills-final-tab" data-bs-toggle="pill" data-bs-target="#v-pills-final" type="button" role="tab" aria-controls="v-pills-final" aria-selected="false" disabled>FINAL PROJECT SUBMISSION</button>
              (You are not eligible now!!!)
              </div>)}
              -----------------
              {(isConditionMet) ? (
              <button class="nav-link navLink" id="v-pills-viva-tab" data-bs-toggle="pill" data-bs-target="#v-pills-viva" type="button" role="tab" aria-controls="v-pills-viva" aria-selected="false" >VIVA VOCE</button>
              ):(<div>
              <button class="nav-link navLink" id="v-pills-viva-tab" data-bs-toggle="pill" data-bs-target="#v-pills-viva" type="button" role="tab" aria-controls="v-pills-viva" aria-selected="false" disabled>VIVA VOCE</button>
              (You are not eligible now!!!)
              </div>)}
              -----------------
              <br/><br/>
              <Link to='/'><button><b><u>Logout</u></b></button></Link>
              </div>
          </div>

          <div class="col-0.25">
            <div class="d-flex" style={{height: 800}}>
                <div class="vr"></div>
            </div>
          </div>

          <div class="col-9 ms-5">
            <div class="tab-content" id="v-pills-tabContent">
              <div class="tab-pane fade show active" id="v-pills-pjtDoc" role="tabpanel" aria-labelledby="v-pills-pjtDoc-tab" tabindex="0"><br/><br/>PROJECT OVERVIEW DOCUMENT...</div>
              <div class="tab-pane fade" id="v-pills-reference" role="tabpanel" aria-labelledby="v-pills-reference-tab" tabindex="0"><br/><br/><References p_id={student.p_id}/></div>
              <div class="tab-pane fade" id="v-pills-weekly" role="tabpanel" aria-labelledby="v-pills-weekly-tab" tabindex="0"><WeeklySubmission s_id={s_id}/></div>
              <div class="tab-pane fade" id="v-pills-discussion" role="tabpanel" aria-labelledby="v-pills-discussion-tab" tabindex="0"><br/><br/><DiscussionForum/></div>
              <div class="tab-pane fade" id="v-pills-grades" role="tabpanel" aria-labelledby="v-pills-grades-tab" tabindex="0"><br/><br/><Grades/></div>
              <div class="tab-pane fade" id="v-pills-final" role="tabpanel" aria-labelledby="v-pills-final-tab" tabindex="0"><FinalProjectSubmission s_id={s_id}/></div>
              <div class="tab-pane fade" id="v-pills-viva" role="tabpanel" aria-labelledby="v-pills-viva-tab" tabindex="0"><br/><br/><VivaVoce/></div>
            </div>
          </div>

          {/* <div class="col-0.25">
            <div class="d-flex" style={{height: 800}}>
                <div class="vr"></div>
            </div>
          </div>

          <div class="col-2.5 ms-5">
            <div className="card h-100">
                <div className="card-body">
                    <p className="card-text"><i><u>Name</u></i><br/> <b>{student.sp_name}</b> </p>
                    <p className="card-text"><i><u>Project</u></i><br/> <b>{student.p_name}</b></p>
                    <p className="card-text"><i><u>Project Start Date</u></i><br/><b>{student.start_date}</b></p>
                </div>
            </div>
            <br/>
            <button><b><u>Logout</u></b></button>

          </div> */}
          </div>
        </div>
    </div>
  )
}

export default ProjectDashboard1