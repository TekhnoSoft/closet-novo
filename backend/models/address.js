const Sequelize = require('sequelize');
const database = require('../database');

const Address = database.define('tb_address', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    selected: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Meu Endereço"
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    street: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    number: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    complement: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    neighborhood: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Brasil"
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

module.exports = Address;