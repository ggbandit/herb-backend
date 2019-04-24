const model = require('../models/index');

module.exports = {
    async findAll(req, res) {
        const result = await model.drug.findAll();
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result });
    },
    async findById(req, res) {
        const result = await model.drug.findByPk(req.params.id);
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result });
    },
    async createSingle(req, res) {
        const data = {
            title: req.body.title,
            description: req.body.description,
            drugImage:   req.file.originalname,
            path:   req.file.path
        }
        if (data) {
            const result = await model.drug.create(data)
            return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result})
        }
    },
    async createMultiple(req, res) {
        let drugImage = {}
        if(req.files) {
            for(i in req.files) {
                console.log(req.files[i])
                drugImage = {
                    name:   req.files[i].originalname,
                    path:   req.files[i].path,
                    drugID: req.body.drugID
                }
                await model.image.create(drugImage)
            }
        }
        return await res.status(200).send("Upload Images Successful")
    },
    async update(req, res) {
        try {
            const result = await model.drug.update(req.body, { where: { drugID: req.params.id } });
            return await res.status(result ? 200 : 400).send({
                status: result ? 200 : 400, result: await model.drug.findById(req.params.id)
            });
        } catch (ex) {
            return await res.status(400).send({ status: 400, result: ex.errors.map(e => e.message) });
        }
    },
    async destroy(req, res) {
        const result = model.drug.destroy({ where: { drugID: req.params.id } });
        return await res.status(result ? 200 : 400).send({
            status: result ? 200 : 400, result: result ? 'Successful' : 'Failure'
        });
    }
}
