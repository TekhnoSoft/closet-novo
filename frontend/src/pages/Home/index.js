import React, { useState } from 'react';
import { CarouselView, Container, FragmentView, GridCardView } from '../../components';
import GridProductView from '../../components/GridProductView';
import CategoryList from '../../components/CategoryList';

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

    const [products, setProducts] = useState([
        {
            id: 0,
            name: "Bolsa LV",
            price: 120500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
        },
        {
            id: 0,
            name: "Bolsa GUCCI",
            price: 220500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
        },
        {
            id: 0,
            name: "Bolsa LV",
            price: 320500,
            image: "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id: 0,
            name: "Bolsa LV",
            price: 55670,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
        },
        {
            id: 0,
            name: "Bolsa LV",
            price: 120500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
        },
        {
            id: 0,
            name: "Bolsa GUCCI",
            price: 220500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
        },
        {
            id: 0,
            name: "Bolsa LV",
            price: 320500,
            image: "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id: 0,
            name: "Bolsa LV",
            price: 55670,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
        },
    ]);

    const [productsSapatos, setProductsSapatos] = useState([
        {
            id: 0,
            name: "Sapato 1",
            price: 120500,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsG-GcDnvw4uDj7JK6esK-nWk_vcXdIXmD6Q&s",
        },
        {
            id: 0,
            name: "Sapato 2",
            price: 220500,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdrjiDxLIWzXZi9BrdiOzTSQ__OkA6AB9paQoDvfMg4nq3aHmIz_f3rB-VIzqtOVbwfSY&usqp=CAU",
        },
        {
            id: 0,
            name: "Sapato 3",
            price: 320500,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjv3OyJFokjT6a93vtF4xSH893MNAzqFnzbqnFfQZPlVp5lCLYbYk1jJQ20dNMgCypokY&usqp=CAU",
        },
        {
            id: 0,
            name: "Sapato 4",
            price: 55670,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCx7vRH1ztmh6eO37ljNl6r0wl9K35KmKEfYd32SJ9DeOip9I4Q6kribu6QdEv7TS_PRg&usqp=CAU",
        },
        {
            id: 0,
            name: "Sapato 1",
            price: 120500,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsG-GcDnvw4uDj7JK6esK-nWk_vcXdIXmD6Q&s",
        },
        {
            id: 0,
            name: "Sapato 2",
            price: 220500,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdrjiDxLIWzXZi9BrdiOzTSQ__OkA6AB9paQoDvfMg4nq3aHmIz_f3rB-VIzqtOVbwfSY&usqp=CAU",
        },
        {
            id: 0,
            name: "Sapato 3",
            price: 320500,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjv3OyJFokjT6a93vtF4xSH893MNAzqFnzbqnFfQZPlVp5lCLYbYk1jJQ20dNMgCypokY&usqp=CAU",
        },
        {
            id: 0,
            name: "Sapato 4",
            price: 55670,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCx7vRH1ztmh6eO37ljNl6r0wl9K35KmKEfYd32SJ9DeOip9I4Q6kribu6QdEv7TS_PRg&usqp=CAU",
        },
    ]);

    const [productsRelogios, setProductsRelogios] = useState([
        {
            id: 0,
            name: "Relógio 1",
            price: 120500,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU092JsWqEGV2DSvcrmPnnS-DaCAdIGqQgAg&s",
        },
        {
            id: 0,
            name: "Relógio 2",
            price: 220500,
            image: "https://cdn.iset.io/assets/41659/produtos/392/thumb_246-235-ar2461_1.jpg",
        },
        {
            id: 0,
            name: "Relógio 3",
            price: 320500,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKhZFIS8WvFqwq12gW-iAmXePERsO53WeMtZBb0s5hCPq8AKZRE5gpTCSXvJfKuiO3gso&usqp=CAU",
        },
        {
            id: 0,
            name: "Relógio 4",
            price: 55670,
            image: "https://cdn.iset.io/assets/41659/produtos/551/thumb_246-235-ar2453_1.png",
        },
        {
            id: 0,
            name: "Relógio 1",
            price: 120500,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU092JsWqEGV2DSvcrmPnnS-DaCAdIGqQgAg&s",
        },
        {
            id: 0,
            name: "Relógio 2",
            price: 220500,
            image: "https://cdn.iset.io/assets/41659/produtos/392/thumb_246-235-ar2461_1.jpg",
        },
        {
            id: 0,
            name: "Relógio 3",
            price: 320500,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKhZFIS8WvFqwq12gW-iAmXePERsO53WeMtZBb0s5hCPq8AKZRE5gpTCSXvJfKuiO3gso&usqp=CAU",
        },
        {
            id: 0,
            name: "Relógio 4",
            price: 55670,
            image: "https://cdn.iset.io/assets/41659/produtos/551/thumb_246-235-ar2453_1.png",
        },
    ]);

    const [itemsCardView, setItemsCardView] = useState([

    ]);

    return (
        <FragmentView noPaddingContainer>
            <CarouselView items={itemsCarousel}/>
            <Container center>
                <CategoryList categories={categories}/>
            </Container>
            <Container center>
                <GridProductView icon={<ion-icon style={{color: 'gray'}} name="pricetag-outline" />} title={"Bolsas em destaque"} products={products} />
            </Container>
            <Container>
                <GridCardView items={itemsCardView}/>
            </Container>
            <CarouselView items={itemsCarousel2}/>
            <Container center>
                <GridProductView icon={<ion-icon style={{color: 'gray'}} name="footsteps-outline" />} title={"Sapatos de luxo"} products={productsSapatos} />
            </Container>
        </FragmentView>
    )
}
