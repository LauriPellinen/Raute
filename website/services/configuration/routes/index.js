import express from 'express';
import dotenv from 'dotenv'
export const router = express.Router();

dotenv.config()


/**
* -------------- GET ROUTES ----------------
* "/"
* "/users"
*/

router.get("/", (req, res) => {

    const html = res.render("base", {
        url: "/configuration",
        admin: req.body.admin
    });
    return res.send(html);
})

router.get("/users", (req, res) => {

    const html = res.render("base", {
        url: "/configuration/users",
        admin: req.body.admin
    });
    return res.send(html);
})

