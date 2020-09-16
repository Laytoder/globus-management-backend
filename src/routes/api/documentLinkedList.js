const route = require('express').Router()

const {
    addDocToPatientById,
    updatePatientCurrentDocById,
    getPatientCurrentDocById,
    getPatientNextDocById,
    getPatientPrevDocById
} = require('../../controllers/documentLinkedList')

route.post('/', async (req, res) => {
    try {
        const id = req.body.id
        const doc = req.body.doc
        await addDocToPatientById(id, doc)
        res.status(200).send()
    } catch (e) {
        res.status(400).send()
    }
})

route.post('/update', async (req, res) => {
    try {
        const id = req.body.id
        const change = req.body.change
        await updatePatientCurrentDocById(id, change)
        res.status(200).send()
    } catch (e) {
        res.status(400).send()
    }
})

route.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const doc = await getPatientCurrentDocById(id)
        res.status(200).json(doc)
    } catch (e) {
        res.status(400).send()
    }
})

route.get('/next/:id', async (req, res) => {
    try {
        const id = req.params.id
        const doc = await getPatientNextDocById(id)
        res.status(200).json(doc)
    } catch (e) {
        res.status(400).send()
    }
})

route.get('/prev/:id', async (req, res) => {
    try {
        const id = req.params.id
        const doc = await getPatientPrevDocById(id)
        res.status(200).json(doc)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = route