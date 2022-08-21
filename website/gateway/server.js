import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import passport from "passport";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

//import axios from "axios";

// Routes import
import { router as monitoringRouter } from "./routes/monitoring.js"
import { router as configurationRouter } from "./routes/configuration.js"
import { router as team2apiRouter } from "./routes/team2api.js"
import { router as database_apiRouter } from "./routes/database_api.js"
import { router as usersRouter } from "./routes/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const HOST = "0.0.0.0";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 * Creates cookie that is valid for 1 day. Means you dont need to relogin every time you visit -
 *  protected routes.
 */

const sessionStore = new MongoStore({
  mongoUrl: process.env.DB_STRING,
  dbName: "Users",
  collection: "sessions",
});

// Use session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60, // Cookie valid for 1 hour
    },
  })
);

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views/pages/"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

/**
 *  Passsport Configuration
 */

import passport_configuration from "./config/passport.js"

passport_configuration()
app.use(passport.initialize());
app.use(passport.session());



/**
 *   Routes Definitions
 */
app.use(monitoringRouter);
app.use(configurationRouter);
app.use(team2apiRouter);
app.use(database_apiRouter);
app.use(usersRouter);





/**
 *  Create default admin user
 */

import axios from 'axios'
import { genPassword } from './lib/passwordUtils.js'

const saltHash = genPassword("admin")

const salt = saltHash.salt;
const hash = saltHash.hash;

 // Send HTTP-POST form to Account container
let addUser = axios({
    method: "post",
    data: {
        username: "admin",
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
    console.log("failed - User already in database:", err.message )
});





/**
 *  SERVER
 */
app.listen(process.env.PORT, HOST);
console.log(`Listening on port:${process.env.PORT}`);
