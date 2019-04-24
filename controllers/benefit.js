const model = require('../models/index');

module.exports = {
    async findAll(req, res) {
        const result = await model.benefit.findAll();
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result });
    },
    async findById(req, res) {
        const result = await model.benefit.findByPk(req.params.id);
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result });
    },
    async create(req, res) {
        const data = {
            title: req.body.title,
            description: req.body.description,
            herbID: req.body.herbID
        }
        if (data) {
            const result = await model.benefit.create(data)
            return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result})
        }
    },
    async update(req, res) {
        try {
            const result = await model.benefit.update(req.body, { where: { benefitID: req.params.id } });
            return await res.status(result ? 200 : 400).send({
                status: result ? 200 : 400, result: await model.benefit.findById(req.params.id)
            });
        } catch (ex) {
            return await res.status(400).send({ status: 400, result: ex.errors.map(e => e.message) });
        }
    },
    async destroy(req, res) {
        const result = model.benefit.destroy({ where: { benefitID: req.params.id } });
        return await res.status(result ? 200 : 400).send({
            status: result ? 200 : 400, result: result ? 'Successful' : 'Failure'
        });
    }
}
