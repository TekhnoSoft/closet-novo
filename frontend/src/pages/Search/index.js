import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Checkbox, Container, FlatButton, FragmentView, InputRange, Modal, Option, ProductView, Select, SpaceBox } from '../../components';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Utils from '../../Utils';

const FilterComponent = ({ selectSituacao, setSelectSituacao, selectOrder, setSelectOrder, precoValue, setPrecoValue, categorias, marcas }) => {

    return (
        <Card 
        style={{ 
            width: Utils?.mobileCheck() ? undefined : '300px', 
            marginRight: Utils?.mobileCheck() ? undefined : '10px', 
            marginTop: Utils?.mobileCheck() ? undefined : '10px', 
            position: Utils?.mobileCheck() ? undefined : 'sticky', 
            top: Utils?.mobileCheck() ? undefined : '90px', 
            height: Utils?.mobileCheck() ? undefined : '100%', 
            overflowY: Utils?.mobileCheck() ? undefined : 'auto' 
            }}>
            <div style={{overflow: Utils.mobileCheck() ? 'auto' : undefined, height: Utils.mobileCheck() ? 'calc(100vh - 130px)' : 'calc(100vh - 120px)'}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ion-icon name="funnel-outline" style={{ fontSize: "1rem" }}></ion-icon>&nbsp;
                    <span style={{ fontSize: "1rem" }}>Filtros</span>
                </div>
                <Select value={selectSituacao} setValue={setSelectSituacao} label={"Situação"}>
                    <Option value={0}>Todos</Option>
                    <Option value={1}>Novos</Option>
                    <Option value={2}>Usados</Option>
                </Select>
                <Select value={selectOrder} setValue={setSelectOrder} label={"Ordenar"}>
                    <Option value={0}>[A-Z]</Option>
                    <Option value={1}>[Z-A]</Option>
                    <Option value={2}>Preço crescente</Option>
                    <Option value={3}>Preço descrescente</Option>
                </Select>
                <InputRange
                    label={"Faixa de preço"}
                    value={precoValue}
                    onInput={(values) => setPrecoValue(values)}
                    min={0}
                    max={1000}
                    currencyPrefix />
                <div className='input-box-range mb-1'>
                    <div className="input-label-range">Categorias</div>
                    <SpaceBox space={5}/>
                    {categorias?.map(c => (
                        <Checkbox checked={c.checked} noMargin flexStart>
                            {c?.name}
                        </Checkbox>
                    ))}
                </div>
                <div className='input-box-range'>
                    <div className="input-label-range">Marcas</div>
                    <SpaceBox space={5}/>
                    {marcas?.map(m => (
                        <Checkbox checked={m.checked} noMargin flexStart>
                            {m?.name}
                        </Checkbox>
                    ))}
                </div>
                {Utils?.mobileCheck() ? (null) : (<SpaceBox space={10}/>)}
            </div>
            {Utils?.mobileCheck() ? (
                <Button className={'mt-1'} style={{width: '100%'}}>
                    <b>
                        Aplicar filtro
                    </b>
                </Button>
            ) : (null)}
        </Card>
    )
}

export default () => {

    const inputRef = useRef(null);

    const [loaded, setLoaded] = useState(false);
    const [text, setText] = useState(localStorage.getItem("search_text") || null);
    const [results, setResults] = useState([]);

    const [categorias, setCategorias] = useState([
        {
            id: 0,
            name: "Blusas",
            checked: false,
        },
        {
            id: 1,
            name: "Calças",
            checked: false,
        },
        {
            id: 2,
            name: "Bolsas",
            checked: false,
        },
        {
            id: 0,
            name: "Blusas",
            checked: false,
        },
        {
            id: 1,
            name: "Calças",
            checked: false,
        },
        {
            id: 2,
            name: "Bolsas",
            checked: false,
        },
    ]);

    const [marcas, setMarcas] = useState([
        {
            id: 0,
            name: "Gucci",
            checked: false,
        },
        {
            id: 1,
            name: "Lv",
            checked: false,
        },
        {
            id: 2,
            name: "Prada",
            checked: false,
        },
        {
            id: 0,
            name: "Gucci",
            checked: false,
        },
        {
            id: 1,
            name: "Lv",
            checked: false,
        },
        {
            id: 2,
            name: "Prada",
            checked: false,
        },
        {
            id: 0,
            name: "Gucci",
            checked: false,
        },
    ]);

    const [products, setProducts] = useState([
        {
            id_product: 0,
            name: "Bolsa LV",
            price: 120500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
        },
        {
            id_product: 10,
            name: "Bolsa GUCCI",
            price: 220500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
        },
        {
            id_product: 45323,
            name: "Bolsa LV",
            price: 320500,
            image: "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id_product: 54323,
            name: "Bolsa LV",
            price: 55670,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
        },
        {
            id_product: 34530,
            name: "Bolsa LV",
            price: 120500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
        },
        {
            id_product: 234240,
            name: "Bolsa GUCCI",
            price: 220500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
        },
        {
            id_product: 9879870,
            name: "Bolsa LV",
            price: 320500,
            image: "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id_product: 97897890,
            name: "Bolsa LV",
            price: 55670,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
        },
        {
            id_product: 0,
            name: "Bolsa LV",
            price: 120500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
        },
        {
            id_product: 10,
            name: "Bolsa GUCCI",
            price: 220500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
        },
        {
            id_product: 45323,
            name: "Bolsa LV",
            price: 320500,
            image: "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id_product: 54323,
            name: "Bolsa LV",
            price: 55670,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
        },
        {
            id_product: 34530,
            name: "Bolsa LV",
            price: 120500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
        },
        {
            id_product: 234240,
            name: "Bolsa GUCCI",
            price: 220500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
        },
        {
            id_product: 9879870,
            name: "Bolsa LV",
            price: 320500,
            image: "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id_product: 97897890,
            name: "Bolsa LV",
            price: 55670,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
        },
        {
            id_product: 0,
            name: "Bolsa LV",
            price: 120500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
        },
        {
            id_product: 10,
            name: "Bolsa GUCCI",
            price: 220500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
        },
        {
            id_product: 45323,
            name: "Bolsa LV",
            price: 320500,
            image: "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id_product: 54323,
            name: "Bolsa LV",
            price: 55670,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
        },
        {
            id_product: 34530,
            name: "Bolsa LV",
            price: 120500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
        },
        {
            id_product: 234240,
            name: "Bolsa GUCCI",
            price: 220500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
        },
        {
            id_product: 9879870,
            name: "Bolsa LV",
            price: 320500,
            image: "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id_product: 97897890,
            name: "Bolsa LV",
            price: 55670,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
        },
        {
            id_product: 0,
            name: "Bolsa LV",
            price: 120500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
        },
        {
            id_product: 10,
            name: "Bolsa GUCCI",
            price: 220500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
        },
        {
            id_product: 45323,
            name: "Bolsa LV",
            price: 320500,
            image: "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id_product: 54323,
            name: "Bolsa LV",
            price: 55670,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
        },
        {
            id_product: 34530,
            name: "Bolsa LV",
            price: 120500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
        },
        {
            id_product: 234240,
            name: "Bolsa GUCCI",
            price: 220500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
        },
        {
            id_product: 9879870,
            name: "Bolsa LV",
            price: 320500,
            image: "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id_product: 97897890,
            name: "Bolsa LV",
            price: 55670,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
        },
    ]);

    const [modalFilter, setModalFilter] = useState(false);

    const [selectSituacao, setSelectSituacao] = useState(0);
    const [selectOrder, setSelectOrder] = useState(0);
    const [precoValue, setPrecoValue] = useState([30, 60]);

    useEffect(() => {
        setLoaded(true);
        inputRef?.current?.focus();
        if (localStorage.getItem("search_text")) {
            localStorage.removeItem("search_text")
        }
    }, [])

    const requestSearch = async (_text) => {
        setText(_text);
    }

    const handleFilter = () => {
        setModalFilter(true);
    }

    const onCloseCallbackModalFilter = () => {

    }

    return (
        <FragmentView noPaddingContainer>
            <Modal noPadding show={modalFilter} setShow={setModalFilter} onCloseCallback={onCloseCallbackModalFilter}>
                <FilterComponent
                    selectSituacao={selectSituacao}
                    setSelectSituacao={setSelectSituacao}
                    selectOrder={selectOrder}
                    setSelectOrder={setSelectOrder}
                    precoValue={precoValue}
                    setPrecoValue={setPrecoValue}
                    categorias={categorias}
                    marcas={marcas}
                />
            </Modal>
            {Utils.mobileCheck() ? (
                <FlatButton onClick={handleFilter}>
                    <ion-icon name="funnel-outline" style={{ fontSize: "1.5rem" }}></ion-icon>
                </FlatButton>
            ) : (null)}
            <Container center className={'mt-2'}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ background: "#fff", border: 'solid 1px #ddd', borderRadius: '16px', padding: '8px', width: '100%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ overflow: 'hidden', flex: '0.99' }}>
                            <input ref={inputRef} type='text' placeholder='Pesquisar produto...' style={{ width: '100%', height: '40px', border: 'none', fontSize: '1rem', border: 'none', outline: 'none' }} onChange={e => requestSearch(e.target.value)} value={text} />
                        </div>
                        <ion-icon name="search-outline" style={{ fontSize: "1.5rem" }}></ion-icon>
                    </div>
                </div>
                {loaded ? (
                    <div className='mt-1 mb-1' style={{ display: 'flex' }}>
                        {!Utils?.mobileCheck() ? (
                            <FilterComponent
                                selectSituacao={selectSituacao}
                                setSelectSituacao={setSelectSituacao}
                                selectOrder={selectOrder}
                                setSelectOrder={setSelectOrder}
                                precoValue={precoValue}
                                setPrecoValue={setPrecoValue}
                                categorias={categorias}
                                marcas={marcas}
                            />
                        ) : (null)}
                        <div style={{ width: '100%' }}>
                            {results?.length > 0 || true ? ( /*Remover esse true é so pra desenvolvimento*/
                                <div className='grid-container '>
                                    {products?.map((product, index) => (
                                        <ProductView key={index} index={index} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <b className='mt-3' style={{ color: 'gray' }}>{text}</b>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (null)}
            </Container>
        </FragmentView>
    )
}