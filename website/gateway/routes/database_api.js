import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import mongoose from 'mongoose';
export const router = express.Router();

// Pitää importata vaikkei sitä suoraan käytetäkään
import db_connection from '../database/functions/connection.js';

import {UserModel} from '../database/models/users.js';
import {Activity} from '../database/models/activity.js';

dotenv.config()



/**
* -------------- GET ROUTES ----------------
* "/database_functions/console/fetch_activity"
* "/database_functions/console/add_activity"
*/


// Haetaan kaikki toiminta joka näytetään vain logi-konsolissa.
router.get("/database_functions/console/fetch_activity", (req, res) => {
    let get_activities = axios({
        method: "get",
        url: process.env.CONSOLE + "fetch_activity"
        // http://account:7004/fetch_activity
    })

    return get_activities.then(response => {
        return res.status(200).send(response.data)
    }).catch(err => {
        console.log(err)
        return res.status(500).send("From Gateway - 'database_api/fetch_activity' : ", err.message)
    });
})

// Lisää toiminta-login.
router.post("/database_functions/console/add_activity", (req, res) => {

    //console.log("This is from database_api.js: " + req.body.activity)
    let addActivity = axios({
        method: "post",
        data:{
            activity: req.body.activity,
        },
        url: process.env.CONSOLE + 'add_activity'
        // http://console:7004/get_users
    })

    return addActivity.then(response => {
        console.log(response.data)
        return res.status(200).send("Activity recorded!")
    }).catch(err => {
        console.log(err)
        return res.status(500).send("From Gateway - 'database_api/add_activity' : ", err.message)
    });
});