import express from 'express';
import dotenv from 'dotenv'
import {fetch_users} from '../database/functions/fetch/fetch_users.js'
import { add_user } from '../database/functions/add/add_user.js';
import { delete_users } from '../database/functions/delete/delete_users.js';

export const router = express.Router();
dotenv.config()


/**
* -------------- GET ROUTES ----------------
* "/get_users"
*/




router.get("/get_users", (req, res) => {
    
    return fetch_users().then((result) => {
            return res.status(200).send(result)
        }).catch(err => {
            console.log("Error from GET /get_users \n", err.message)
            return res.status(500).send("failed to get users")
        })
})


/**
* -------------- POST ROUTES ----------------
* "/add"
* "/delete_users"
*/


router.post("/add", (req, res) => {
    
    add_user(req).then((result) => {
        return res.status(200).send(result)
    }).catch(err => {
        console.log("Error from POST /add \n", err.message)
        return res.status(500).send("failed to get users")
    })
})


router.post("/delete_users", (req, res) => {

    delete_users(req).then((result) => {
        return res.status(200).send(result)
    }).catch(err => {
        console.log("Error from POST /delete_users \n", err.message)
        return res.status(500).send("failed to delete users")
    })
})




