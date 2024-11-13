import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { MainContext } from '../../helpers/MainContext';
import { useNavigate } from 'react-router-dom';
import AccountModal from '../AccountModal';
import Api from '../../Api';
import Utils from '../../Utils';

export default ({ index, product, onLoadProduct }) => {

  const { user, favorites, onLoadFavorites } = useContext(MainContext);

  const navigate = useNavigate();

  const [showAccountModal, setShowAccountModal] = useState(false);
  const [favProd, setFavProd] = useState([]);

  useEffect(() => {
    if(user){
      let favProducts = favorites?.map(favorite => favorite.product)
      setFavProd(favProducts);
    }
  }, [favorites])

  const isFavorite = () => {
      return favProd.some(p => p.id === product?.id);
  };

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/product/${product?.id}`);
    if(onLoadProduct){
      onLoadProduct(product?.id);
    }
  }

  const handleFavorite = async () => {
    const validUser = user != false;
    setShowAccountModal(validUser == false);
    if (validUser) {
      let token = Utils.getClientToken();
      if(isFavorite()){
        Utils.toast({type: "success", text: "Produto removido dos favoritos!"})
      }else{
        Utils.toast({type: "success", text: "Produto adicionado aos favoritos!"})
      }
      await Api.user.favoriteThis({forceToken: token, product_id: product?.id}).then(async data => {
        onLoadFavorites(token);
      })
    }
  }

  const getSituation = (s) => {
    switch (s) {
      case "N":
        return "Novo";
      case "U":
        return "Usado";
    }
  }

  return (
    <>
      <AccountModal show={showAccountModal} setShow={setShowAccountModal} />
      <div key={index} className="product-item">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'right', width: '100%' }}>
          <span style={{ background: '#5e8975', color: 'white', fontWeight: 'bold', padding: '0 5px 0 5px', borderRadius: '6px 0 6px 0' }}>{getSituation(product?.situation)}</span>
          <ion-icon onClick={handleFavorite} name={isFavorite() ? `heart` : `heart-outline`} style={{ cursor: 'pointer', color: '#5e8975', fontSize: '16pt' }}></ion-icon>
        </div>
        <img onClick={handleClick} src={product?.images[0]?.path || ""} className="product-image" />
        <div onClick={handleClick} className="product-info">
          <div>
            <span className="product-name">{product?.name}</span>
          </div>
          <div>
            <span style={{ fontSize: '12px' }}>Outras Lojas: </span>
            <span className="product-price-q">{Number(product?.other_price)?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          <div>
            <span style={{ fontSize: '12px' }}>Closet Novo: </span>
            <span className="product-price" style={{ justifyContent: 'center' }}>{Number(product?.price)?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        </div>
      </div>
    </>
  )
}
