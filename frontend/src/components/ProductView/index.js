import React, { useContext, useState } from 'react';
import './style.css';
import { MainContext } from '../../helpers/MainContext';
import { useNavigate } from 'react-router-dom';
import AccountModal from '../AccountModal';

export default ({index, product}) => {

  const { user } = useContext(MainContext);

  const navigate = useNavigate();

  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/product/${product?.id_product}`);
  }

  const handleFavorite = () => {
    const validUser = user != null || !user;
    setShowAccountModal(validUser);
    if(validUser){}
  }

  return (
    <>
      <AccountModal show={showAccountModal} setShow={setShowAccountModal} />
      <div key={index} className="product-item">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'right', width: '100%'}}>
            <span style={{background: '#5e8975', color: 'white', fontWeight: 'bold', padding: '0 5px 0 5px', borderRadius: '6px 0 6px 0'}}>{product?.condition?.toLowerCase()}</span>
            <ion-icon onClick={handleFavorite} name="heart-outline" style={{cursor: 'pointer', color: '#5e8975', fontSize: '16pt'}}></ion-icon>
          </div>
          <img onClick={handleClick} src={product.images[0]} alt={product.name} className="product-image" />
          <div onClick={handleClick} className="product-info">
              <div>
                  <span className="product-name">{product.name}</span>
              </div>
              <div>
                <span style={{fontSize: '12px'}}>Outras Lojas: </span>
                <span className="product-price-q">{Number(product.price)?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
              </div>
              <div>
                  <span style={{fontSize: '12px'}}>Closet Novo: </span>
                  <span className="product-price" style={{justifyContent: 'center'}}>{Number(product.price)?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
              </div>
          </div>
      </div>
    </>
  )
}
