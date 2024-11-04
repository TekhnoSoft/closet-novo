const express = require('express');
const router = express.Router();

const { validateOrigin } = require('../middlewares/CorsMiddleware');
const { validateToken } = require('../middlewares/AuthMiddleware');

const Utils = require('../utils');

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require('../models/user');
const Address = require('../models/address');

router.get('/auth', validateToken, async (req, res) => {
    try{
        return res.json({success: true, code: 200, message: "Token válido", data: {id: req.user.id, success: true}});
    }catch(err){
        return res.json({success: false, code: 200, message: "Erro ao recuperar o token", data: err});
    }
})

router.get('/get', validateToken, async (req, res) => {
    try {
        let id = req.user.id;
        const user = await User.findOne({ where: { id } });
        const addresses = await Address.findAll({where: {user_id: id}});
        if(!user || user == null){
            return res.status(404).json({ success: false, code: 404, message: "Cliente não encontrado.", data: null });
        }
        return res.status(200).json({ success: true, code: 200, message: "Cliente recuperado com sucesso!", data: {
            id: user?.id,
            cpf: user.cpf,
            email: user?.email,
            name: user?.name,
            phone: user?.phone,
            role: user?.role,
            addresses: addresses
        }});
    } catch (error) {
        return res.status(400).json({ success: false, code: 400, message: error.message, data: null });
    }
});

router.post('/login', validateOrigin, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, code: 401, message: "Credenciais inválidas." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, code: 401, message: "Credenciais inválidas." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);

        return res.status(200).json({ success: true, code: 200, message: "Login realizado com sucesso.", token });
    } catch (error) {
        return res.status(500).json({ success: false, code: 500, message: "Erro no servidor. Tente novamente mais tarde." });
    }
})

router.post('/register', validateOrigin, async (req, res) => {
    try {
        let validateFields = Utils.validateFormDataRegister(req.body.data);

        if(!validateFields.success){
            return res.status(400).json({ success: false, code: 400, message: validateFields.text });
        }

        const {
            nome,
            email,
            celular,
            cpf,
            senha,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado
        } = req.body.data;

        const searchedUserByCpf= await User.findOne({ where: { cpf } });
        const searchedUserByEmail = await User.findOne({ where: { email } });

        if(searchedUserByCpf){
            return res.status(400).json({ success: false, code: 400, message: "Já existe um usuário com esse CPF." });
        }

        if(searchedUserByEmail){
            return res.status(400).json({ success: false, code: 400, message: "Já existe um usuário com esse e-mail." });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const user = await User.create({
            name: nome,
            phone: Utils.removeAllMaskCharacters(celular),
            cpf: Utils.removeAllMaskCharacters(cpf), 
            email: email,
            password_hash: senhaHash
        });

        const address = await Address.create({
            cep: Utils.removeAllMaskCharacters(cep),
            street: logradouro,
            number: numero,
            complement: complemento,
            neighborhood: bairro,
            city: cidade,
            state: estado,
            user_id: user.id,
        })

        return res.status(200).json({ success: true, code: 200, message: "Cadastro realizado com sucesso." });

    } catch (error) {
        return res.status(400).json({ success: false, code: 400, message: error.message });
    }
})

module.exports = router;