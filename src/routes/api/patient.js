const route = require('express').Router()

const {
    createPatientAndGetId,
    updatePatientById,
    getAllPatients,
    getPatientById
} = require('../../controllers/patient')

route.post('/', async (req, res) => {
    console.log('request occured')
    try {
        const id = await createPatientAndGetId(req.body)
        res.status(200).send(id)
    } catch (e) {
        res.status(400).send()
    }
})

route.get('/', async (req, res) => {
    try {
        const patients = await getAllPatients()
        res.status(200).json(patients)
    } catch (e) {
        res.status(400).send()
    }
})

route.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const patient = await getPatientById(id)
        res.status(200).json(patient)
    } catch (e) {
        res.status(400).send()
    }
})

route.post('/update', async (req, res) => {
    try {
        const change = req.body.change
        const id = req.body.id
        await updatePatientById(id, change)
        res.status(200).send()
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = route