const model = require('../models/index');

module.exports = {
    async findAll(req, res) {
        const result = await model.event.findAll();
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result });
    },
    async findById(req, res) {
        const result = await model.event.findByPk(req.params.id);
        return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result });
    },
    async createSingle(req, res) {
        const data = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            eventImage:   req.file.originalname,
            path:   req.file.path
        }
        if (data) {
            const result = await model.event.create(data)
            return await res.status(result ? 200 : 400).send({ status: result ? 200 : 400, result})
        }
    },
    async createMultiple(req, res) {
        let eventImage = {}
        if(req.files) {
            for(i in req.files) {
                console.log(req.files[i])
                eventImage = {
                    name:   req.files[i].originalname,
                    path:   req.files[i].path,
                    eventID: req.body.eventID
                }
                await model.image.create(eventImage)
            }
        }
        return await res.status(200).send("Upload Images Successful")
    },
    async update(req, res) {
        try {
            const result = await model.event.update(req.body, { where: { eventID: req.params.id } });
            return await res.status(result ? 200 : 400).send({
                status: result ? 200 : 400, result: await model.event.findById(req.params.id)
            });
        } catch (ex) {
            return await res.status(400).send({ status: 400, result: ex.errors.map(e => e.message) });
        }
    },
    async destroy(req, res) {
        const result = model.event.destroy({ where: { eventID: req.params.id } });
        return await res.status(result ? 200 : 400).send({
            status: result ? 200 : 400, result: result ? 'Successful' : 'Failure'
        });
    }
}
