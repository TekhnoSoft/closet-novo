import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, FragmentView, If, SpaceBox } from '../../components';
import './style.css';
import Utils from '../../Utils';
import GridProductView from '../../components/GridProductView';
import { MainContext } from '../../helpers/MainContext';

const startupLogics = () => {
    const sliderMainImage = document.getElementById("product-main-image");
    const sliderImageList = document.querySelectorAll(".image-list");
    for (let i = 0; i < sliderImageList.length; i++) {
        sliderImageList[i].onclick = function () {
            sliderMainImage.src = sliderImageList[i].src;
        };
    }
}

const ProductImages = ({ images }) => {
    const [mainImage, setMainImage] = useState(images[0]);
  
    return (
      <div className="product-image-v">
        <div className="product-image-main">
          <img src={mainImage} alt="Product main" id="product-main-image" />
        </div>
        <div className="product-image-slider">
          {images?.map((item, index) => (
            <img
              key={index}
              src={item}
              alt={`Product image ${index}`}
              className="image-list"
              onClick={() => setMainImage(item)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  const ProductInfo = ({ product, handleAddToCart }) => (
    <div className="product">
      <div className="breadcrumb">
        <span><a href="#">Início</a></span>
        <span><a href="#">Produto</a></span>
        <span className="active">Bolsa</span>
      </div>
  
      <div className="product-title"><h2>{product.name}</h2></div>
      <div className="product-rating"><span className="review">Ref: <b>{product.ref}</b></span></div>
      <div className="product-rating"><span className="review">Categoria: <b>{product.category}</b></span></div>
      <div className="product-rating"><span className="review">Situação: <b>{product.condition}</b></span></div>
  
      <div className="product-price">
        <span className="offer-price">R$ {product.offerPrice}</span>
        <span className="sale-price">R$ {product.salePrice}</span>
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
  
  const ProductView = ({ product, products, handleAddToCart }) => {
    const isMobile = Utils.mobileCheck();
  
    return (
      <div className="container">
        <div className="single-product">
          <div className="row">
            <div className={`col-6 product-images ${isMobile ? 'mobile-images' : ''}`}>
              <ProductImages images={product.images} />
            </div>
            <div className="col-6">
              <ProductInfo product={product} handleAddToCart={handleAddToCart} />
            </div>
          </div>
          <SpaceBox space={15} />
          <GridProductView transparency noAction title="Recomendados pra você!" icon={null} products={products} />
        </div>
      </div>
    );
  };

export default () => {

    const { cart } = useContext(MainContext);

    const [products, setProducts] = useState([
        {
            id_product: 0,
            name: "Bolsa LV",
            price: 120500,
            images: [
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
                "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
                "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
                "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
            ],
            ref: "#8128932",
            category: "Bolsas",
            condition: "Novo",
            offerPrice: 9900,
            salePrice: 12900,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
        },
        {
            id_product: 10,
            name: "Bolsa GUCCI",
            price: 220500,
            images: [
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
                "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
            ],
            ref: "#8128932",
            category: "Bolsas",
            condition: "Novo",
            offerPrice: 9900,
            salePrice: 12900,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
        },
        {
            id_product: 45323,
            name: "Bolsa LV",
            price: 320500,
            images: [
                "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
                "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png"
            ],
            ref: "#8128932",
            category: "Bolsas",
            condition: "Novo",
            offerPrice: 9900,
            salePrice: 12900,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
        },
        {
            id_product: 54323,
            name: "Bolsa LV",
            price: 55670,
            images: [
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
                "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png"

            ],
            ref: "#8128932",
            category: "Bolsas",
            condition: "Novo",
            offerPrice: 9900,
            salePrice: 12900,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
        },
        {
            id_product: 0,
            name: "Bolsa LV",
            price: 120500,
            images: [ 
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
                "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png"
            ],
            ref: "#8128932",
            category: "Bolsas",
            condition: "Novo",
            offerPrice: 9900,
            salePrice: 12900,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
        },
        {
            id_product: 10,
            name: "Bolsa GUCCI",
            price: 220500,
            images: [
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
                "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png"
            ],
            ref: "#8128932",
            category: "Bolsas",
            condition: "Novo",
            offerPrice: 9900,
            salePrice: 12900,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
        },
        {
            id_product: 45323,
            name: "Bolsa LV",
            price: 320500,
            images: [
                "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
                "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png"
            ],
            ref: "#8128932",
            category: "Bolsas",
            condition: "Novo",
            offerPrice: 9900,
            salePrice: 12900,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
        },
        {
            id_product: 54323,
            name: "Bolsa LV",
            price: 55670,
            images: [
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
                "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
                "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png"
            ],
            ref: "#8128932",
            category: "Bolsas",
            condition: "Novo",
            offerPrice: 9900,
            salePrice: 12900,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
        }
    ]);

    useEffect(() => {
        startupLogics();
    }, [])

    const handleAddToCart = () => {
        cart.addToCart(products[0], 1);
    }

    return (
        <FragmentView>
            <SpaceBox space={Utils.mobileCheck() ? 0 : 25} />
            <ProductView product={products[0]} products={products} handleAddToCart={handleAddToCart} />
        </FragmentView>
    )
}

