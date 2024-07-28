import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import StudentDashboard from './components/StudentDashboard'
import WeeklySubmission from './components/WeeklySubmission'
import ProjectDashboard1 from './components/ProjectDashboard1'
import FinalProjectSubmission from './components/FinalProjectSubmission'
import Login2 from './components/Login'
import Signup from './components/Signup'
import References from './components/References'
import VivaVoce from './components/VivaVoce'
import DiscussionForum from './components/DiscussionForum'
import ProjectDetails from './components/ProjectDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login2 />}></Route>
      <Route path="/signup" element={<Signup />} ></Route>
      <Route path='/StudentDashboard' element={<StudentDashboard/>}></Route>
      <Route path='/projectDetails/:id' element={<ProjectDetails />}></Route>
      <Route path='ProjectDashboard1' element={<ProjectDashboard1 />}></Route>
      <Route path='/references' element={<References />}></Route>
      <Route path='/WeeklySubmission' element={<WeeklySubmission />}></Route>
      <Route path='/viva' element={<VivaVoce />}></Route>
      <Route path='/discussion' element={<DiscussionForum />}></Route>
      <Route path='/FinalProjectSubmission' element={<FinalProjectSubmission/>}></Route>

    </Routes>
    </>
  )
}

export default App
