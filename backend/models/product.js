const Sequelize = require('sequelize');
const database = require('../database');
const ProductImage = require('./product_images');
const Brand = require('./brand');
const Category = require('./category');

const Product = database.define('tb_products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ref:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    situation:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    other_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    tags:{
        type: Sequelize.TEXT,
        allowNull: true,
    },
    weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    width: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    height: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    length: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    reason_failure:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    published: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    fake_delete:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_categories',
            key: 'id'
        }
    },
    brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_brands',
            key: 'id'
        }
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

Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasOne(Product, { foreignKey: 'category_id', as: 'product' });

Product.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Brand.hasOne(Product, { foreignKey: 'brand_id', as: 'product' });

Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = Product;