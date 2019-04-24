const controller = require('../controllers/drug')
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


    router.get('/drug', controller.findAll)
    router.get('/drug/:id', controller.findById)
    router.post('/drug', upload.single("drugImage"), controller.createSingle)
    router.post('/multipleDrugImage', upload.array("drugImage",9), controller.createMultiple)
    router.put('/drug/:id', controller.update)
    router.delete('/drug/:id', controller.destroy)

module.exports  = router