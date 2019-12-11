const express = require('express');
const UsersService = require('../services/users')
const JobsService = require('../services/jobs')

const user = {
    username: "",
    firstName: "",
    lastName: "",
    description: "",
    historyJobbey: ["id1", "id2"],
    historyPerson: ["id1", "id2"],
    scoreJobbe: 5,
    scoreUser: 5
}

function usersAPI(app){
    const router = express.Router();
    const usersService = new UsersService
    const jobsService = new JobsService
    
    app.use("/api/users", router)
    router.get("/", async function(req, res, next) {
        const { tags } = req.query

        try {
            res.status(200).json({
                data: await usersService.getUsers({tags}),
                message: 'Lista de usuarios enviada.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.get("/:username", async function(req, res, next) {
        const { username }  = req.params

        try {
            const user = await usersService.getUserBy({username})
            res.status(200).json({
                data: user[0],
                message: 'Datos de usuario.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.post("/", async function(req, res, next) {
        const { body: user } = req

        try {
            const createdUserId = await usersService.createUser({user})
            res.status(201).json({
                data: createdUserId,
                message: 'Usuario creado.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.put("/:username", async function(req, res, next) {
        const { body: user } = req
        const { username } = req.params

        try {
            const updatedUserId = await usersService.updateUser({username, user})
            res.status(200).json({
                data: updatedUserId,
                message: 'Usuario actualizado.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.delete("/:username", async function(req, res, next) {
        const { username } = req.params

        try {
            const deletedUserId  = await usersService.deleteUser({username})
            res.status(200).json({
                data: deletedUserId,
                message: 'Usuario eliminado.'
            })
        } catch (error) {
            next(error);
        }
    })  
    
    //--------

    router.get("/:username/:roleHistory", async function(req, res, next){
        // :roleHistory = "JOBBEY"  "PERSON"
        const username = req.params.username
        const rol = req.params.roleHistory

        console.log(username);
        
        try {
            const user = await usersService.getUserBy({username})
            console.log(user);
            
            let hist = []
            if(rol === "JOBBEY"){
                hist = user[0].historyJobbey
            }else if(rol === "PERSON"){
                hist = user[0].historyPerson
            }            

            res.status(200).json({
                data: hist,
                message: 'Datos de usuario.'
            })
        } catch (error) {
            next(error);
        }
    })    
}

module.exports = usersAPI