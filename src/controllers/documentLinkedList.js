const { DocumentLinkedList } = require('../database/models/documentLinkedList')
const log = require('debug')('app:controllers/documentLinkedList')

const { DOCUMENT_DOES_NOT_EXIST } = require('../config/constants')
const patientController = require('./patient')

async function addDocumentToPatient(patient, doc) {

    if (patient == null) {
        log('Adding document to patient: patient value is null')
        throw 'Adding document to patient: patient value is null'
    }
    if (patient.getName() == null) {
        log('Adding document to patient: patient not created(name does not exist)')
        throw 'Adding document to patient: patient not created(name does not exist)'
    }
    if (patient.getBedId() == null) {
        log('Adding document to patient: patient not created(name does not exist)')
        throw 'Adding document to patient: patient not created(name does not exist)'
    }
    if (patient.getId() == null) {
        log('Adding document to patient: patient not created(id does not exist)')
        throw 'Adding document to patient: patient not created(id does not exist)'
    }
    if (doc == null) {
        log('Adding document to patient: doc value is null')
        throw 'Adding document to patient: doc value is null'
    }

    const docList = new DocumentLinkedList(patient)

    try {
        await docList.add(doc)
    } catch (e) {
        log(e)
        throw e
    }

    log('Document added to patient')
}

async function addDocToPatientById(id, doc) {

    if (id == null) {
        log('Adding document to patient by id: id value is null')
        throw 'Adding document to patient by id: id value is null'
    }

    if (doc == null) {
        log('Adding document to patient by id: doc value is null')
        throw 'Adding document to patient by id: doc value is null'
    }

    const patient = await patientController.getPatientById(id)
    await addDocumentToPatient(patient, doc)
}

async function updatePatientCurrentDocument(patient, change) {

    if (patient == null) {
        log('Updating Patient Current Document: patient value is null')
        throw 'Updating Patient Current Document: patient value is null'
    }
    if (patient.getName() == null) {
        log('Updating Patient Current Document: patient not created(name does not exist)')
        throw 'Updating Patient Current Document: patient not created(name does not exist)'
    }
    if (patient.getBedId() == null) {
        log('Updating Patient Current Document: patient not created(name does not exist)')
        throw 'Updating Patient Current Document: patient not created(name does not exist)'
    }
    if (patient.getId() == null) {
        log('Updating Patient Current Document: patient not created(id does not exist)')
        throw 'Updating Patient Current Document: patient not created(id does not exist)'
    }
    if (change == null) {
        log('Updating Patient Current Document: change value is null');
        throw 'Updating Patient Current Document: change value is null'
    }

    const docList = new DocumentLinkedList(patient)

    try {
        await docList.updateCurrentDocument(change)
    } catch (e) {
        log(e)
        throw e
    }

    log('Successfully updated patient current document')
}

async function updatePatientCurrentDocById(id, change) {

    if (id == null) {
        log('Updating Patient Current Document by id: id value is null')
        throw 'Updating Patient Current Document by id: id value is null'
    }

    if (change == null) {
        log('Updating Patient Current Document by id: change value is null')
        throw 'Updating Patient Current Document by id: change value is null'
    }

    const patient = await patientController.getPatientById(id)
    await updatePatientCurrentDocument(patient, doc)
}

async function getPatientCurrentDocument(patient) {

    if (patient == null) {
        log('Fetching patient current document: patient value is null')
        throw 'Fetching patient current document: patient value is null'
    }
    if (patient.getName() == null) {
        log('Fetching patient current document: patient not created(name does not exist)')
        throw 'Fetching patient current document: patient not created(name does not exist)'
    }
    if (patient.getBedId() == null) {
        log('Fetching patient current document: patient not created(name does not exist)')
        throw 'Fetching patient current document: patient not created(name does not exist)'
    }
    if (patient.getId() == null) {
        log('Fetching patient current document: patient not created(id does not exist)')
        throw 'Fetching patient current document: patient not created(id does not exist)'
    }

    const docList = new DocumentLinkedList(patient)
    let currentDoc

    try {
        currentDoc = await docList.getCurrentDocument()
    } catch (e) {
        log(e)
        throw e
    }

    log('Successfully fetched document')
    return currentDoc
}

async function getPatientCurrentDocById(id) {

    if (id == null) {
        log('Fetching patient current document by id: id value is null')
        throw 'Fetching patient current document by id: id value is null'
    }

    const patient = await patientController.getPatientById(id)
    return await getPatientCurrentDocument(patient)
}

async function getPatientNextDocument(patient) {

    if (patient == null) {
        log('Fetching patient next document: patient value is null')
        throw 'Fetching patient next document: patient value is null'
    }
    if (patient.getName() == null) {
        log('Fetching patient next document: patient not created(name does not exist)')
        throw 'Fetching patient next document: patient not created(name does not exist)'
    }
    if (patient.getBedId() == null) {
        log('Fetching patient next document: patient not created(name does not exist)')
        throw 'Fetching patient next document: patient not created(name does not exist)'
    }
    if (patient.getId() == null) {
        log('Fetching patient next document: patient not created(id does not exist)')
        throw 'Fetching patient next document: patient not created(id does not exist)'
    }

    const docList = new DocumentLinkedList(patient)
    let nextDoc

    try {
        nextDoc = await docList.getNextDocument()
    } catch (e) {
        log(e)
        throw e
    }

    log('Successfully fetched document')
    return nextDoc
}

async function getPatientNextDocById(id) {

    if (id == null) {
        log('Fetching patient next document by id: id value is null')
        throw 'Fetching patient next document by id: id value is null'
    }

    const patient = await patientController.getPatientById(id)
    return await getPatientNextDocument(patient)
}

async function getPatientPrevDocument(patient) {

    if (patient == null) {
        log('Fetching patient previous document: patient value is null')
        throw 'Fetching patient previous document: patient value is null'
    }
    if (patient.getName() == null) {
        log('Fetching patient previous document: patient not created(name does not exist)')
        throw 'Fetching patient previous document: patient not created(name does not exist)'
    }
    if (patient.getBedId() == null) {
        log('Fetching patient previous document: patient not created(name does not exist)')
        throw 'Fetching patient previous document: patient not created(name does not exist)'
    }
    if (patient.getId() == null) {
        log('Fetching patient previous document: patient not created(id does not exist)')
        throw 'Fetching patient previous document: patient not created(id does not exist)'
    }

    const docList = new DocumentLinkedList(patient)
    let prevDoc

    try {
        prevDoc = await docList.getPrevDocument()
    } catch (e) {
        log(e)
        throw e
    }

    log('Successfully fetched document')
    return prevDoc
}

async function getPatientPrevDocById(id) {

    if (id == null) {
        log('Fetching patient previoud document by id: id value is null')
        throw 'Fetching patient previoud document by id: id value is null'
    }

    const patient = await patientController.getPatientById(id)
    return await getPatientPrevDocument(patient)
}

module.exports = {
    addDocToPatientById,
    updatePatientCurrentDocById,
    getPatientCurrentDocById,
    getPatientNextDocById,
    getPatientPrevDocById
}