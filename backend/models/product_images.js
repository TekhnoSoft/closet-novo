const Sequelize = require('sequelize');
const database = require('../database');
const Product = require('./product');

const ProductImage = database.define('tb_product_images', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    extention:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    fake_delete:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_products',
            key: 'id'
        }
    },
})

module.exports = ProductImage;