import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { AccountModal, Button, FragmentView, If, Input } from '../../components';

import Api from '../../Api';
import Utils from '../../Utils';
import StatusResponse from '../../helpers/StatusResponse';
import { MainContext } from '../../helpers/MainContext';

export default () => {

    const { user } = useContext(MainContext);

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const emptyFormData = {
        nome: '',
        email: '',
        celular: '',
        cpf: '',
        senha: '',
        confirmarSenha: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
    }

    const [formData, setFormData] = useState(emptyFormData);
    const [showAccountModal, setShowAccountModal] = useState(false);

    useEffect(() => {
        if (formData.cep.length === 9) {
            fetchAddress();
        }
    }, [formData.cep]);

    useEffect(() => {
        if(user && window.location.pathname == "/register"){
            navigate("/");
        }
    }, [user])

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const fetchAddress = async () => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${formData.cep.replace("-", "")}/json/`);
            const data = await response.json();
            if (!data.erro) {
                setFormData({
                    ...formData,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf
                });
            } else {
                Utils.toast({ type: "error", text: 'CEP não encontrado!' });
            }
        } catch (error) {
            console.error("Erro ao buscar o CEP:", error);
            Utils.toast({ type: "error", text: 'Erro ao buscar o CEP!' });
        }
    };

    const validateStep1 = () => { return Utils.validateFormDataRegister({ step: 1, formData }) };
    const validateStep2 = () => { return Utils.validateFormDataRegister({ step: 2, formData }) };

    const handleRegister = async () => {
        if (step === 1) {
            if (validateStep1()) {
                nextStep();
            }
        } else if (step === 2) {
            if (validateStep2()) {
                await Api.user.register({ data: formData }).then(data => {
                    if (data?.status == StatusResponse.isOk()) {
                        Utils.toast({ type: "success", text: "Cadastro realizado com sucesso!" });
                        setShowAccountModal(true);
                        setFormData(emptyFormData);
                    } else {
                        Utils.toast({ type: "error", text: data?.response?.data?.message });
                    }
                }).catch(err => {
                    Utils.toast({ type: "error", text: err });
                })
            }
        }
    };

    const nextStep = () => { setStep(step + 1) };
    const prevStep = () => { setStep(step - 1) };

    const HeaderRegisterComponent = ({user}) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: Utils.mobileCheck() ? 'start' : 'start', width: '100%' }}>
                <img width={Utils.mobileCheck() ? 150 : 200} src='../hero3.png' />
                <div>
                    {user ? (
                        <h2 className="login-title">Você já está logado</h2>
                    ) : (
                        <h2 className="login-title">Crie sua conta</h2>
                    )}
                    <h5>Olá {user?.name}, seja bem vindo ao <span style={{ color: '#5e8975', fontWeight: 'bold' }}>Closet Novo</span>!</h5>
                </div>
            </div>
        )
    }

    return (
        <FragmentView noPaddingContainer noMobileSpace>
            <AccountModal show={showAccountModal} setShow={setShowAccountModal} />
            <div className="register-container">
                <If condition={user == null || !user} elseComponent={<HeaderRegisterComponent user={user}/>}>
                    <HeaderRegisterComponent user={user}/>
                    {step === 1 && (
                        <div className="register-step">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ion-icon name="person" style={{ color: '#5e8975' }}></ion-icon>&nbsp;
                                <h3 className='h3-account'>Informações Pessoais</h3>
                            </div>
                            <Input hideInputBoxMargin type="text" label="Nome Completo" value={formData.nome} setValue={(value) => handleChange('nome', value)} />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input style={{ width: '100%' }} hideInputBoxMargin type="celular" label="Celular" value={formData.celular} setValue={(value) => handleChange('celular', value)} />&nbsp;&nbsp;
                                <Input style={{ width: '100%' }} hideInputBoxMargin type="cpf" label="CPF" value={formData.cpf} setValue={(value) => handleChange('cpf', value)} />
                            </div>
                            <Input hideInputBoxMargin type="email" label="Email" value={formData.email} setValue={(value) => handleChange('email', value)} />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input style={{ width: '100%' }} hideInputBoxMargin type="password" label="Senha" value={formData.senha} setValue={(value) => handleChange('senha', value)} />&nbsp;&nbsp;
                                <Input style={{ width: '100%' }} hideInputBoxMargin type="password" label="Confirmar Senha" value={formData.confirmarSenha} setValue={(value) => handleChange('confirmarSenha', value)} />
                            </div>
                            <Button onClick={handleRegister} className="next-button accont-button">Próximo</Button>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="register-step">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ion-icon name="location" style={{ color: '#5e8975' }}></ion-icon>&nbsp;
                                <h3 className='h3-account'>Endereço</h3>
                            </div>
                            <Input hideInputBoxMargin type="cep" label="CEP" value={formData.cep} setValue={(value) => handleChange('cep', value)} />
                            <Input hideInputBoxMargin type="text" label="Logradouro" value={formData.logradouro} setValue={(value) => handleChange('logradouro', value)} />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input style={{ width: '100%' }} hideInputBoxMargin type="number" label="Número" value={formData.numero} setValue={(value) => handleChange('numero', value)} />&nbsp;&nbsp;
                                <Input style={{ width: '100%' }} hideInputBoxMargin type="text" label="Complemento" value={formData.complemento} setValue={(value) => handleChange('complemento', value)} />
                            </div>
                            <Input hideInputBoxMargin type="text" label="Bairro" value={formData.bairro} setValue={(value) => handleChange('bairro', value)} />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input style={{ width: '100%' }} hideInputBoxMargin type="text" label="Cidade" value={formData.cidade} setValue={(value) => handleChange('cidade', value)} />&nbsp;&nbsp;
                                <Input style={{ width: '100%' }} hideInputBoxMargin type="text" label="Estado" value={formData.estado} setValue={(value) => handleChange('estado', value)} />
                            </div>
                            <div className="accont-button-group">
                                <Button onClick={prevStep} className="back-button accont-button">
                                    <ion-icon name="arrow-back-outline"></ion-icon>
                                </Button>
                                <Button onClick={handleRegister} className="submit-button accont-button">&nbsp;&nbsp;&nbsp;Cadastrar&nbsp;&nbsp;&nbsp;</Button>
                            </div>
                        </div>
                    )}
                </If>
            </div>
        </FragmentView>
    );
};
