const Sequelize = require('sequelize');
const database = require('../database');
const GridProductItem = require('./grid_product_items');

const GridProduct = database.define('tb_grid_products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    icon: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    cta_text: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    cta_link: {
        type: Sequelize.TEXT,
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
})


GridProduct.hasMany(GridProductItem, { foreignKey: 'grid_product_id', as: 'grid_product_item' });
GridProductItem.belongsTo(GridProduct, { foreignKey: 'grid_product_id', as: 'grid_product' });

module.exports = GridProduct;