const express = require("express");
const app = express();
const port = process.env.PORT || 8880
const expressLayouts = require("express-ejs-layouts");
const logger = require("./middlewares/logger")
const methodOverride = require("./middlewares/method_override")
const setCurrentUser = require("./middlewares/setCurrentUser")
const dishController = require("./controllers/dish_controller")
const userController = require("./controllers/user_controller")
const sessionController = require("./controllers/session_controller")
const session = require("express-session")
const db = require("./db")



// session setup



// http methods = get post put patch delete`
//
// Create  |  Post
// Read    |  Get
// Update  |  Put/Patch
// Destroy |  Delete

// MVC model view controllers - separation of concerns 
// resources that we share: dishes (db), users, comments, venues

// configs
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));

// parses the raw request body (POST) and turns it into objec accessible at req.body
app.use(express.urlencoded({extended: true}))


//// middlewares exported to subfolder
// method override
app.use(methodOverride)
// inserting a bit of middleware (callback)
// app.use(logger)

app.use(session({
    secret: process.env.SESSION_SECRET || 'Godogsgo',
    resave: false,
    saveUninitialized: true,
}))




// I want to see current user in all view pages
app.use(setCurrentUser) 

function viewHelpers(req, res, next) {
    res.locals.isLoggedIn = () => {
        if (req.session.userID) {
            return true
        } else {
            return false
        }
    }
    next()
}
app.use(viewHelpers);

app.use("/", sessionController)
app.use("/", dishController)
app.use("/",  userController)

app.listen(port, () => {
    console.log(`now listening on ${port}`);
})