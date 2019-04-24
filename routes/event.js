const controller = require('../controllers/event')
const multer = require('multer')
var express = require('express')
var router = new express.Router()

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null,'./uploads/')
        },
        filename: function (req, file, cb) {
                cb(null, file.originalname + '_' + Date.now() )
        }
})


const upload = multer({
        storage: storage,
        limits:{fileSize: 1000000},
     })


    router.get('/event', controller.findAll)
    router.get('/event/:id', controller.findById)
    router.post('/event', upload.single("eventImage"), controller.createSingle)
    router.post('/multipleEventImage', upload.array("eventImage",9), controller.createMultiple)
    router.put('/event/:id', controller.update)
    router.delete('/event/:id', controller.destroy)

module.exports  = router