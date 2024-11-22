const express = require('express');
const router = express.Router();

const { validateOrigin } = require('../middlewares/CorsMiddleware');
const { validateToken } = require('../middlewares/AuthMiddleware');

const Utils = require("../utils");

require('dotenv').config();

const { Op, Sequelize } = require('sequelize');

const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');
const ProductImage = require('../models/product_images');
const SpecificProduct = require('../models/specific_product');
const sequelize = require('../database');

router.get('/get/:id', validateOrigin, async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({
            where: {
                id,
                fake_delete: false,
                status: "A",
                published: true,
            },
            include: [
                { model: Category, as: 'category' },
                { model: Brand, as: 'brand' },
                { model: ProductImage, as: 'images' }
            ]
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/add', validateToken, async (req, res) => {
    const {
        name,
        description,
        situation,
        tags,
        weight,
        width,
        height,
        length,
        category_id,
        brand_id,
        images,
        address_id
    } = req.body.data;

    const user_id = req.user.id;

    const transaction = await sequelize.transaction();

    try {
        if (!name || !description || !situation || !category_id || !brand_id || !user_id ||!address_id) {
            return res.status(200).json({ success: false, code: 400, message: "Produto não pode adicionado." });
        }

        const newProduct = await Product.create({
            name,
            ref: Utils.makeid(7),
            description,
            situation,
            status: "E",
            tags,
            weight,
            width,
            height,
            length,
            category_id,
            brand_id,
            user_id,
            address_id,
            price: 0,
            other_price: 0,
            reason_failure: "",
        }, { transaction });

        if (images && images.length > 0) {
            const imageRecords = images.map(image => ({
                path: image.path,
                extention: image.extention,
                product_id: newProduct.id
            }));
            await ProductImage.bulkCreate(imageRecords, { transaction });
        }

        await transaction.commit();

        return res.status(200).json({ success: true, code: 200, message: "Produto salvo." });
    } catch (error) {
        console.error(error);
        await transaction.rollback();
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/update', validateToken, async (req, res) => {
    const { id, name, description, situation, tags, weight, width, height, length, category_id, brand_id, address_id, images } = req.body.data;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(200).json({ success: false, code: 400, message: "Produto não pode atualizado." });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.situation = situation || product.situation;
        product.tags = tags || product.tags;
        product.weight = weight || product.weight;
        product.width = width || product.width;
        product.height = height || product.height;
        product.length = length || product.length;
        product.category_id = category_id || product.category_id;
        product.brand_id = brand_id || product.brand_id;
        product.address_id = address_id || product.address_id;

        await product.save();

        return res.status(200).json({ success: true, code: 200, message: "Produto salvo." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/find-by-category/:category_id/:product_id', validateOrigin, async (req, res) => {
    const { category_id, product_id } = req.params;

    if (!category_id) {
        return res.status(400).json({ message: 'CategoryId is required' });
    }

    try {
        const products = await Product.findAll({
            where: {
                category_id: category_id,
                fake_delete: false,
                status: "A",
                published: true,
            },
            include: [
                { model: Category, as: 'category' },
                { model: Brand, as: 'brand' },
                { model: ProductImage, as: 'images' }
            ]
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found with the provided tag' });
        }

        const filteredProducts = products.filter(product => product.id !== parseInt(product_id));

        return res.status(200).json(filteredProducts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/search', validateOrigin, async (req, res) => {
    const { name, situation, order, categories, brands, min_price, max_price } = req.body.data;

    const filters = {};

    filters.fake_delete = false;

    filters.status = "A";

    if (name) {
        filters.name = { [Op.like]: `%${name}%` };
    }
    if (situation && situation != 0) {
        filters.situation = situation == 1 ? "N" : "U";
    }
    if (categories && categories.length > 0) {
        filters.category_id = { [Op.in]: categories };
    }
    if (brands && brands.length > 0) {
        filters.brand_id = { [Op.in]: brands };
    }
    if (min_price !== undefined && max_price !== undefined) {
        filters.price = { [Op.between]: [min_price, max_price] };
    } else if (min_price !== undefined) {
        filters.price = { [Op.gte]: min_price };
    } else if (max_price !== undefined) {
        filters.price = { [Op.lte]: max_price };
    }

    let orderOption = [];
    if (order) {
        switch (order) {
            case "0":
                orderOption.push(['name', 'ASC']);
                break;
            case "1":
                orderOption.push(['name', 'DESC']);
                break;
            case "2":
                orderOption.push(['price', 'ASC']);
                break;
            case "3":
                orderOption.push(['price', 'DESC']);
                break;
        }
    }

    try {
        const products = await Product.findAll({
            where: filters,
            include: [
                { model: Category, as: 'category' },
                { model: Brand, as: 'brand' },
                { model: ProductImage, as: 'images' }
            ],
            order: orderOption.length ? orderOption : undefined
        });

        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/price-range', validateOrigin, async (req, res) => {
    try {
        const priceRange = await Product.findAll({
            attributes: [
                [Sequelize.fn('MIN', Sequelize.col('price')), 'min_price'],
                [Sequelize.fn('MAX', Sequelize.col('price')), 'max_price']
            ]
        });

        return res.status(200).json(priceRange[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/my-products', validateToken, async (req, res) => {
    try {
        const id = req.user.id;

        const products = await Product.findAll({
            where: {
                user_id: id,
                fake_delete: false
            },
            include: [
                { model: Category, as: 'category' },
                { model: Brand, as: 'brand' },
                { model: ProductImage, as: 'images' }
            ]
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found with the provided tag' });
        }

        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/delete-my-products/:id', validateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user.id;

        const product = await Product.findOne({ where: { id, user_id } });
        if (!product) {
            return res.status(200).json({ success: false, code: 404, message: "Produto não encontrado." });
        }

        if (product.status !== "E" && product.status !== "R") {
            return res.status(200).json({ success: false, code: 400, message: "Produto não pode ser excluído neste status." });
        }

        await product.update({ fake_delete: true });

        return res.status(200).json({ success: true, code: 200, message: "Produto excluído." });
    } catch (error) {
        return res.status(500).json({ success: false, code: 500, message: "Erro ao excluir o produto.", data: error.message });
    }
});

router.post('/specific-product/add', validateToken, async (req, res) => {
    const { description, address_id } = req.body.data;
    const user_id = req.user.id;

    try {
        if (!description || !address_id || !user_id) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: "Campos obrigatórios não foram enviados."
            });
        }

        const specificProduct = await SpecificProduct.create({
            description,
            address_id,
            user_id
        });

        return res.status(201).json({
            success: true,
            code: 201,
            message: "Produto específico adicionado, entraremos em contato em breve.",
            data: specificProduct
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Erro ao adicionar o produto específico.",
            data: error.message
        });
    }
})

module.exports = router;