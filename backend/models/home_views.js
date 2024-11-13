const Sequelize = require('sequelize');
const database = require('../database');

const HomeView = database.define('tb_home_views', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    view_id: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    fake_delete:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
})

module.exports = HomeView;