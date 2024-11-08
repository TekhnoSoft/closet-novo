import React, { useContext, useState } from 'react';
import './style.css';
import { Button, FragmentView, SpaceBox } from '../../components';
import { MainContext } from '../../helpers/MainContext';
import Utils from '../../Utils';

const menuItems = [
    {
        name: "Marcas",
        subItems: [
            "Adidas", "Nike", "Puma", "Reebok", "Under Armour",
            "New Balance", "Asics", "Vans", "Converse", "Fila"
        ]
    },
    {
        name: "Bolsas",
        subItems: [
            "Bolsa Tote", "Bolsa Crossbody", "Bolsa de Ombro",
            "Bolsa Clutch", "Bolsa Backpack", "Bolsa de Coração",
            "Bolsa de Praia", "Bolsa de Viagem", "Bolsa de Lona", "Bolsa de Couro"
        ]
    },
    {
        name: "Roupas",
        subItems: [
            "Camiseta", "Calça Jeans", "Jaqueta", "Vestido",
            "Shorts", "Saia", "Camisa", "Moletom",
            "Blusa", "Roupa de Banho"
        ]
    },
    {
        name: "Acessórios",
        subItems: [
            "Cinto", "Relógio", "Óculos de Sol", "Bijuterias",
            "Chapéu", "Cachecol", "Luvas", "Meia",
            "Pulseira", "Brinco"
        ]
    },
    {
        name: "Sapatos",
        subItems: [
            "Tênis", "Bota", "Sandalha", "Sapato Social",
            "Chinelo", "Botinha", "Oxford", "Mocassim",
            "Sapato de Festa", "Tênis de Corrida"
        ]
    }
];

export default () => {

    const { user, logout } = useContext(MainContext);

    const [showSubmenu, setShowSubmenu] = useState(null);

    const toggleSubmenu = (index) => {
        setShowSubmenu(showSubmenu === index ? null : index);
    };

    const handleLogout = () => {
        logout(true);
    }

    const handleGoSell = () => {
        
    }

    return (
        <FragmentView>
            <div className='menu'>
                <ul className='menu-list'>
                    {user && (
                        <li className='menu-item menu-unique-item'>
                            <div className='menu-unique-title'>
                                &nbsp;<ion-icon name="person-outline"></ion-icon>&nbsp;
                                <span>Perfil</span>
                            </div>
                        </li>
                    )}
                    {menuItems.map((item, index) => (
                        <li key={index} className='menu-item'>
                            <div
                                className='menu-title'
                                onClick={() => toggleSubmenu(index)}
                            >
                                {item.name}
                                <ion-icon
                                    name="chevron-down-outline"
                                    className={showSubmenu === index ? 'rotate' : ''}
                                />
                            </div>
                            <ul className={`submenu-list ${showSubmenu === index ? 'show' : ''}`}>
                                <SpaceBox space={5} />
                                {item.subItems.map((subItem, subIndex) => (
                                    <li key={subIndex} className='submenu-item'>
                                        {subItem}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                    {user && (
                        <>
                            <li className='menu-item menu-unique-item'>
                                <div className='menu-unique-title'>
                                    &nbsp;<ion-icon name="settings-outline"></ion-icon>&nbsp;
                                    <span>Configurações</span>
                                </div>
                            </li>
                            <li className='menu-item menu-unique-item' onClick={handleLogout}>
                                <div className='menu-unique-title'>
                                    &nbsp;<ion-icon name="log-out-outline"></ion-icon>&nbsp;
                                    <span>sair</span>
                                </div>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <SpaceBox space={20} />
            <Button onClick={handleGoSell} style={{ width: '100%' }}>
                <b>COMEÇE A VENDER</b>
            </Button>
            <SpaceBox space={20} />
        </FragmentView>
    );
};
