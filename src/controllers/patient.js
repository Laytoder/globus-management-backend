const { Patient } = require('../database/models/patient')
const log = require('debug')('app:controllers/patient')
const ObjectID = require('mongodb').ObjectID;

const { PATIENT_DOES_NOT_EXIST } = require('../config/constants')
const { PATIENT_CREATION_FAILED } = require('../config/constants')

async function createPatientAndGetId(patientInfoJson) {

    if (patientInfoJson == null) {
        log('Creating patient: patient info value is null')
        return PATIENT_CREATION_FAILED
    }
    if (patientInfoJson.name == null) {
        log('Creating patient: patient name does not exist')
        return PATIENT_CREATION_FAILED
    }
    if (patientInfoJson.bedId == null) {
        log('Creating patient: patient bed ID does not exist')
        return PATIENT_CREATION_FAILED
    }

    const patient = new Patient(patientInfoJson)

    try {
        await patient.createPatient()
    } catch (e) {
        log(e)
        return PATIENT_CREATION_FAILED
    }

    log('Patient created')
    return patient.getId()
}

async function updatePatientById(id, change) {

    if (id == null) {
        log('Updating patient by id: id value is null')
    }
    if (change == null) {
        log('Updating patient by id: change value is null')
    }

    const filter = { _id: ObjectID(id) }
    try {
        await Patient.updatePatient(filter, change);
    } catch (e) {
        log(e)
        return
    }

    log(`Patient updated with id: ${id}`)
}

async function getAllPatients() {
    const query = {}
    let patients
    try {
        patients = await Patient.findPatients(query)
    } catch (e) {
        log(e)
        return []
    }
    log('Successfully fetched all patients')
    return patients
}

async function getPatientById(id) {

    if (id == null) {
        log('Fetching patient by id: id value is null')
        return PATIENT_DOES_NOT_EXIST
    }

    const query = { _id: ObjectID(id) }
    let patient
    try {
        const patients = await Patient.findPatients(query)
        if (patients.length == 0) {
            log('Fetching patient by id: query result was empty')
            return PATIENT_DOES_NOT_EXIST
        }
        patient = patients[0]
    } catch (e) {
        log(e)
        return PATIENT_DOES_NOT_EXIST
    }
    log(`Successfully fetched patient with id: ${id}`)
    return patient
}

async function resetPatientData() {
    try {
        await Patient.resetData()
    } catch (e) {
        log(e)
        return
    }

    log('Successfully reset patient data')
}

module.exports = {
    createPatientAndGetId,
    updatePatientById,
    getAllPatients,
    getPatientById,
    resetPatientData
}