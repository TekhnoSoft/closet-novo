const express = require('express');
const router = express.Router();

const { validateOrigin } = require('../middlewares/CorsMiddleware');
const { validateToken } = require('../middlewares/AuthMiddleware');

require('dotenv').config();

const Brand = require('../models/brand');

router.get('/get', validateOrigin, async (req, res) => {
    try {
        const brands = await Brand.findAll({ 
            where: {fake_delete: false},
            order: [['name', 'ASC']]
        });
        return res.status(200).json({ success: true, code: 200, message: "Marcas recuperadas com sucesso!", data: brands});
    } catch (error) {
        return res.status(400).json({ success: false, code: 400, message: error.message, data: null });
    }
});

module.exports = router;