import express from 'express';
import dotenv from 'dotenv'
import {Activity} from '../database/models/activity.js';
export const router = express.Router();
import {fetch_activity} from '../database/functions/fetch/fetch_activity.js'
import {add_activity} from '../database/functions/add/add_activity.js'

dotenv.config()

/**
* -------------- GET ROUTES ----------------
*
* Everything goes to http://localhost:7004/
* "/add_activity"
* "/fetch_activity"
*/

router.post("/add_activity", (req, res) => {

    return add_activity(req).then((result) => {
        console.log(`Kakka meni läpi hienosti kyllä juu ${result}`)
        return res.status(200).send(result)
        }).catch(err => {
            console.log(err)
            return res.status(500).send("failed to post activity")
        })

})

router.get("/fetch_activity", (req, res) => {
    
    return fetch_activity().then((result) => {
            return res.status(200).send(result)
        }).catch(err => {
            console.log(err)
            return res.status(500).send("failed to get activity")
        })
})