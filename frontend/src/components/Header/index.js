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
import AccountModal from '../AccountModal';

export default () => {

    const navigate = useNavigate();

    const { user, cart, categories, brands } = useContext(MainContext);

    const [showAccountModal, setShowAccountModal] = useState(false);

    const [searchModal, setSearchModal] = useState(false);
    const [search, setSearch] = useState(null);

    const [address, setAddress] = useState(null);

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        let address = user?.addresses?.filter(a => { return a.selected})[0];
        let displayFullAddress = `${address?.city}-${address?.state}, ${address?.number}${address?.complement}, ${address?.neighborhood}, ${address?.street}`;
        setAddress(displayFullAddress);
    }, [user])

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

    const [hoveredItem, setHoveredItem] = useState(null);

    const handleSearch = () => {
        setSearchModal(true);
    }

    const onCloseCallback = () => {
        setSearch(null);
    }

    const handleHome = () => {
        navigate("/");
    }

    const handleProfile = () => {
        setShowAccountModal(user == null || !user)
        if(user){
            navigate("/profile")
        }
    }

    const handleFavorites = () => {
        setShowAccountModal(user == null || !user)
        if(user){
            navigate("/favorites")
        }
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

    const handleGoSell = () => {
        if(user){
            localStorage.setItem("profile_navigation_index", "Produtos");
            navigate('/profile')
        }else{
            setShowAccountModal(true);
        }
    }

    const handleToSearchLink = (linkType, linkId, name) => {
        switch(linkType){
            case "marcas":
                localStorage.setItem("tk_beauty_search_by_brand", JSON.stringify({id: linkId, name: name}));
                break;
            case "categorias":
                localStorage.setItem("tk_beauty_search_by_category", JSON.stringify({id: linkId, name: name}));
                break;
        }
        if(window.location.pathname == "/search"){
            window.location.reload();
        }else{
            navigate("/search");
        }
    }

    const handleToSearchSituation = () => {
        localStorage.setItem("tk_beauty_search_by_situation", 1);
        if(window.location.pathname == "/search"){
            window.location.reload();
        }else{
            navigate("/search");
        }
    }

    return (
        Utils.mobileCheck() ? (
            <>
                <AccountModal show={showAccountModal} setShow={setShowAccountModal} />
                <div className='header-mobile'>
                    <div>
                        <img onClick={handleHome} className='header-logo' src='../logo.svg' style={{width: '120px'}} />
                        <div className='location-pin'>
                            {user ? (
                                <>
                                    <div style={{ width: '25px', display: 'flex', alignItems: 'center' }}>
                                        <ion-icon name="location-outline" size={"large"}></ion-icon>
                                    </div>&nbsp;
                                    <span>{address}</span>
                                </>
                            ) : (
                                <div onClick={handleProfile} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '25px', display: 'flex', alignItems: 'center' }}>
                                        <ion-icon name="person-outline" style={{ fontSize: '14pt', color: '#5e8975' }}></ion-icon>
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
                <AccountModal show={showAccountModal} setShow={setShowAccountModal} />
                <Modal setShow={setSearchModal} show={searchModal} onCloseCallback={onCloseCallback}>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                            <Input id={'input'} style={{ width: '100%', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} value={search} setValue={setSearch} type={"search"} label={"Pesquisar produto..."} />
                        </form>
                        <Button onClick={handleSubmit} style={{ height: '50px', width: '60px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>
                            <ion-icon style={{ fontSize: '16pt' }} name="search-outline"></ion-icon>
                        </Button>
                    </div>
                </Modal>
                <div className='header'>
                    <Container>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <img onClick={handleHome} className='header-logo' src={'../logo.svg'} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <div className='location-pin'>
                                    {user ? (
                                        <>
                                            <div style={{ width: '25px', display: 'flex', alignItems: 'center' }}>
                                                <ion-icon name="location-outline" size={"large"}></ion-icon>
                                            </div>&nbsp;
                                            <span>{address}</span>
                                        </>
                                    ) : (
                                        <div onClick={handleProfile} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ width: '25px', display: 'flex', alignItems: 'center' }}>
                                                <ion-icon name="person-outline" style={{ fontSize: '14pt', color: '#5e8975' }}></ion-icon>
                                            </div>&nbsp;
                                            <span>Login / Registre-se</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='menu-dropdown'>
                                <ul>
                                    {menuItems.map((item, index) => (
                                        <li
                                            key={index}
                                            className='menu-dropdown-item'
                                            onMouseEnter={() => setHoveredItem(index)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            <span>{item.name}</span>&nbsp;
                                            <ion-icon name="chevron-down-outline"></ion-icon>
                                            {hoveredItem === index && (
                                                <div className="dropdown-content" style={{height: '400px', overflow: 'auto'}}>
                                                    {item.subItems.map((subItem, subIndex) => (
                                                        <div key={subIndex} onClick={() => {handleToSearchLink(item?.id, subItem.id, subItem.name)}}>{subItem.name}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                    <li className='menu-dropdown-item' onClick={handleToSearchSituation}>Novos</li>
                                </ul>
                            </div>
                            &nbsp;&nbsp;<b className='text-primary-color bold cursor-pointer' onClick={handleGoSell}>COMEÇE&nbsp;A&nbsp;VENDER</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <div onClick={handleSearch} style={{ cursor: 'pointer' }}>
                                    <ion-icon style={{ fontSize: '16pt' }} name="search-outline"></ion-icon>
                                </div>&nbsp;&nbsp;&nbsp;
                                <div onClick={handleProfile} style={{ cursor: 'pointer' }}>
                                    <ion-icon style={{ fontSize: '16pt' }} name="person-outline"></ion-icon>
                                </div>&nbsp;&nbsp;&nbsp;
                                <div onClick={handleFavorites} style={{ cursor: 'pointer' }}>
                                    <ion-icon style={{ fontSize: '16pt' }} name="heart-outline"></ion-icon>
                                </div>&nbsp;&nbsp;&nbsp;
                                <div onClick={handleCart} style={{ cursor: 'pointer' }}>
                                    <ion-icon style={{ fontSize: '16pt' }} name="bag-outline"></ion-icon>
                                    {cart?.cart?.length > 0 ? (<div className='icon-badge'><div>{cart?.cart?.length}</div></div>) : (null)}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </>
        )
    );
};
