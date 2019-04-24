const controller = require('../controllers/benefit')
var express = require('express')
var router = new express.Router()

    router.get('/benefit', controller.findAll)
    router.get('/benefit/:id', controller.findById)
    router.post('/benefit', controller.create)
    router.put('/benefit/:id', controller.update)
    router.delete('/benefit/:id', controller.destroy)

module.exports  = router