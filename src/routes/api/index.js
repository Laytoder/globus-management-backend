const route = require('express').Router()

route.use('/patient', require('./patient'))
route.use('/doc', require('./documentLinkedList'))

module.exports = route