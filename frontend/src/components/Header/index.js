import React, { useState } from 'react';
import './style.css';
import ConstData from '../../helpers/ConstData';
import Utils from '../../Utils';
import Container from '../Container';

export default () => {
    return (
        Utils.mobileCheck() ? (
            <>
                <div className='header-mobile'>
                    <div>
                        <img className='header-logo' src='logo.svg'/>
                        <div className='location-pin'>
                            <ion-icon name="location-outline" size={"large"}></ion-icon>&nbsp;
                            <span>Planaltida-DF, Estância 3...</span>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className='header'>
                    <Container>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <img className='header-logo' src='logo.svg'/>
                            <div className='menu-dropdown'>
                                <ul>
                                    <li className='menu-dropdown-item'>
                                        <span>Marcas</span>&nbsp;
                                        <ion-icon name="chevron-down-outline"></ion-icon>
                                    </li>
                                    <li className='menu-dropdown-item'>
                                        <span>Bolsas</span>&nbsp;
                                        <ion-icon name="chevron-down-outline"></ion-icon>
                                    </li>
                                    <li className='menu-dropdown-item'>
                                        <span>Roupas</span>&nbsp;
                                        <ion-icon name="chevron-down-outline"></ion-icon>
                                    </li>
                                    <li className='menu-dropdown-item'>
                                        <span>Acessorios</span>&nbsp;
                                        <ion-icon name="chevron-down-outline"></ion-icon>
                                    </li>
                                    <li className='menu-dropdown-item'>
                                        <span>Sapados</span>&nbsp;
                                        <ion-icon name="chevron-down-outline"></ion-icon>
                                    </li>
                                    <li className='menu-dropdown-item'>
                                        <span>Novos</span>&nbsp;
                                        <ion-icon name="chevron-down-outline"></ion-icon>
                                    </li>
                                </ul>
                            </div>
                            <b className='text-primary-color bold cursor-pointer'>COMEÇE A VENDER</b>
                        </div>
                    </Container>
                </div>
            </>
        )
    );
};
