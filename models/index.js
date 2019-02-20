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

model.herb.hasMany(model.image,{foreignKey: 'herbID', sourceKey: 'herbID'})
model.image.belongsTo(model.herb,{foreignKey: 'herbID', targetKey: 'herbID'})

module.exports = model;
