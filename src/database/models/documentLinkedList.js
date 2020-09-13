const DATABASE_NAME = require('../../config/database').DATABASE_NAME
const ObjectID = require('mongodb').ObjectID;

const { DOCUMENT_DOES_NOT_EXIST } = require('../../config/constants')
const { Patient } = require('./patient')

class DocumentLinkedList {

    static setMongoClient(client) {
        DocumentLinkedList._client = client
    }

    constructor(patient) {
        this.patient = patient
        const COLLECTION_NAME = patient.getId()
        DocumentLinkedList._collection = DocumentLinkedList._client.db(DATABASE_NAME).collection(COLLECTION_NAME)
    }

    async add(doc) {
        const head = this.patient.getHead()
        const tail = this.patient.getTail()
        const change = {}
        //case of adding the first document
        if (head == null) {
            this.initDocMetaData(doc)
            await this.createDocument(doc)
            this.patient.setHead(doc._id)
            change.head = doc._id
            this.patient.setTail(doc._id)
            change.tail = doc._id
            this.patient.setCurrentDocId(doc._id)
            change.currentDocId = doc._id
        }
        //case of adding document on a later stage
        else {
            this.initDocMetaData(doc)
            doc.prev = tail
            await this.createDocument(doc)
            await this.updateCurrentDocument({
                next: doc._id
            })
            this.patient.setHead(head)
            change.head = head
            this.patient.setTail(doc._id)
            change.tail = doc._id
            this.patient.setCurrentDocId(doc._id)
            change.currentDocId = doc._id
        }

        const id = this.patient.getId()
        const filter = { _id: ObjectID(id) }
        await Patient.updatePatient(filter, change)
    }

    async updateCurrentDocument(change) {
        const currentDocId = this.patient.getCurrentDocId()
        if (currentDocId == null)
            return
        const filter = { _id: ObjectID(currentDocId) }
        const updation = { $set: change }
        await DocumentLinkedList._collection.updateOne(filter, updation)
    }

    async getCurrentDocument() {
        const currentDocId = this.patient.getCurrentDocId()
        const query = { _id: ObjectID(currentDocId) }
        const doc = await DocumentLinkedList._collection.find(query).next()

        if (doc == null)
            return DOCUMENT_DOES_NOT_EXIST

        return doc
    }

    async getNextDocument() {
        const currentDocId = this.patient.getCurrentDocId()
        const query = { _id: ObjectID(currentDocId) }
        const doc = await DocumentLinkedList._collection.find(query).next()
        const nextDocId = doc.next
        if (nextDocId == null)
            return DOCUMENT_DOES_NOT_EXIST
        const nextDocQuery = { _id: ObjectID(nextDocId) }
        const nextDoc = await DocumentLinkedList._collection.find(nextDocQuery).next()
        const id = this.patient.getId()
        const filter = { _id: ObjectID(id) }
        const change = { currentDocId: nextDocId }
        await Patient.updatePatient(filter, change)

        return nextDoc
    }

    async getPrevDocument() {
        const currentDocId = this.patient.getCurrentDocId()
        const query = { _id: ObjectID(currentDocId) }
        const doc = await DocumentLinkedList._collection.find(query).next()
        const prevDocId = doc.prev
        if (prevDocId == null)
            return DOCUMENT_DOES_NOT_EXIST
        const prevDocQuery = { _id: ObjectID(prevDocId) }
        const prevDoc = await DocumentLinkedList._collection.find(prevDocQuery).next()
        const id = this.patient.getId()
        const filter = { _id: ObjectID(id) }
        const change = { currentDocId: prevDocId }
        await Patient.updatePatient(filter, change)

        return prevDoc
    }

    async createDocument(doc) {
        const res = await DocumentLinkedList._collection.insertOne(doc)
        doc._id = res.insertedId.toString()
    }

    initDocMetaData(doc) {
        doc.prev = null
        doc.next = null
    }
}

module.exports = {
    DocumentLinkedList
}