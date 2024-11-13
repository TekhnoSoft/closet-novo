const Sequelize = require('sequelize');
const database = require('../database');
const Product = require('./product');

const GridProductItem = database.define('tb_grid_product_items', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
    grid_product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_grid_products',
            key: 'id'
        }
    },
})

GridProductItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = GridProductItem;