import React from 'react';
import './style.css';
import Utils from '../../Utils';
import SpaceBox from '../SpaceBox';

export default () => {
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
                    <h4>Marcas</h4>
                    <ul>
                        <li><a href='#'>Gucci</a></li>
                        <li><a href='#'>Louis Vuitton</a></li>
                        <li><a href='#'>Prada</a></li>
                        <li><a href='#'>Balenciaga</a></li>
                    </ul>
                </div>

                <div className='footer-section'>
                    <h4>Gêneros</h4>
                    <ul>
                        <li><a href='#'>Masculino</a></li>
                        <li><a href='#'>Feminino</a></li>
                        <li><a href='#'>Unisex</a></li>
                    </ul>
                </div>

                <div className='footer-section'>
                    <h4>Perfil</h4>
                    <ul>
                        <li><a href='#'>Endereços</a></li>
                        <li><a href='#'>Meus Produtos</a></li>
                        <li><a href='#'>Configurações</a></li>
                        <li><a href='#'>Fazer Login</a></li>
                        <li><a href='#'>Registre-se</a></li>
                    </ul>
                </div>

                <div className='footer-section'>
                    <h4>Informações</h4>
                    <ul>
                        <li><a href='#'>Política de Privacidade</a></li>
                        <li><a href='#'>Termos de Uso</a></li>
                    </ul>
                    <p><strong>Endereço:</strong> Rua Exemplo, 123, São Paulo, SP</p>
                    <p><strong>Telefone:</strong> (11) 1234-5678</p>
                    <p><strong>Email:</strong> contato@closetnovo.com</p>
                </div>
            </div>

            <div className='footer-bottom'>
                <p>&copy; 2024 Closet Novo. Todos os direitos reservados.</p>
            </div>
            {Utils.mobileCheck() ? (<SpaceBox space={70} />) : (null)}
        </footer>
    );
}