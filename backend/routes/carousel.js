const express = require('express');
const router = express.Router();

const { validateOrigin } = require('../middlewares/CorsMiddleware');
const { validateToken } = require('../middlewares/AuthMiddleware');

require('dotenv').config();

const Carousel = require('../models/carousel');
const CarouselItem = require('../models/carousel_items');

router.get('/get/:tags', validateOrigin, async (req, res) => {
    try {
        const { tags } = req.params;
        const tagsArray = tags.split(',');

        const carousels = await Carousel.findAll({
            where: {
                fake_delete: false,
                tags: { [Sequelize.Op.or]: tagsArray }
            },
            include: [
                {
                    model: CarouselItem,
                    as: 'carousel_item',
                    where: {
                        fake_delete: false
                    }
                }
            ]
        });

        return res.status(200).json({ success: true, code: 200, message: "Carolsels recuperados com sucesso!", data: carousels});
    } catch (error) {
        return res.status(400).json({ success: false, code: 400, message: error.message, data: null });
    }
});

router.post('/create', validateToken, async (req, res) => {
    try {
        const { tags, items } = req.body;

        const newCarousel = await Carousel.create(
            { tags, fake_delete: false },
            { include: [{ model: CarouselItem, as: 'carousel_item' }] }
        );

        for (const item of items) {
            await CarouselItem.create({
                ...item,
                carousel_id: newCarousel.id,
                fake_delete: false
            });
        }

        return res.status(201).json({
            success: true,
            code: 201,
            message: "Carousel criado com sucesso!",
            data: newCarousel
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

router.put('/update/:id', validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { tags, items } = req.body;

        const carousel = await Carousel.findByPk(id, {
            include: [{ model: CarouselItem, as: 'carousel_item' }]
        });

        if (!carousel || carousel.fake_delete) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Carousel não encontrado ou deletado!",
                data: null
            });
        }

        await carousel.update({ tags });

        for (const item of items) {
            if (item.id) {
                const existingItem = await CarouselItem.findOne({ where: { id: item.id, carousel_id: id } });
                if (existingItem) {
                    await existingItem.update({
                        image: item.image,
                        title: item.title,
                        description: item.description,
                        cta_text: item.cta_text,
                        cta_link: item.cta_link,
                        cta_extern: item.cta_extern
                    });
                }
            } else {
                await CarouselItem.create({
                    ...item,
                    carousel_id: id,
                    fake_delete: false
                });
            }
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: "Carousel e itens atualizados com sucesso!",
            data: carousel
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

router.delete('/delete/:id', validateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const carousel = await Carousel.findByPk(id, {
            include: [{ model: CarouselItem, as: 'carousel_item' }]
        });

        if (!carousel || carousel.fake_delete) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Carousel não encontrado ou já deletado!",
                data: null
            });
        }

        await carousel.update({ fake_delete: true });
        await Promise.all(
            carousel.carousel_item.map(item => item.update({ fake_delete: true }))
        );

        return res.status(200).json({
            success: true,
            code: 200,
            message: "Carousel deletado logicamente com sucesso!"
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