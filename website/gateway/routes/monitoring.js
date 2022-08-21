import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
export const router = express.Router();
import { isAuth } from "../lib/protected.js"

dotenv.config()


/**
* -------------- GET ROUTES ----------------
* "/"
* "/statistics"
*/

router.get("/", isAuth, (req, res) => {
    

// Send HTTP-GET request to Monitoring-container
    let getMonitoring = axios({
        method: "get",
        data: {admin: req.user.admin},
        url: process.env.MONITORING
    });

// response.data = monitoring.ejs
    return getMonitoring.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("Error from GET /monitoring ", err.message)
        return res.status(500).send("internal server error")
    });
})

router.get("/statistics", isAuth, (req, res) => {


    let getMonitoring = axios({
        method: "get",
        data: {admin: req.user.admin},
        url: process.env.MONITORING + 'statistics'
    });

    return getMonitoring.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("Error from GET /statistics ", err.message)
        return res.status(500).send("internal server error")
    });
})




