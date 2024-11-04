const Sequelize = require('sequelize');
const database = require('../database');
const Address = require('./address');

const User = database.define('tb_users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user"
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password_hash: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
})

User.hasMany(Address, { foreignKey: 'user_id', as: 'addresses' });
Address.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = User;