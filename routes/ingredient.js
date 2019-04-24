const controller = require('../controllers/ingredient')
var express = require('express')
var router = new express.Router()

    router.get('/ingredient', controller.findAll)
    router.get('/ingredient/:id', controller.findById)
    router.post('/ingredient', controller.create)
    router.put('/ingredient/:id', controller.update)
    router.delete('/ingredient/:id', controller.destroy)

module.exports  = router