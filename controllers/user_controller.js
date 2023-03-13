const express = require("express");
const router = express.Router();
const db = require("./../db")
const bcrypt = require('bcrypt');

/*

router.get("/users");  // List of users
router.post("/users"); // create user
router.delete("/users/:id"); // delete user
router.put("/users/:id"); // update user
router.get("/users/new"); // new user FORM
router.get("/users/:id/edit"); // edit user FORM
router.get("/users/:id"); // view details of one user

*/

router.get("/new", (req, res) => {
    res.render("new_user", { title: "Create Account", layout: "layout_login" } )
});

router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, digestedPassword) => {
            const sql = `INSERT into users (email, password_digest) VALUES ($1, $2);`
            const values = [email, digestedPassword]
            db.query(sql, values, (err, dbResponse) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/login")
                }
            })
        })
    })
});


module.exports = router