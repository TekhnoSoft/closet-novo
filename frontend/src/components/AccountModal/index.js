import React, { useContext, useState } from 'react';
import { MainContext } from '../../helpers/MainContext';
import If from '../If';
import Modal from '../Modal';
import Button from '../Button';
import Input from '../Input';
import './style.css';
import Utils from '../../Utils';
import { useNavigate } from 'react-router-dom';
import Api from '../../Api';
import StatusResponse from '../../helpers/StatusResponse';

export default ({ show, setShow }) => {
    
    const navigate = useNavigate();
    
    const { user, setUser } = useContext(MainContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        setShow(false);
        navigate("/register");
    }

    const handleLogin = async () => {
        if (!email?.trim()) {
            return Utils.toast({ type: "error", text: "Digite seu email." });
        }
        if (!password?.trim()) {
            return Utils.toast({ type: "error", text: "Digite sua senha." });
        }
    
        try {
            const data = await Api.user.login({ email, password });
    
            if (data?.status !== StatusResponse.isOk()) {
                return Utils.toast({ type: "error", text: data?.response?.data?.message || "Email/Senha incorretos." });
            }
    
            Utils.toast({ type: "success", text: "Logado com sucesso!" });
            const token = data?.data?.token;
            await localStorage.setItem("closetnovo_cliente_token", token);
    
            const dataAuth = await Api.user.get(token);
    
            if (dataAuth?.status === StatusResponse.isOk()) {
                Utils.toast("success", "Logado com sucesso!");
                setUser(dataAuth?.data);
                setShow(false);
                //navigate("/");
            }
    
        } catch (err) {
            Utils.toast({ type: "error", text: err?.message || "Ocorreu um erro durante o login." });
        }
    };

    return (
        <If condition={user == null || !user} elseComponent={null}>
            <Modal childrenPadding={Utils.mobileCheck() ? "10px" : "20px"} show={show} setShow={setShow}>
                <div className="login-container">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: Utils.mobileCheck() ? 'start' : 'start', width: '100%'}}>
                        <img width={Utils.mobileCheck() ? 150 : 200} src='../hero3.png'/>
                        <div style={{}}>
                            <h2 className="login-title">Login</h2>
                            <h5>Olá, seja bem vindo ao <span style={{color: '#5e8975', fontWeight: 'bold'}}>Closet Novo</span>!</h5>
                        </div>
                    </div>
                    <div className="login-form">
                        <div className="input-group">
                            <div className='input-group-div'>
                                <ion-icon name="person-outline" className="input-icon"></ion-icon>
                            </div>
                            <Input 
                                type="email" 
                                label="Email" 
                                value={email} 
                                setValue={setEmail} 
                                style={{width: '100%', marginLeft: '-4px'}}
                            />
                        </div>
                        <div className="input-group">
                            <div className='input-group-div'>
                                <ion-icon name="lock-closed-outline" className="input-icon"></ion-icon>
                            </div>
                            <Input 
                                type="password" 
                                label="Senha" 
                                value={password} 
                                setValue={setPassword} 
                                style={{width: '100%', marginLeft: '-4px'}}
                            />
                        </div>
                        <Button className="login-button" onClick={handleLogin}>
                            <b>Entrar</b>
                        </Button>
                    </div>
                    <p className="create-account">
                        Não tem uma conta? <b onClick={handleRegister}>Registre-se.</b>
                    </p>
                </div>
            </Modal>
        </If>
    );
};