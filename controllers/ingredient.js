const model = require('../models/index');

module.exports = {
    async findAll(req, res) {
        const result = await model.ingredient.findAll();
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result });
    },
    async findById(req, res) {
        const result = await model.ingredient.findByPk(req.params.id);
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result });
    },
    async createSingle(req, res) {
        const data = {
            title: req.body.ingredient,
            drugID: req.body.drugID
        }
        if (data) {
            const result = await model.ingredient.create(data)
            return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result})
        }
    },
    async createMultiple(req, res) {
        let ingredientImage = {}
        if(req.files) {
            for(i in req.files) {
                console.log(req.files[i])
                ingredientImage = {
                    name:   req.files[i].originalname,
                    path:   req.files[i].path,
                    ingredientID: req.body.ingredientID
                }
                await model.image.create(ingredientImage)
            }
        }
        return await res.status(200).send("Upload Images Successful")
    },
    async update(req, res) {
        try {
            const result = await model.ingredient.update(req.body, { where: { ingredientID: req.params.id } });
            return await res.status(result ? 200 : 400).send({
                status: result ? 200 : 400, result: await model.ingredient.findById(req.params.id)
            });
        } catch (ex) {
            return await res.status(400).send({ status: 400, result: ex.errors.map(e => e.message) });
        }
    },
    async destroy(req, res) {
        const result = model.ingredient.destroy({ where: { ingredientID: req.params.id } });
        return await res.status(result ? 200 : 400).send({
            status: result ? 200 : 400, result: result ? 'Successful' : 'Failure'
        });
    }
}
