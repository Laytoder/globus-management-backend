const { app } = require('./server')
const db = require('./database/db')
const log = require('debug')('app:run')
const patientController = require('./controllers/patient')
const docCotroller = require('./controllers/documentLinkedList')

async function run() {
    //start the server
    const PORT = 5000;
    app.listen(PORT, () => {
        log(`Listening on port ${PORT}...`)
    })
    //sync to database
    await db.sync()

    const id = await patientController.createPatientAndGetId({
        name: 'Anupam Ghosal',
        bedId: '1234'
    })

    await docCotroller.addDocToPatientById(id, {
        name: 'Face Sheet',
        purpose: 'registration'
    })

    await docCotroller.addDocToPatientById(id, {
        name: 'Face Sheet 2',
        purpose: 'registration'
    })

    const currentDoc = await docCotroller.getPatientCurrentDocById(id)

    log(currentDoc)

    const nextDoc = await docCotroller.getPatientNextDocById(id)

    log(nextDoc)

    const prevDoc = await docCotroller.getPatientPrevDocById(id)

    log(prevDoc)
}

run()