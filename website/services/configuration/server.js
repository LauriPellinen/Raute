import express from 'express'
import dotenv from 'dotenv'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'

// Routes import
import { router } from "./routes/index.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()

const HOST = '0.0.0.0'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


/**
 *  App Configuration
 */

 app.set("views", path.join(__dirname, "views/pages/"));
 app.set("view engine", "ejs");
 app.use(express.static(path.join(__dirname, "public")));


 /**
 *   Routes Definitions
*/
app.use(router);


/**
 *  SERVER
 */
 app.listen(process.env.PORT, HOST);
console.log(`Listening on port:${process.env.PORT}`);







