import React, { useEffect, useState } from 'react';
import './style.css';
import Container from '../Container';

const startLogics = () => {
    const body = document.querySelectorAll('.sidebar-body')[0],
        sidebar = body.querySelector('nav'),
        toggle = body.querySelector(".toggle");
    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
    })
};

export default ({ children }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
        startLogics();
        return () => {
            startLogics();
        }
    }, []);

    return (
        <>
            <div className='sidebar-body'>
                <nav className="sidebar close">
                    <header className='sidebar-header'>
                        <div className="image-text">
                            <span className="image">
                                <img src="../favicon.ico" alt="" />
                            </span>
                            <div className="text logo-text">
                                <span className="name">Closet Novo</span>
                                <span className="profession">Olá, Marcos!</span>
                            </div>
                        </div>
                        <i className='bx bx-chevron-right toggle'>
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </i>
                    </header>
                    <div className="menu-bar">
                        <div className="sidebar-menu">
                            <ul className="menu-links" style={{padding: '0px'}}>
                                <li className="nav-link">
                                    <a href="#">
                                        <i className='icon' >
                                            <ion-icon name="home-outline"></ion-icon>
                                        </i>
                                        <span className="text nav-text">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-link" style={{display: 'block !important'}}>
                                    <a href="#" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <i className='icon' >
                                                <ion-icon name="stats-chart-outline"></ion-icon>
                                            </i>
                                            <span className="text nav-text">Produtos</span>
                                        </div>
                                        <div className="sidebar-chevron-link" style={{display: 'flex', alignItems: 'center'}}>
                                            <ion-icon name="chevron-down-outline"></ion-icon>&nbsp;&nbsp;
                                        </div>
                                    </a>
                                    <div>
                                        
                                    </div>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <i className='bx bx-bell icon'><ion-icon name="notifications-outline"></ion-icon></i>
                                        <span className="text nav-text">Notifications</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <i className='bx bx-pie-chart-alt icon' ><ion-icon name="pie-chart-outline"></ion-icon></i>
                                        <span className="text nav-text">Analytics</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <i className='bx bx-heart icon' ><ion-icon name="heart-outline"></ion-icon></i>
                                        <span className="text nav-text">Likes</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <i className='bx bx-wallet icon' ><ion-icon name="wallet-outline"></ion-icon></i>
                                        <span className="text nav-text">Wallets</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="bottom-content">
                            <li className="">
                                <a href="#">
                                    <i className='bx bx-log-out icon' ><ion-icon name="log-out-outline"></ion-icon></i>
                                    <span className="text nav-text">Sair</span>
                                </a>
                            </li>
                        </div>
                    </div>
                </nav>
                <section className="home">
                    <Container>
                        {children}
                    </Container>
                </section>

            </div>
        </>
    );
};
