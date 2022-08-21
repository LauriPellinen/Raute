import LocalStrategy from "passport-local"
import passport from "passport"
import axios from "axios"
import { validPassword } from "../lib/passwordUtils.js"

import {UserModel} from '../database/models/users.js';

export default function passport_configuration(){
    const customFields = {
        usernameField: 'uname',
        passwordField: 'pw'
    };
    
    
    // User verification callback
    const verifyCallback = (username, password, done) => {
    
        // Find user in database
        UserModel.findOne({ username: username })
                .then((user) =>{
    
                    // User not found -> false
                    if (!user) { return done(null, false) }
    
                    // User found but is password valid?
                    const isValid = validPassword(password, user.hash, user.salt);
    
                    // If password is valid return user else return false
                    if (isValid) {


                        // Logataan toiminta
                        axios({
                            method: "post",
                            data: {
                                activity: `User ~"${username}"~ logged in.`
                            },
                            url: process.env.CONSOLE + 'add_activity'
                        }).then(() => console.log("wau, my name is cristopher walken"))
                        .catch((err) => console.log(err))

                        
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                })
    }
    
    const strategy = new LocalStrategy(customFields, verifyCallback);
    
    passport.use(strategy)
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((userId, done) => {
        UserModel.findById(userId)
            .then((user) => {
                done(null, user);
            })
            .catch(err => done(err))
    });
    
}

