const { Client } = require("pg") // need to save to database 

const bcrypt = require('bcrypt');

const db = new Client({
    database: "planets_app",
})

db.connect()

const email = "micktharratt@hotmail.com";
const plainTextPassword = "123";

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
        const sql = `
        INSERT INTO users (email, password_digest)
        VALUES ('${email}', '${digestedPassword}');
        `
        db.query(sql, (err, dbResponse) => {
            console.log(err);
            db.end()
        })
    })
})