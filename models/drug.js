module.exports = (sequelize, DataTypes) => {
    return sequelize.define('drug', {
        drugID: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        drugImage: {
            type: DataTypes.STRING(255)
        },
        path: {
            type: DataTypes.STRING(255)
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
}