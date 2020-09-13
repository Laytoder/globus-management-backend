const MongoClient = require('mongodb').MongoClient
const config = require('../config/database')
const log = require('debug')('app:database/db')
const { Patient } = require('./models/patient')
const { DocumentLinkedList } = require('./models/documentLinkedList')

const client = new MongoClient(config.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const sync = async () => {

    var db;
    try {
        db = await client.connect();
        Patient.setMongoClient(client)
        DocumentLinkedList.setMongoClient(client)
        log('Connection to database established')
    } catch (e) {
        log(e)
    }
}

module.exports = {
    sync
}