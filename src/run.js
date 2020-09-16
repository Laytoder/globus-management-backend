const { app } = require('./server')
const db = require('./database/db')
const log = require('debug')('app:run')
const patientController = require('./controllers/patient')
const docCotroller = require('./controllers/documentLinkedList')

async function run() {
    //start the server
    const PORT = 8000;
    app.listen(PORT, () => {
        log(`Listening on port ${PORT}...`)
    })
    //sync to database
    await db.sync()
}

run()