import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import passport from "passport";
import { genPassword } from "../lib/passwordUtils.js";

export const router = express.Router();

dotenv.config();


/**
* -------------- GET ROUTES ----------------
* "/users/login"
* "/users/get_users"
*/

router.get("/users/login", (req, res) => {
  if (req.user) {
    // redirect to '/'
    console.log(req.user);
    return res.redirect("/");
  } else {
    // Render login.html
    return res.render("login");
  }
});

// Haetaan kaikki käyttäjät.
// Mm. käytetään User-sivulla hakemaan käyttäjät tauluun
router.get("/users/get_users", (req, res) => {
  let get_users = axios({
    method: "get",
    url: process.env.ACCOUNT + "get_users",
  });

  return get_users
    .then((response) => {
      return res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send("internal server error");
    });
});




/**
* -------------- POST ROUTES ----------------
* "/users/login"
* "/users/logout"
* "/users/add"
* "/users/delete_users"
*/


router.post(
  "/users/login",
  passport.authenticate("local", {
    failureMessage: "Unauthorized",
    successRedirect: "/",
  })
);


router.get("/users/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});


router.post("/users/add", (req, res) => {
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  // Send HTTP-GET request to Monitoring-container
  let addUser = axios({
    method: "post",
    data: {
      username: req.body.username,
      hash: hash,
      salt: salt,
      admin: req.body.admin,
    },
    url: process.env.ACCOUNT + "add",
  })
    .then(() => console.log("Log successful"))
    .catch((err) => console.log(err));

  // Send HTTP-GET request to Monitoring-container
  return addUser
    .then(() => {
      console.log("Success from account");
      return res.status(200).send({ message: "Added user to database" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("internal server error");
    });
});





router.post("/users/delete_users", (req, res) => {

  let deleted_user = axios({
    method: "post",
    data: { username: req.body.username },
    url: process.env.ACCOUNT + "delete_users",
  });

  return deleted_user
    .then((response) => {
      return res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log("(From gateway) ", err.message);
      return res.status(500).send("internal server error");
    });
});


