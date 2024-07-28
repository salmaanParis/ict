const express = require('express')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
// const projectData = require('../model/projectData')
const availableProjectData = require('../model/availableProjectData')
const studentCourseData = require('../model/studentCourseData')
// const studentWeeklySubmissionData = require('../model/studentWeeklySubmissionData')
const studentsWithProjectData = require('../model/studentsWithProjectData')
const weeklySubmissionData = require('../model/weeklySubmissionData')
const projectSubmissionData = require('../model/projectSubmissionData')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

router.get('/studentCourse/:student',async(req,res)=>{
    try{
        const student = req.params.student
        console.log('The student id is - ')
        console.log(student)
        const data = await studentCourseData.find({s_id:student})
        res.status(200).send(data[0])
        console.log(data[0])
    } catch (error) {
        res.status(404).send(err)
    }
})
// router.get('/projects/:course',async(req,res)=>{
//     try{
//         const {course} = req.params
//         console.log(`Course is ${course}` )
//         const data = await projectData.find({course:course})
//         res.status(200).send(data)
//         // console.log(data)
//     } catch (error) {
//         res.status(404).send(error)
//     }
// })
router.get('/availableProjects/:course',async(req,res)=>{
    try{
        const {course} = req.params
        console.log(`Course is ${course}` )
        const data = await availableProjectData.find({course:course})
        res.status(200).send(data)
        // console.log(data)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/studentswithprojects/:student',async(req,res)=>{
    try{
        const {student} = req.params
        console.log(`Student is ${student}` )
        const data = await studentsWithProjectData.find({sp_id:student})
        res.status(200).send(data)
        console.log(data)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/uploadWeek/:student', upload.single('files'), async function (req, res, next) {
    // req.file is the `weeklyFile` file
    // req.body will hold the text fields, if there were any
    const student = req.params.student
    try{
        console.log(req.body)
        var weekItem = {
            s_id:student,
            week:req.body.selectedWeek,
            links:req.body.links,
            files:req.file.filename,
            comments:req.body.comments,
        }
        var newWeek = new weeklySubmissionData(weekItem)
        await newWeek.save()
        res.status(201).send({message:'Week Added!!!'})
    }catch(e){
        console.log(e)
    }
    // console.log('req.body is-')
    // console.log(req.body)
    // const file = req.file
    // if(!file){
    //     console.log('Error in attatching file')
    // }
    // res.send(file)
  })

  router.post('/uploadProject/:student', upload.single('files'), async function (req, res, next) {
    // req.file is the `weeklyFile` file
    // req.body will hold the text fields, if there were any
    const student = req.params.student
    try{
        console.log(req.body)
        var projectItem = {
            s_id:student,
            links:req.body.links,
            files:req.file.filename,
            comments:req.body.comments,
        }
        var newProject = new projectSubmissionData(projectItem)
        await newProject.save()
        res.status(201).send({message:'Project submission Added!!!'})
    }catch(e){
        console.log(e)
    }
    // console.log('req.body is-')
    // console.log(req.body)
    // const file = req.file
    // if(!file){
    //     console.log('Error in attatching file')
    // }
    // res.send(file)
  })

  router.post('/postStdPjt', async function (req, res, next) {
    try{
        console.log(req.body)
        var item = {
            sp_id:req.body.sp_id,
            sp_name:req.body.sp_name,
            p_id:req.body.p_id,
            p_name:req.body.p_name,
        }
        var newItem = new studentsWithProjectData(item)
        await newItem.save()
        res.status(201).send({message:'new studentsWithProject Added!!!'})
    }catch(e){
        console.log(e)
    }
  })

module.exports = router