const connection = require('../config/connection');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(connection.DATABASE, connection.USERNAME, connection.PASSWORD, {
    host: connection.HOST,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    logging: false,
    operatorsAliases: false
})

let op = Sequelize.Op;
let model = {};

model.Sequelize = Sequelize;
model.sequelize = sequelize;
model.op = op;

sequelize.sync({ force: false })

model.herb = require('./herb.js')(sequelize, Sequelize)
model.image = require('./image.js')(sequelize, Sequelize)
model.event = require('./event.js')(sequelize, Sequelize)
model.drug = require('./drug.js')(sequelize, Sequelize)
model.ingredient = require('./ingredient.js')(sequelize, Sequelize)



model.herb.hasMany(model.image,{foreignKey: 'herbID', sourceKey: 'herbID'})
model.image.belongsTo(model.herb,{foreignKey: 'herbID', targetKey: 'herbID'})

model.event.hasMany(model.image,{foreignKey: 'eventID', sourceKey: 'eventID'})
model.image.belongsTo(model.event,{foreignKey: 'eventID', targetKey: 'eventID'})

model.drug.hasMany(model.image,{foreignKey: 'drugID', sourceKey: 'drugID'})
model.image.belongsTo(model.drug,{foreignKey: 'drugID', targetKey: 'drugID'})

model.drug.hasMany(model.ingredient,{foreignKey: 'drugID', sourceKey: 'drugID'})
model.ingredient.belongsTo(model.drug,{foreignKey: 'drugID', targetKey: 'drugID'})

module.exports = model;
