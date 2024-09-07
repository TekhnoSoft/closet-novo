import React, { useContext, useEffect } from 'react';
import './style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainContext } from '../../helpers/MainContext';
import useCart from '../../hooks/CartHook';

export default ({ pageIndex, setPageIndex }) => {

    const navigator = useNavigate();
    const location = useLocation();

    const hide_in_pages = ["/terms-of-use", "/privacity-policity"];

    const { cart } = useContext(MainContext);

    useEffect(() => {
        const list = document.querySelectorAll(".list");

        function activeLink() {
            list.forEach((item) => {
                item.classList.remove('active');
                this.classList.add('active');
            });
        }

        list.forEach((item) => {
            item.addEventListener('click', activeLink);
        });

        const updatePageIndex = () => {
            const path = location.pathname;
            switch (path) {
                case '/':
                    setPageIndex(1);
                    break;
                case '/favorites':
                    setPageIndex(2);
                    break;
                case '/reservations':
                    setPageIndex(3);
                    break;
                case '/market':
                    setPageIndex(4);
                    break;
                case '/profile':
                    setPageIndex(5);
                    break;
                default:
                    break;
            }
        };

        updatePageIndex();

        return () => {
            list.forEach((item) => {
                item.removeEventListener('click', activeLink);
            });
        };
    }, [location, setPageIndex]);

    const clickSaveButtonIndex = (index, route) => {
        localStorage.setItem("closetnovo_bottomtab_index", index);
        setPageIndex(index);
        navigator(route);
    };

    return (
        hide_in_pages.includes(window.location.pathname) ? (null) : (
            <div className='navigation-container'>
                <div className='navigation'>
                    <ul style={{paddingLeft: 0}}>
                        <li onClick={() => { clickSaveButtonIndex(1, "/") }} className={`list ${pageIndex == 1 ? 'active' : ''}`}>
                            <a href='javascript:void(0)'>
                                <span className='icon'>
                                    {pageIndex == 1 ? (
                                        <ion-icon name={`home`}></ion-icon>
                                    ) : (
                                        <ion-icon name={`home-outline`}></ion-icon>
                                    )}
                                </span>
                                <span className='text'>Início</span>
                            </a>
                        </li>
                        <li onClick={() => { clickSaveButtonIndex(2, "/favorites") }} className={`list ${pageIndex == 2 ? 'active' : ''}`}>
                            <a href='javascript:void(0)'>
                                <span className='icon'>
                                    {pageIndex == 2 ? (
                                        <ion-icon name={`heart`}></ion-icon>
                                    ) : (
                                        <ion-icon name={`heart-outline`}></ion-icon>
                                    )}
                                </span>
                                <span className='text'>Favoritos</span>
                            </a>
                        </li>
                        <li onClick={() => { clickSaveButtonIndex(3, "/reservations") }} className={`list ${pageIndex == 3 ? 'active' : ''}`}>
                            <a href='javascript:void(0)'>
                                <span className='icon'>
                                    {pageIndex == 3 ? (
                                        <ion-icon name={`search`}></ion-icon>
                                    ) : (
                                        <ion-icon name={`search-outline`}></ion-icon>
                                    )}
                                </span>
                                <span className='text'>Pesquisar</span>
                            </a>
                        </li>
                        <li onClick={() => { clickSaveButtonIndex(4, "/cart") }} className={`list ${pageIndex == 4 ? 'active' : ''}`}>
                            <a href='javascript:void(0)'>
                                <span className='icon'>
                                    {pageIndex == 4 ? (
                                        <ion-icon name="bag"></ion-icon>
                                    ) : (
                                        <ion-icon name="bag-outline"></ion-icon>
                                    )}
                                    {cart?.length > 0 ? (<div className='icon-badge'><div>{cart?.length}</div></div>) : (null)}
                                </span>
                                <span className='text'>Sacola</span>
                            </a>
                        </li>
                        <li onClick={() => { clickSaveButtonIndex(5, "/profile") }} className={`list ${pageIndex == 5 ? 'active' : ''}`}>
                            <a href='javascript:void(0)'>
                                <span className='icon'>
                                    {pageIndex == 5 ? (
                                        <ion-icon name={`menu`}></ion-icon>
                                    ) : (
                                        <ion-icon name={`menu-outline`}></ion-icon>
                                    )}
                                </span>
                                <span className='text'>Menu</span>
                            </a>
                        </li>
                        <div className='indicator'></div>
                    </ul>
                </div>
            </div>)
    )
}
