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
    async create(req, res) {
        const data = {
            ingredient: req.body.ingredient,
            drugID: req.body.drugID
        }
        if (data) {
            const result = await model.ingredient.create(data)
            return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result})
        }
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
