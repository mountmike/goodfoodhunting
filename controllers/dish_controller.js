const express = require("express");
const router = express.Router();
const db = require("./../db")
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

// middleware for checking if logged in session (ensureLoggedIn)



router.get(["/", "", "/home"], (req, res) => {
    console.log(req.user);
    let sql = "select * from dishes order by id desc;";
    db.query(sql, (err, dbRes) => {
        if (err) {
            console.log(err);
        }
        const dishes = dbRes.rows;
        res.render("home", { dishes, email: req.session.email } )
    }); 
})

router.get("/dishes/new", ensureLoggedIn, (req, res) => {
    res.render("new_dish")
})

// routes is the http method + path
router.post("/dishes", (req, res) => {
    const sql = `insert into dishes (title, image_url, venue, city, postDateTime, user_id) values ('${req.body.title}', '${req.body.image_url}', '${req.body.venue}', '${req.body.city}', CURRENT_TIMESTAMP, ${res.locals.currentUser.id});`;
    db.query(sql, (err, dbRes) => {
        res.redirect("/")
    })
})

router.get("/dishes/:dishID/edit", ensureLoggedIn, (req, res) => {
    let dishID = req.params.dishID;
    let sql = `select * from dishes where id = ${dishID};`;
    db.query(sql, (err, dbRes) => {
        const dish = dbRes.rows[0];
        res.render("edit_dish", { dish })
    });
})

router.put("/dishes/:dishID",  (req, res) => {
    const sql = `update dishes set title = '${req.body.title}', image_url = '${req.body.image_url}', venue = '${req.body.venue}', city = '${req.body.city}' where id = ${req.body.dishID};`;
    console.log("sql:", sql);
    db.query(sql, (err, dbRes) => {
        console.log(err);
        res.redirect(`/dishes/${req.params.dishID}`)
    })
})

// new DELETE method override
router.delete("/dishes",  (req, res) => {
    const sql = `DELETE FROM dishes WHERE id = ${req.body.dish_id}`
    db.query(sql, (err, dbResponse) => {
        res.redirect("/")
    })
})

// old POST delete
// router.post("/delete_dish", (req, res) => {
//     const sql = `DELETE FROM dishes WHERE id = ${req.body.dish_id}`
//     db.query(sql, (err, dbResponse) => {
//         res.redirect("/")
//     })
// })

router.get("/dishes/:dishID", ensureLoggedIn,  (req, res) => {
    let dishID = req.params.dishID;
    let sql = `select * from dishes where id = $1`;
    db.query(sql, [dishID], (err, dbRes) => {
        const dish = dbRes.rows[0];
        res.render("dish", { dish })
    });
})


router.get("/search", ensureLoggedIn, (req, res) => {
    let dishName = req.query.name;
    let sql = `select * from dishes where title ilike '%${dishName}%';`;
    console.log(sql);
    db.query(sql, (err, dbRes) => {
        if (err) {
            console.log(err);
        }
        const dishes = dbRes.rows;
        res.render("search_results", { dishes } )
    })
})

module.exports = router