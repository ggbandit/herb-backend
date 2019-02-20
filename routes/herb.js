const controller = require('../controllers/herb')
var express = require('express')
var router = new express.Router()

    router.get('/herb', controller.findAll)
    router.get('/herb/:id', controller.findById)
    router.post('/herb',  controller.create)
    router.put('/herb/:id', controller.update)
    router.delete('/herb/:id',  controller.destroy)

module.exports  = router
