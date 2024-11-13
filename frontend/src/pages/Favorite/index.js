import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { AccountModal, Button, FragmentView, SpaceBox } from '../../components';
import GridProductView from '../../components/GridProductView';
import ConstData from '../../helpers/ConstData';
import { MainContext } from '../../helpers/MainContext';
import { useNavigate } from 'react-router-dom';
import Api from '../../Api';

export default () => {

    const navigate = useNavigate();

    const { user, favorites } = useContext(MainContext);

    const [showAccountModal, setShowAccountModal] = useState(false);

    return (
        <FragmentView noPaddingContainer>
            <AccountModal show={showAccountModal} setShow={setShowAccountModal} />
            <div className='favorite-container'>
                {user ? (
                    <GridProductView transparency noAction title={`Seus Favoritos (${favorites.length})`} icon={null} products={favorites} />
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <SpaceBox space={20} />
                            <img src='../hero2.png' width={300} />
                            <p>Faça login para ver seus favoritos.</p>
                            <SpaceBox space={5} />
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button className="checkout-button" onClick={() => setShowAccountModal(true)}>
                                    <b>&nbsp;&nbsp;&nbsp;Fazer Login&nbsp;&nbsp;&nbsp;</b>
                                </Button>
                            </div>
                            <SpaceBox space={15} />
                        </div>
                    </div>
                )}
            </div>
        </FragmentView>
    )
}
