const express = require('express');
const JobsService = require('../services/jobs')
const UsersService = require('../services/users')

const job = {         
    jobName: "",
    state: "OPEN, TAKEN",
    user: "username",
    jobbey: "username",
    description: "",
    tasks: ["task1", "task2"],
    category: ""    
}

function jobsAPI(app){
    const router = express.Router();
    const jobsService = new JobsService
    const usersService = new UsersService
    
    app.use("/api/jobs", router)
    router.get("/", async function(req, res, next) {
        const { tags } = req.query

        try {
            res.status(200).json({
                data: await jobsService.getJobs({tags}),
                message: 'Lista de usuarios enviada.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.get("/:jobId", async function(req, res, next) {
        const  jobId = req.params.jobId

        try {
            const job = await jobsService.getJob(jobId)
            res.status(200).json({
                data: job,
                message: 'Datos de usuario.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.post("/", async function(req, res, next) {
        const { body: job } = req        
        let username = {}
        username.username = job.user
        const user = await usersService.getUserBy(username)
        
        let newData = {}
        try {
            const createdJobId = await jobsService.createJob({job})
            user[0].historyPerson.push(createdJobId)
            newData.historyPerson = user[0].historyPerson
            
            await usersService.updateUser(user[0]._id, newData)
            res.status(201).json({
                data: createdJobId,
                message: 'Usuario creado.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.put("/:jobname", async function(req, res, next) {
        const { body: job } = req
        const { jobname } = req.params

        try {
            const updatedJobId = await jobsService.updateJob({jobname, job})
            res.status(200).json({
                data: updatedJobId,
                message: 'Usuario actualizado.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.delete("/:jobname", async function(req, res, next) {
        const { jobname } = req.params

        try {
            const deletedJobId  = await jobsService.deleteJob({jobname})
            res.status(200).json({
                data: deletedJobId,
                message: 'Usuario eliminado.'
            })
        } catch (error) {
            next(error);
        }
    })  
    
    //--------

    router.get("/opens/:roleHistory", async function(req, res, next){
        // :roleHistory = "JOBBEY"  "PERSON"
        const { jobname } = req.params
        console.log("hi");
        console.log(req.params);

        try {
            const jobs = await jobsService.getOpens()
            console.log(jobs);
            

            res.status(200).json({
                data: jobs,
                message: 'Datos de usuario.'
            })
        } catch (error) {
            next(error);
        }
    })
   
    router.put("/:jobId/:jobbeyuser", async function (req, res, next) {
        const jobId = req.params.jobId
        const jobbeyuser = req.params.jobbeyuser

        console.log("hi");
        const user = await usersService.getUserBy(jobbeyuser)
        let newData = {}
        let dataJob = {}

        
        try {
            user[0].historyJobbey.push(jobId)
            newData.historyJobbey = user[0].historyJobbey
            dataJob.jobbey = jobbeyuser
            
            const updatedJobId = await jobsService.updateJob(jobId, dataJob)
            await usersService.updateUser(user[0]._id, newData)
            res.status(200).json({
                data: updatedJobId,
                message: 'Usuario actualizado.'
            })
        } catch (error) {
            next(error);
        }
    })
}

module.exports = jobsAPI