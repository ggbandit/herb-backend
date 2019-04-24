const controller = require('../controllers/ingredient')
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


    router.get('/ingredient', controller.findAll)
    router.get('/ingredient/:id', controller.findById)
    router.post('/ingredient', upload.single("ingredientImage"), controller.createSingle)
    router.post('/multipleIngredientImage', upload.array("ingredientImage",9), controller.createMultiple)
    router.put('/ingredient/:id', controller.update)
    router.delete('/ingredient/:id', controller.destroy)

module.exports  = router