import { genPassword } from '../gateway/lib/passwordUtils.js'
import axios from 'axios'



const saltHash = genPassword("admin")

const salt = saltHash.salt;
const hash = saltHash.hash;

 // Send HTTP-POST form to Account container
let addUser = axios({
    method: "post",
    data: {
        uname: "admin",
        hash: hash,
        salt: salt,
        admin: true
    },
    url: process.env.ACCOUNT + 'add'
});

// Send HTTP-POST request to Account-container
addUser.then(response => {
    console.log(response.data)
    console.log("success - Admin user created")
}).catch(err => {
    console.log("failed - User already in database")
});


