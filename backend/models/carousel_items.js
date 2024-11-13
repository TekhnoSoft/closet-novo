const Sequelize = require('sequelize');
const database = require('../database');

const CarouselItem = database.define('tb_carousel_items', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cta_text: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cta_link: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cta_extern: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    fake_delete:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    carousel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_carousels',
            key: 'id'
        }
    },
})

module.exports = CarouselItem;