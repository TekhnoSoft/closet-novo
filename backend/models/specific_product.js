const Sequelize = require('sequelize');
const database = require('../database');

const SpecificProduct = database.define('tb_specific_products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    fake_delete:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_users',
            key: 'id'
        }
    }
})

module.exports = SpecificProduct;