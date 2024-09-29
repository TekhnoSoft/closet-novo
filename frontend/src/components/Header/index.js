import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import ConstData from '../../helpers/ConstData';
import Utils from '../../Utils';
import Container from '../Container';
import Modal from '../Modal';
import { MainContext } from '../../helpers/MainContext';
import Input from '../Input';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

export default () => {

    const navigate = useNavigate();

    const { user, cart } = useContext(MainContext);

    const [searchModal, setSearchModal] = useState(false);
    const [search, setSearch] = useState(null);

    const handleSearch = () => {
        setSearchModal(true);
    }

    const onCloseCallback = () => {
        setSearch(null);
    }

    const handleHome = () => {
        navigate("/");
    }

    const handleCart = () => {
        navigate("/cart");
    }

    const handleSubmit = (e) => {
        e?.preventDefault(); 
        localStorage.setItem("search_text", search || "");
        setSearchModal(false);
        setSearch(null);
        navigate(`/search`);
    }

    return (
        Utils.mobileCheck() ? (
            <>
                <div className='header-mobile'>
                    <div>
                        <img className='header-logo' src='../logo.svg'/>
                        <div className='location-pin'>
                            {user ? (
                                <>
                                    <div style={{width: '25px', display: 'flex', alignItems: 'center'}}>
                                        <ion-icon name="location-outline" size={"large"}></ion-icon>
                                    </div>&nbsp;
                                    <span>Planaltida-DF, Estância 3...</span>
                                </>
                            ) : (
                                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <div style={{width: '25px', display: 'flex', alignItems: 'center'}}>
                                        <ion-icon name="person-outline" style={{fontSize: '14pt', color: '#5e8975'}}></ion-icon>
                                    </div>&nbsp;
                                    <span>Login / Registre-se</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <>
                <Modal setShow={setSearchModal} show={searchModal} onCloseCallback={onCloseCallback}>
                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                        <form style={{width: '100%'}} onSubmit={handleSubmit}>
                            <Input id={'input'} style={{width: '100%', borderTopRightRadius: '0px', borderBottomRightRadius: '0px'}} value={search} setValue={setSearch} type={"search"} label={"Pesquisar produto..."}/>
                        </form>
                        <Button onClick={handleSubmit} style={{height: '50px', width: '60px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px'}}>
                            <ion-icon style={{fontSize: '16pt'}} name="search-outline"></ion-icon>
                        </Button>
                    </div>
                </Modal>
                <div className='header'>
                    <Container>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <img onClick={handleHome} className='header-logo' src={'../logo.svg'}/>
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
                            &nbsp;&nbsp;<b className='text-primary-color bold cursor-pointer'>COMEÇE&nbsp;A&nbsp;VENDER</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                <div onClick={handleSearch} style={{cursor: 'pointer'}}>
                                    <ion-icon style={{fontSize: '16pt'}} name="search-outline"></ion-icon>
                                </div>&nbsp;&nbsp;&nbsp;
                                <div style={{cursor: 'pointer'}}>
                                    <ion-icon style={{fontSize: '16pt'}} name="person-outline"></ion-icon>
                                </div>&nbsp;&nbsp;&nbsp;
                                <div onClick={handleCart} style={{cursor: 'pointer'}}>
                                    <ion-icon style={{fontSize: '16pt'}} name="bag-outline"></ion-icon>
                                    {cart?.length > 0 ? (<div className='icon-badge'><div>{cart?.length}</div></div>) : (null)}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </>
        )
    );
};
