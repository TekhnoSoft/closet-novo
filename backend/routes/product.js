const express = require('express');
const router = express.Router();

const { validateOrigin } = require('../middlewares/CorsMiddleware');
const { validateToken } = require('../middlewares/AuthMiddleware');

require('dotenv').config();

const { Op, Sequelize } = require('sequelize');

const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');
const ProductImage = require('../models/product_images');

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

router.post('/create', validateOrigin, async (req, res) => {
    const { name, ref, description, situation, price, other_price, status, tags, weight, width, height, length, category_id, brand_id, user_id } = req.body;

    try {
        // Verificar se todos os campos obrigatórios foram fornecidos
        if (!name || !ref || !description || !situation || !price || !category_id || !brand_id || !user_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Criar o novo produto
        const newProduct = await Product.create({
            name,
            ref,
            description,
            situation,
            price,
            other_price: other_price || 0,
            status,
            tags,
            weight,
            width,
            height,
            length,
            category_id,
            brand_id,
            user_id
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/update/:id', validateOrigin, async (req, res) => {
    const { id } = req.params;
    const { name, ref, description, situation, price, other_price, status, tags, weight, width, height, length, category_id, brand_id, user_id } = req.body;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Atualizar os campos do produto
        product.name = name || product.name;
        product.ref = ref || product.ref;
        product.description = description || product.description;
        product.situation = situation || product.situation;
        product.price = price || product.price;
        product.other_price = other_price || product.other_price;
        product.status = status || product.status;
        product.tags = tags || product.tags;
        product.weight = weight || product.weight;
        product.width = width || product.width;
        product.height = height || product.height;
        product.length = length || product.length;
        product.category_id = category_id || product.category_id;
        product.brand_id = brand_id || product.brand_id;
        product.user_id = user_id || product.user_id;

        // Salvar as mudanças
        await product.save();

        return res.status(200).json(product);
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

module.exports = router;