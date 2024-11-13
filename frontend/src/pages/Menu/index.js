import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { Button, FragmentView, SpaceBox } from '../../components';
import { MainContext } from '../../helpers/MainContext';
import { useNavigate } from 'react-router-dom';

export default () => {

    const navigate = useNavigate();

    const { user, logout, brands, categories } = useContext(MainContext);

    const [showSubmenu, setShowSubmenu] = useState(null);

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        setMenuItems([
            {
                id: "marcas",
                name: "Marcas",
                subItems: brands
            },
            {
                id: "categorias",
                name: "Categorias",
                subItems: categories
            },
        ])
    }, [brands, categories])

    const handleToSearchLink = (linkType, linkId, name) => {
        switch(linkType){
            case "marcas":
                localStorage.setItem("tk_beauty_search_by_brand", JSON.stringify({id: linkId, name: name}));
                break;
            case "categorias":
                localStorage.setItem("tk_beauty_search_by_category", JSON.stringify({id: linkId, name: name}));
                break;
        }
        navigate("/search");
    }

    const handlePofile = () => {
        navigate("/profile");
    }

    const toggleSubmenu = (index) => {
        setShowSubmenu(showSubmenu === index ? null : index);
    };

    const handleLogout = () => {
        logout(true);
    }

    const handleGoSell = () => {
        localStorage.setItem("profile_navigation_index", "Produtos");
        navigate("/profile");
    }

    return (
        <FragmentView>
            <div className='menu'>
                <ul className='menu-list'>
                    {user && (
                        <li onClick={handlePofile} className='menu-item menu-unique-item'>
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
                                    <li key={subIndex} onClick={() => {handleToSearchLink(item.id, subItem.id, subItem.name)}} className='submenu-item'>
                                        {subItem.name}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}

                    <li className='menu-item menu-unique-item'>
                        <div className='menu-unique-title'>
                            &nbsp;<ion-icon name="newspaper-outline"></ion-icon>&nbsp;
                            <span>Política de Privacidade</span>
                        </div>
                    </li>
                    <li className='menu-item menu-unique-item'>
                        <div className='menu-unique-title'>
                            &nbsp;<ion-icon name="shield-half-outline"></ion-icon>&nbsp;
                            <span>Termos de Uso</span>
                        </div>
                    </li>

                    {user && (
                        <>
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
