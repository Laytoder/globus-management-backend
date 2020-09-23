const { app } = require('./server')
const db = require('./database/db')
const log = require('debug')('app:run')
const { test } = require('../scripts/testScript')

async function run() {
    //start the server
    const PORT = 8000;
    app.listen(PORT, () => {
        log(`Listening on port ${PORT}...`)
    })
    //sync to database
    await db.sync()

    await test()
}

run()