const log = require('debug')('app:seedData')
const patientController = require('../src/controllers/patient')
const docCotroller = require('../src/controllers/documentLinkedList')

async function test() {
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

    await docCotroller.updatePatientCurrentDocById(id, {
        some: 'hello'
    });

    const currentDoc2 = await docCotroller.getPatientCurrentDocById(id)

    log(currentDoc2)
}

module.exports = {
    test
}