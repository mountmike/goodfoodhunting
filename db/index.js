const { Pool } = require("pg")

const config = {
    dev: {
        database: "goodfoodhunting"
    },
    prod: {
        connectionString: process.env.DATABASE_URL
    }
}

module.exports = new Pool(process.env.DATABASE_URL ? config.prod : config.dev)