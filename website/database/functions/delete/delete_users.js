import express from 'express';
import dotenv from 'dotenv';
export const router = express.Router();

// Pitää importata vaikkei sitä suoraan käytetäkään
import db_connection from '../connection.js';

import {UserModel} from '../../models/users.js';

dotenv.config()

export function delete_users(request) {

    return UserModel.deleteMany({username: {$in: request.body.username}})
        .then(result => {
            console.log(result)
            return "kakka"
        }).catch(err => {
            console.log("(From db) ",err.message)
            return "pylly"
        })
}