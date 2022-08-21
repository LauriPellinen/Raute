import express from 'express';
import dotenv from 'dotenv'
export const router = express.Router();

dotenv.config()



/**
* -------------- GET ROUTES ----------------
* "/"
* "/statistics"
*/
router.get("/", (req, res) => {
    
    
    const html = res.render("base", {
        url: "/",
        admin: req.body.admin
    });
    return res.send(html);
})

router.get("/statistics", (req, res) => {

    const html = res.render("base", {
        url: "/statistics",
        admin: req.body.admin
    });
    return res.send(html);
})



