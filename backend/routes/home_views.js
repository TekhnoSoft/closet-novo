const express = require('express');
const router = express.Router();

const { validateOrigin } = require('../middlewares/CorsMiddleware');
const { validateToken } = require('../middlewares/AuthMiddleware');

require('dotenv').config();

const HomeView = require('../models/home_views');
const Carousel = require('../models/carousel');
const CarouselItem = require('../models/carousel_items');
const Category = require('../models/category');
const GridProduct = require('../models/grid_product');
const GridProductItem = require('../models/grid_product_items');
const Product = require('../models/product');
const ProductImage = require('../models/product_images');

router.get('/get', validateOrigin, async (req, res) => {
    try {
        const homeViews = await HomeView.findAll({
            where: { fake_delete: false },
            order: [['id', 'ASC']]
        });

        let data = [];

        await Promise.all(
            homeViews.map(async (view) => {
                switch (view.type) {
                    case "CAROUSEL":
                        const carousel = await Carousel.findOne({
                            where: {
                                id: view.view_id,
                                fake_delete: false,
                            },
                            include: [
                                {
                                    model: CarouselItem,
                                    as: 'carousel_item',
                                    where: { fake_delete: false }
                                }
                            ]
                        });

                        if (carousel) {
                            data.push({id: view.id, type: view.type, view: carousel});
                        }
                        break;
                    case "CATEGORY":
                        const category = await Category.findAll({
                            where: {
                                fake_delete: false,
                            }
                        })
                        if (category) {
                            data.push({id: view.id, type: view.type, view: category});
                        }
                        break;
                    case "GRID_PRODUCT":
                        const grid_product = await GridProduct.findOne({
                            where: {
                                id: view.view_id,
                                fake_delete: false,
                            },
                            include: [
                                {
                                    model: GridProductItem,
                                    as: 'grid_product_item',
                                    where: { fake_delete: false },
                                    include: [
                                        {
                                            model: Product,
                                            as: 'product',
                                            where: { fake_delete: false, status: "A", published: true },
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
                                }
                            ]
                        });

                        if (grid_product) {
                            data.push({id: view.id, type: view.type, view: grid_product});
                        }
                        break;
                }
            })
        );

        return res.status(200).json({
            success: true,
            code: 200,
            message: "HomeViews recuperados com sucesso!",
            data: data
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

module.exports = router;
