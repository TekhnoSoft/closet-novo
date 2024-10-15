import React, { useContext, useEffect, useState } from 'react';
import { CarouselView, Container, FragmentView, GridCardView, SpaceBox } from '../../components';
import GridProductView from '../../components/GridProductView';
import CategoryList from '../../components/CategoryList';
import { MainContext } from '../../helpers/MainContext';
import ConstData from '../../helpers/ConstData';

export default () => {

    const [itemsCarousel, setItemsCarousel] = useState([
        {
            id: 0,
            title: "Bem vindo!",
            description: "Que tal ficar com o closet novo?",
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
            ctaText: "Ver mais",
            ctaLink: "/"
        },
        {
            id: 0,
            title: "Bem vindo!",
            description: "Que tal ficar com o closet novo?",
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
            ctaText: "Ver mais",
            ctaLink: "/"
        }
    ]);

    const [itemsCarousel2, setItemsCarousel2] = useState([
        {
            id: 0,
            title: "O luxo que você busca!",
            description: "O luxo que você busca está á um clique de distância.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwrdWZQH-ke6ZpZpD4rP18XIc0gG6sr89Vbg&s",
            ctaText: "Ver mais",
            ctaLink: "/"
        },
        {
            id: 0,
            title: "Bem vindo!",
            description: "Que tal ficar com o closet novo?",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwrdWZQH-ke6ZpZpD4rP18XIc0gG6sr89Vbg&s",
            ctaText: "Ver mais",
            ctaLink: "/"
        }
    ]);

    const [categories, setCategories] = useState([
        {
            id_category: 0,
            name: "Bolsas",
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png"
        },
        {
            id_category: 0,
            name: "Sapatos",
            image: "https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/grifiaou/catalog/calcados/social/italy/sem-gorgurao/preto-liso/sapato-social-masculino-grife-couro.jpg"
        },
        {
            id_category: 0,
            name: "Cintos",
            image: "https://www.acessoriosdgriffe.com.br/wp-content/uploads/2018/08/264.jpg"
        },
        {
            id_category: 0,
            name: "Blusas",
            image: "https://br.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-camiseta-em-degrad%C3%A9-monogram-lvse-ready-to-wear--HKY46WNPG904_PM2_Front%20view.jpg"
        },
        {
            id_category: 0,
            name: "Relogios",
            image: "https://ecx.images-amazon.com/images/I/51DPFt2RGuL.jpg"
        },
        {
            id_category: 0,
            name: "Sapatos",
            image: "https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/grifiaou/catalog/calcados/social/italy/sem-gorgurao/preto-liso/sapato-social-masculino-grife-couro.jpg"
        },
        {
            id_category: 0,
            name: "Cintos",
            image: "https://www.acessoriosdgriffe.com.br/wp-content/uploads/2018/08/264.jpg"
        },
        {
            id_category: 0,
            name: "Blusas",
            image: "https://br.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-camiseta-em-degrad%C3%A9-monogram-lvse-ready-to-wear--HKY46WNPG904_PM2_Front%20view.jpg"
        },
        {
            id_category: 0,
            name: "Relogios",
            image: "https://ecx.images-amazon.com/images/I/51DPFt2RGuL.jpg"
        },
    ]);

    const [products, setProducts] = useState(ConstData.PRODUCTS);
    const [productsSapatos, setProductsSapatos] = useState(ConstData.PRODUCTS);
    const [productsRelogios, setProductsRelogios] = useState(ConstData.PRODUCTS);
    const [itemsCardView, setItemsCardView] = useState([]);

    return (
        <FragmentView noPaddingContainer>
            <CarouselView items={itemsCarousel}/>
            <SpaceBox space={10}/>
            <Container center>
                <CategoryList categories={categories}/>
            </Container>
            <SpaceBox space={10}/>
            <Container center>
                <GridProductView icon={<ion-icon style={{color: 'gray'}} name="pricetag-outline" />} title={"Bolsas em destaque"} products={products} />
            </Container>
            <SpaceBox space={10}/>
            <Container>
                <GridCardView items={itemsCardView}/>
            </Container>
            <SpaceBox space={10}/>
            <CarouselView items={itemsCarousel2}/>
            <SpaceBox space={20}/>
            <Container center>
                <GridProductView icon={<ion-icon style={{color: 'gray'}} name="footsteps-outline" />} title={"Sapatos de luxo"} products={productsSapatos} />
            </Container>
            <SpaceBox space={10}/>
        </FragmentView>
    )
}
