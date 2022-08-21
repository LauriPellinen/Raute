import express from 'express';
import dotenv from 'dotenv';
export const router = express.Router();

// Pitää importata vaikkei sitä suoraan käytetäkään
import db_connection from '../connection.js';

import {UserModel} from '../../models/users.js';

dotenv.config()

export function fetch_users() {
    return UserModel.find()
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err;
        })
}