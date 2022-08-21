import express from 'express';
import dotenv from 'dotenv';
export const router = express.Router();

// Pitää importata vaikkei sitä suoraan käytetäkään
import db_connection from '../connection.js';

import {Activity} from '../../models/activity.js';

dotenv.config()

// export function add_activity() {
//     return Activity.save()
//         .then((result) => {
//             return result;
//         })
//         .catch((err) => {
//             return err;
//         })
// }
export function add_activity(request) {
    const addActivity = new Activity({
        activity: request.body.activity
    })

    return addActivity.save().then(result => {
        console.log(result)
        return "wau toimii"
    }).catch(err => {
        console.log("From Database - add_activity: " + err.message)
        return "ei toimi :("
    });
}