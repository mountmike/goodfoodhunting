const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { Pool } = require("pg")
const db = new Pool({
    database: "goodfoodhunting",
})


router.get("/login", (req, res) => {
    res.render("login")
});

router.post("/sessions", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
     
    const sql = `SELECT * from users where email = '${email}';`
    db.query(sql, (err, dbResponse) => {
        if (dbResponse.rows.length === 0) {
            return res.render("login") // no records found, stay at login page
        } else {

            const user = dbResponse.rows[0]

            bcrypt.compare(password, dbResponse.rows[0].password_digest, (err, result) => {
                if (result) {
                    req.session.userID = user.id
                    req.session.email = user.email
                    res.redirect("/")
                } else {
                    res.render("login");
                }
            })
        }
    })
});

router.delete("/sessions", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
});

module.exports = router