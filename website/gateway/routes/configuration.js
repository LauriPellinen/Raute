import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
export const router = express.Router();
import { isAdmin } from "../lib/protected.js"


dotenv.config()


/**
* -------------- GET ROUTES ----------------
* "/configuration"
* "/configuration/users"
*/

router.get("/configuration", isAdmin, (req, res) => {

// Send HTTP-GET request to Configuration-container
    let getConfiguration = axios({
        method: "get",
        data: {admin: req.user.admin},
        url: process.env.CONFIGURATION
    })


// response.data = configuration.ejs
    return getConfiguration.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("Error from GET /configuration ", err.message)
        return res.status(500).send("internal server error")
    });
})


router.get("/configuration/users", isAdmin, (req, res) => {

    let getConfiguration = axios({
        method: "get",
        data: {admin: req.user.admin},
        url: process.env.CONFIGURATION + 'users'
    })

    return getConfiguration.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("Error from GET /configuration/users ", err.message)
        return res.status(500).send("internal server error")
    });
})







