import React, { useContext } from 'react';
import './style.css';
import Utils from '../../Utils';
import SpaceBox from '../SpaceBox';
import { MainContext } from '../../helpers/MainContext';

export default () => {

    const {categories, brands} = useContext(MainContext);

    return (
        <footer className='footer' style={{padding: Utils.mobileCheck() ? "10px 20px" : "40px 20px"}}>
            <div className='footer-content'>
                <div className='footer-section'>
                    <h3>Closet Novo</h3>
                    <p>Seu destino para as melhores marcas de luxo.</p>
                    <div className='social-icons'>
                        <a href='#'><ion-icon name="logo-facebook"></ion-icon></a>
                        <a href='#'><ion-icon name="logo-instagram"></ion-icon></a>
                        <a href='#'><ion-icon name="logo-twitter"></ion-icon></a>
                    </div>
                </div>

                <div className='footer-section'>
                    <h4>Perfil</h4>
                    <ul>
                        <li><a href='#'>Meu Perfil</a></li>
                        <li><a href='#'>Meus Produtos</a></li>
                        <li><a href='#'>Meus Endereços</a></li>
                        <li><a href='#'>Fazer Login</a></li>
                        <li><a href='#'>Registre-se</a></li>
                    </ul>
                </div>

                <div className='footer-section'>
                    <h4>Temos & Políticas</h4>
                    <ul>
                        <li><a href='#'>Política de Privacidade</a></li>
                        <li><a href='#'>Termos de Uso</a></li>
                    </ul>
                </div>

                <div className='footer-section'>
                    <h4>Informações</h4>
                    <p><strong>Endereço:</strong> Rua Exemplo, 123, São Paulo, SP</p>
                    <p><strong>Telefone:</strong> (11) 1234-5678</p>
                    <p><strong>Email:</strong> contato@closetnovo.com</p>
                    <div>
                        <img style={{borderRadius: '8px'}} width={'250px'} src='../payment_methods.webp'/>
                    </div>
                </div>
            </div>

            <div className='footer-bottom'>
                <p>&copy; {new Date().getFullYear()} Closet Novo. Todos os direitos reservados.</p>
            </div>
            {Utils.mobileCheck() ? (<SpaceBox space={100} />) : (null)}
        </footer>
    );
}