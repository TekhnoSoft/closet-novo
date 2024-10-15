import React, { useContext, useState } from 'react';
import { MainContext } from '../../helpers/MainContext';
import If from '../If';
import Modal from '../Modal';
import Button from '../Button';
import Input from '../Input';
import './style.css';
import Utils from '../../Utils';

export default ({ show, setShow }) => {
    const { user } = useContext(MainContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <If condition={user == null || !user} elseComponent={null}>
            <Modal childrenPadding={Utils.mobileCheck() ? "10px" : "20px"} show={show} setShow={setShow}>
                <div className="login-container">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: Utils.mobileCheck() ? 'start' : 'center', width: '100%'}}>
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
                                style={{width: '100%', marginLeft: '-2px'}}
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
                                style={{width: '100%', marginLeft: '-2px'}}
                            />
                        </div>
                        <Button className="login-button" onClick={() => {/* lógica de login */}}>
                            <b>Entrar</b>
                        </Button>
                    </div>
                    <p className="create-account">
                        Não tem uma conta? <b>Crie uma.</b>
                    </p>
                </div>
            </Modal>
        </If>
    );
};