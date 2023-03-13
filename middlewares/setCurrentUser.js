const db = require("./../db")

function setCurrentUser(req, res, next) {

    const { userID } = req.session
    res.locals.currentUser = {}

    if (userID) {
        //user is logged in - setup currentUser obj
        const sql = `SELECT * from users where id = ${userID};`
        db.query(sql, (err, dbResponse) => {
            if (err) {
                console.log(err);
            } else {
                res.locals.currentUser = dbResponse.rows[0];
                next();
            }
        })
    } else {
        next()
    }  
}

module.exports = setCurrentUser