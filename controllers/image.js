const model = require('../models/index');

module.exports = {
    async findAll(req, res) {
        const result = await model.image.findAll();
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result });
    },
    async findById(req, res) {
        const result = await model.image.findByPk(req.params.id);
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result });
    },
    async create(req, res) {
        const herbImage = {
            name:   req.file.originalname,
            path:   req.file.path,
            herbID: req.body.herbID
        }
        if (herbImage) {
            const result = await model.image.create(herbImage)
            return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result})
        }
    },
    async update(req, res) {
        try {
            const result = await model.image.update(req.body, { where: { id: req.params.id } });
            return await res.status(result ? 200 : 400).send({
                status: result ? 200 : 400, result: await model.image.findById(req.params.id)
            });
        } catch (ex) {
            return await res.status(400).send({ status: 400, result: ex.errors.map(e => e.message) });
        }
    },
    async destroy(req, res) {
        const result = model.image.destroy({ where: { imageID: req.params.id } });
        return await res.status(result ? 200 : 400).send({
            status: result ? 200 : 400, result: result ? 'Successful' : 'Failure'
        });
    }
}
