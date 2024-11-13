const Sequelize = require('sequelize');
const database = require('../database');
const CarouselItem = require('./carousel_items');

const Carousel = database.define('tb_carousels', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tags: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    fake_delete:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
})


Carousel.hasMany(CarouselItem, { foreignKey: 'carousel_id', as: 'carousel_item' });
CarouselItem.belongsTo(Carousel, { foreignKey: 'carousel_id', as: 'carousel' });

module.exports = Carousel;