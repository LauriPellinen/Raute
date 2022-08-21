import express from 'express';
import dotenv from 'dotenv';
export const router = express.Router();

// Pitää importata vaikkei sitä suoraan käytetäkään
import db_connection from '../connection.js';

import {UserModel} from '../../models/users.js';

export function add_user(request) {
    return UserModel.findOne({ username: request.body.username}).exec()
    .then(user => {
        if (user){
            return "user already in database"
        } else {

            const newUser = new UserModel({
                username: request.body.username,
                hash: request.body.hash,
                salt: request.body.salt,
                admin: request.body.admin
            });
        
            newUser.save().then((user) => { 
                console.log("(From db) User added to db.")
                return "kakka"//res.status(200).send({message: "account created", user: user})
            }).catch(err => {
                console.log("From db) ", err.message)
                return "pylly"//res.status(500).send({message: "failed to create account", error: err})
            })

        }
    });
}
// router.post("/configuration/users/add", isAdmin, (req, res) => {

//     const saltHash = genPassword(req.body.pw);

//     const salt = saltHash.salt;
//     const hash = saltHash.hash;

//     let addUser = axios({
//         method: "post",
//         data:{
//             username: req.body.username,
//             hash: hash,
//             salt: salt
//         },
//         url: process.env.ACCOUNT + 'add'
//     });

//     return addUser.then(response => {
//         console.log(response.data)
//         return res.status(200).send({"message": "account created"})
//     }).catch(err => {
//         console.log(err)
//         return res.status(500).send("internal server error")
//     });
// })

// var newUser = new Users({
//     _id: new mongoose.Types.ObjectId(),
//     username: req.body.username,
//     password: hash,
//     is_admin: req.body.is_admin

// });

// newUser.save()
//     .then((result) => {
//         res.status(200).send("Created new user: " + newUser["username"]);
//     })
//     .catch((err) => res.status(500).send("internal server error"));