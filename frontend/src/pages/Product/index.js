import React, { useContext, useEffect, useState } from 'react';
import { AccountModal, Button, FragmentView, If, SpaceBox } from '../../components';
import './style.css';
import Utils from '../../Utils';
import GridProductView from '../../components/GridProductView';
import { MainContext } from '../../helpers/MainContext';
import ConstData from '../../helpers/ConstData';
import { useParams } from 'react-router-dom';
import Api from '../../Api';

const startupLogics = () => {
  const sliderMainImage = document.getElementById("product-main-image");
  const sliderImageList = document.querySelectorAll(".image-list");
  for (let i = 0; i < sliderImageList.length; i++) {
    sliderImageList[i].onclick = function () {
      sliderMainImage.src = sliderImageList[i].src;
    };
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

const ProductImages = ({ user, product, favorites, onLoadFavorites }) => {

  const [mainImage, setMainImage] = useState(product?.images[0]?.path);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [favProd, setFavProd] = useState([]);

  useEffect(() => {
    setMainImage(product?.images[0]?.path);
  }, [product])

  useEffect(() => {
    if (user) {
      let favProducts = favorites?.map(favorite => favorite.product)
      setFavProd(favProducts);
    }
  }, [favorites])

  const isFavorite = () => {
    return favProd.some(p => p.id === product?.id);
  };

  const handleFavorite = async () => {
    const validUser = user != false;
    setShowAccountModal(validUser == false);
    if (validUser) {
      let token = Utils.getClientToken();
      if (isFavorite()) {
        Utils.toast({ type: "success", text: "Produto removido dos favoritos!" })
      } else {
        Utils.toast({ type: "success", text: "Produto adicionado aos favoritos!" })
      }
      await Api.user.favoriteThis({ forceToken: token, product_id: product?.id }).then(async data => {
        onLoadFavorites(token);
      })
    }
  }

  return (
    <>
      <AccountModal show={showAccountModal} setShow={setShowAccountModal} />
      <div className="product-image-v">
        <div className="product-image-main">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', textAlign: 'right', width: '100%' }}>
            <ion-icon onClick={handleFavorite} name={isFavorite() ? `heart` : `heart-outline`} style={{ cursor: 'pointer', color: '#5e8975', fontSize: '16pt' }}></ion-icon>
          </div>
          <img src={mainImage} alt="Product main" id="product-main-image" />
        </div>
        <div className="product-image-slider">
          {product.images?.map((item, index) => (
            <img
              key={index}
              src={item.path}
              alt={`Product image ${index}`}
              className="image-list"
              onClick={() => setMainImage(item?.path)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const ProductInfo = ({ product, handleAddToCart }) => (
  <div className="product">
    <div className="breadcrumb">
      <span><a href="#">Início</a></span>
      <span><a href="#">{product?.category?.name}</a></span>
      <span className="active">{product?.name}</span>
    </div>

    <div className="product-title"><h2>{product.name}</h2></div>
    <div className="product-rating"><span className="review">Ref: <b>{product?.ref}</b></span></div>
    <div className="product-rating"><span className="review">Categoria: <b>{product?.category?.name}</b></span></div>
    <div className="product-rating"><span className="review">Situação: <b>{getSituation(product?.situation)}</b></span></div>

    <div className="product-price">
      <span className="offer-price">{Utils.formatBRL(product.price)}</span>
      <span className="sale-price">{Utils.formatBRL(product.other_price)}</span>
    </div>

    <div className="product-details">
      <h3>Descrição</h3>
      <p>{product.description}</p>
    </div>

    <Button onClick={handleAddToCart} style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
      <ion-icon name="bag-outline"></ion-icon>&nbsp;<b>Comprar Agora</b>
    </Button>
  </div>
);

const ProductView = ({ user, product, products, handleAddToCart, favorites, onLoadFavorites, onLoadProduct }) => {
  const isMobile = Utils.mobileCheck();

  return (
    <div className="container" style={{padding: Utils.mobileCheck() ? '20px 1px' : undefined}}>
      <div className="single-product">
        <div className="row">
          <div className={`col-6 product-images ${isMobile ? 'mobile-images' : ''}`}>
            <ProductImages user={user} product={product} favorites={favorites} onLoadFavorites={onLoadFavorites} />
          </div>
          <div className="col-6">
            <ProductInfo product={product} handleAddToCart={handleAddToCart} />
          </div>
        </div>
        <SpaceBox space={15} />
        <GridProductView transparency noAction noPadding title="Recomendados pra você!" icon={null} products={products} onLoadProduct={onLoadProduct} />
      </div>
    </div>
  );
};

export default () => {

  const { id } = useParams();

  const { user, cart, favorites, onLoadFavorites } = useContext(MainContext);

  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    startupLogics();
    getProduct(id);
  }, [])

  useEffect(() => {
    if (product) {
      loadRecommendedProducts(product);
    }
  }, [product])

  const getProduct = async (id) => {
    await Api.general.product({ id }).then(async data => {
      setProduct(data.data);
    })
  }

  const loadRecommendedProducts = async (product) => {
    await Api.general.productsByCategory({ category_id: product.category_id, product_id: product?.id }).then(async data => {
      setProducts(data?.data);
    })
  }

  const handleAddToCart = () => {
    cart.addToCart(product, 1);
    Utils.toast({
      type: "success",
      text: "Produto adicionado a sacola!"
    })
  }

  return (
    <FragmentView>
      <SpaceBox space={Utils.mobileCheck() ? 0 : 25} />
      {product && <ProductView user={user} product={product} products={products} handleAddToCart={handleAddToCart} favorites={favorites} onLoadFavorites={onLoadFavorites} onLoadProduct={getProduct} />}
    </FragmentView>
  )
}

