const Sequelize = require('sequelize');
const database = require('../database');
const Product = require('./product');

const Favorite = database.define('tb_favorites', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_users',
            key: 'id'
        }
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_products',
            key: 'id'
        }
    },
    fake_delete:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

Favorite.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = Favorite;