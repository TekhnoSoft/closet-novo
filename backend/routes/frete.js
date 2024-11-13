const express = require('express');
const router = express.Router();
const axios = require('axios');
const Sequelize = require('sequelize');

const { validateOrigin } = require('../middlewares/CorsMiddleware');
const Product = require('../models/product');
const Param = require('../models/params');

router.post('/calcular-preco', validateOrigin, async (req, res) => {
  try {
    const { cep, ids_product } = req.body;

    const products = await Product.findAll({
      where: { id: { [Sequelize.Op.in]: ids_product } }
    });

    if (!products.length) {
      return res.status(404).json({ error: 'Nenhum produto encontrado.' });
    }

    const paramCep = await Param.findOne({ where: { name: "CLOSET_NOVO_CEP" } });

    let SUPER_FRETE_URI = (process.env.DEVELOPMENT_MODE === 'true') ? process.env.SUPER_FRETE_URI_DEV : process.env.SUPER_FRETE_URI_PROD;
    let SUPER_FRETE_TOKEN = (process.env.DEVELOPMENT_MODE === 'true') ? process.env.SUPER_FRETE_TOKEN_DEV : process.env.SUPER_FRETE_TOKEN_PROD;

    let totalHeight = 0;
    let totalWidth = 0;
    let totalLength = 0;
    let totalWeight = 0;

    products.forEach(product => {
      totalHeight += Number(product.height);
      totalWidth += Number(product.width);
      totalLength += Number(product.length);
      totalWeight += Number(product.weight);
    });

    const options = {
      method: 'POST',
      url: `${SUPER_FRETE_URI}api/v0/calculator`,
      headers: {
        accept: 'application/json',
        'User-Agent': 'Nome e versão da aplicação (email para contato técnico)',
        'content-type': 'application/json',
        Authorization: `Bearer ${SUPER_FRETE_TOKEN}`
      },
      data: {
        from: { postal_code: paramCep?.value },
        to: { postal_code: cep },
        services: '1,2,17',
        options: {
          own_hand: false,
          receipt: true,
          use_insurance_value: true
        },
        package: {
          height: totalHeight + 1,
          width: totalWidth + 1,
          length: totalLength + 1,
          weight: totalWeight + 1
        },
        products: products.map(product => ({
          quantity: 1,
          height: product.height,
          width: product.width,
          length: product.length,
          weight: product.weight
        }))
      }
    };

    await axios
      .request(options)
      .then(function (response) {
        const data = response?.data?.find(d => d.name === "SEDEX");
        if (data) {
          data.total = Number(data.price) + Number(data.discount);
          return res.status(200).json({ success: true, code: 200, message: "Sucesso no cálculo do frete", data: data });
        } else {
          return res.status(404).json({ success: false, code: 404, message: "Serviço de frete não encontrado", data: null });
        }
      })
      .catch(function (error) {
        return res.status(200).json({ success: false, code: 400, message: "Erro no cálculo de frete", data: error });
      });
  } catch (error) {
    return res.status(200).json({ success: false, code: 400, message: error.message, data: null });
  }
});

module.exports = router;
