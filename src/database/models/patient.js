const DATABASE_NAME = require('../../config/database').DATABASE_NAME
const List = require("collections/list")
const ObjectID = require('mongodb').ObjectID;

const COLLECTION_NAME = 'patients'

class Patient {

    static setMongoClient(client) {
        Patient._client = client
        Patient._collection = Patient._client.db(DATABASE_NAME).collection(COLLECTION_NAME)
    }

    constructor(patientInfoJson) {
        this._patientInfoJson = patientInfoJson
        if (this._patientInfoJson._id != null) {
            this._patientInfoJson._id = patientInfoJson._id.toString()
        }
    }

    //////////////// Patient Object Function ////////////////////

    async createPatient() {
        if (this._patientInfoJson._id != null)
            return
        this.initMetaData()
        this._patientInfoJson.currentDocId = null
        const res = await Patient._collection.insertOne(this._patientInfoJson)
        this._patientInfoJson._id = res.insertedId.toString()
    }

    getHead() {
        return this._patientInfoJson.head
    }

    getTail() {
        return this._patientInfoJson.tail
    }

    getName() {
        return this._patientInfoJson.name
    }

    getId() {
        return this._patientInfoJson._id
    }

    getCurrentDocId() {
        return this._patientInfoJson.currentDocId
    }

    setHead(head) {
        this._patientInfoJson.head = head
    }

    setTail(tail) {
        this._patientInfoJson.tail = tail
    }

    setCurrentDocId(newId) {
        if (newId == null)
            return
        this._patientInfoJson.currentDocId = newId
    }

    initMetaData() {
        this._patientInfoJson.head = null
        this._patientInfoJson.tail = null
    }

    /////////////// Patient Collection Functions //////////////////

    static async resetData() {
        await Patient._collection.deleteMany({})
    }

    static async findPatients(query) {
        const cursor = Patient._collection.find(query)

        const patients = new List([])
        while (await cursor.hasNext()) {
            const patientJson = await cursor.next()
            if (patientJson == null)
                continue
            patients.add(patientJson)
        }
        return patients.toArray()
    }

    static async updatePatient(filter, change) {
        const updation = { $set: change }
        await Patient._collection.updateOne(filter, updation)
    }

}

module.exports = {
    Patient
}