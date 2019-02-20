const controller = require('../controllers/image')
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


    router.get('/image', controller.findAll)
    router.get('/image/:id', controller.findById)
    router.post('/image', upload.single("herbImage"), controller.create)
    router.put('/image/:id', controller.update)
    router.delete('/image/:id', controller.destroy)

module.exports  = router