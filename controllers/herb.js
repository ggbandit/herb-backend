const model = require('../models/index');

module.exports = {
    async findAll(req, res) {
        const herb = await model.herb.findAll();
        const image = await model.image.findAll();
        const result = []
        for(i in herb) {
            result.push(herb[i].dataValues)
        }
        for(i in result)
        {
            for(j in image) {
                if(result[i].herbID === image[j].dataValues.herbID){
                    result[i].path = image[j].dataValues.path
                }
            }
        }
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result });
    },
    async findById(req, res) {
        const result = await model.herb.findByPk(req.params.id);
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result });
    },
    async create(req, res) {
        const result = await model.herb.create(req.body)
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result})
        
    },
    async update(req, res) {
        try {
            const result = await model.herb.update(req.body, { where: { id: req.params.id } });
            return await res.status(result ? 200 : 400).send({
                status: result ? 200 : 400, result: await model.herb.findById(req.params.id)
            });
        } catch (ex) {
            return await res.status(400).send({ status: 400, result: ex.errors.map(e => e.message) });
        }
    },
    async destroy(req, res) {
        const result = model.herb.destroy({ where: { id: req.params.id } });
        return await res.status(result ? 200 : 400).send({
            status: result ? 200 : 400, result: result ? 'Successful' : 'Failure'
        });
    }
}
