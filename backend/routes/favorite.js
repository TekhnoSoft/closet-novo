const express = require('express');
const router = express.Router();

require('dotenv').config();

const { validateOrigin } = require('../middlewares/CorsMiddleware');
const { validateToken } = require('../middlewares/AuthMiddleware');

const Favorite = require('../models/favorite');
const Product = require('../models/product');
const ProductImage = require('../models/product_images');

router.get('/get', validateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const favorites = await Favorite.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Product,
                    as: 'product',
                    where: { fake_delete: false },
                    include: [
                        {
                            model: ProductImage,
                            as: 'images',
                            where: { fake_delete: false },
                            limit: 1,
                            order: [['createdAt', 'ASC']],
                        }
                    ]
                }
            ]
        });

        return res.status(200).json({
            success: true,
            code: 200,
            message: "Favoritos do usuário obtidos com sucesso!",
            data: favorites
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: error.message,
            data: null
        });
    }
});

router.post('/this', validateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.body.product_id;
        
        const existingFavorite = await Favorite.findOne({
            where: { user_id: userId, product_id: productId }
        });

        if (existingFavorite) {
            await existingFavorite.destroy();
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Produto removido dos favoritos!",
                data: false
            });
        } else {
            await Favorite.create({ user_id: userId, product_id: productId });
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Produto adicionado aos favoritos!",
                data: true
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: error.message,
            data: null
        });
    }
});

module.exports = router;