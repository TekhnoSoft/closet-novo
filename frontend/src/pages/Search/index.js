import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Checkbox, Container, FlatButton, FragmentView, InputRange, Modal, Option, ProductView, Select, SpaceBox } from '../../components';
import './style.css';
import Utils from '../../Utils';
import { MainContext } from '../../helpers/MainContext';
import Api from '../../Api';

const FilterComponent = ({
    text, 
    selectSituacao,
    setSelectSituacao,
    selectOrder,
    setSelectOrder,
    precoValue,
    setPrecoValue,
    onCloseCallbackModalFilter,
    categoriesCopy,
    setCategoriesCopy,
    brandsCopy,
    setBrandsCopy,
    selectedCategories,
    setSelectedCategories,
    selectedBrands,
    setSelectedBrands,
    selectedPrecoValue,
    setSelectedPrecoValue,
    handleSetCheckedCategory,
    handleSetCheckedBrand,
    refreshFilter
}) => {
    const [step, setStep] = useState(10000);

    useEffect(() => {
        const calculateStep = (max) => {
            if (max >= 1000000) return 100000;
            if (max >= 100000) return 15000;
            if (max >= 10000) return 1000;
            if (max >= 1000) return 100;
            if (max >= 100) return 10;
            return 1;
        };
        setStep(calculateStep(precoValue[1]));
    }, [precoValue]);

    const handlePrecoValue = (values) => {
        setPrecoValue(values)
    }

    const handleChangeRangePrice = (value) => {
        setSelectedPrecoValue(value);
        refreshFilter();
    }

    const handleMobileFilter = () => {
        refreshFilter();
        if (onCloseCallbackModalFilter) {
            onCloseCallbackModalFilter();
        }
    }

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
            <div style={{ overflow: Utils.mobileCheck() ? 'auto' : undefined, height: Utils.mobileCheck() ? 'calc(100vh - 150px)' : 'calc(100vh - 120px)' }}>
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
                    onInput={(values) => handlePrecoValue(values)}
                    onChange={handleChangeRangePrice}
                    min={precoValue[0]}
                    max={precoValue[1]}
                    step={step}
                    currencyPrefix />
                <div className='input-box-range mb-1'>
                    <div className="input-label-range">Categorias</div>
                    <SpaceBox space={5} />
                    <div style={{ height: !Utils?.mobileCheck() ? '200px' : undefined, overflow: !Utils?.mobileCheck() ? 'auto' : undefined }}>
                        {categoriesCopy?.map(c => (
                            <Checkbox checked={c.checked} setChecked={() => { handleSetCheckedCategory(c.id) }} noMargin flexStart>
                                {c?.name}
                            </Checkbox>
                        ))}
                    </div>
                </div>
                <div className='input-box-range'>
                    <div className="input-label-range">Marcas</div>
                    <SpaceBox space={5} />
                    <div style={{ height: !Utils?.mobileCheck() ? '200px' : undefined, overflow: !Utils?.mobileCheck() ? 'auto' : undefined }}>
                        {brandsCopy?.map(b => (
                            <Checkbox checked={b.checked} setChecked={() => { handleSetCheckedBrand(b.id) }} noMargin flexStart>
                                {b?.name}
                            </Checkbox>
                        ))}
                    </div>
                </div>
                {Utils?.mobileCheck() ? (null) : (<SpaceBox space={10} />)}
            </div>
            {Utils?.mobileCheck() ? (
                <Button onClick={handleMobileFilter} className={'mt-1'} style={{ width: '100%' }}>
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

    const [categoriesCopy, setCategoriesCopy] = useState([]);
    const [brandsCopy, setBrandsCopy] = useState([]);

    const [text, setText] = useState(localStorage.getItem("search_text") || null);
    const [products, setProducts] = useState([]);
    const [modalFilter, setModalFilter] = useState(false);
    const [selectSituacao, setSelectSituacao] = useState(0);
    const [selectOrder, setSelectOrder] = useState(0);
    const [precoValue, setPrecoValue] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPrecoValue, setSelectedPrecoValue] = useState(precoValue);

    useEffect(() => {

        const load = async () => {
            setLoaded(false);

            inputRef?.current?.focus();

            if (localStorage.getItem("search_text")) {
                localStorage.removeItem("search_text")
            }

            const storedSituation = localStorage.getItem("tk_beauty_search_by_situation");

            if (storedSituation) {
                setSelectSituacao(storedSituation);
                localStorage.removeItem("tk_beauty_search_by_situation");
            }

            await loadBrandAndCategories();

            setLoaded(true);
        }

        load();

    }, []);

    useEffect(() => {
        if(loaded){
            refreshFilter();
        }
    }, [text, selectedCategories, selectedBrands, selectSituacao, selectOrder, selectedPrecoValue]);

    const loadBrandAndCategories = async () => {
        try {
            const [categoriesResponse, brandsResponse, productPriceRangeResponse] = await Promise.all([
                Api.general.categories(),
                Api.general.brands(),
                Api.general.productPriceRange(),
            ]);
    
            const _categories = categoriesResponse?.data?.data || [];
            const _brands = brandsResponse?.data?.data || [];
            const _prices = productPriceRangeResponse?.data || {min_price: 0, max_price: 1000000};
    
            setCheckedStoredItems({ _categories, _brands, _prices });
        } catch (error) {
            console.error("Erro ao carregar categorias e marcas:", error);
        }
    };
    
    const setCheckedStoredItems = ({ _categories, _brands, _prices }) => {
        const storedCategory = localStorage.getItem("tk_beauty_search_by_category")
            ? [JSON.parse(localStorage.getItem("tk_beauty_search_by_category"))]
            : [];
        const storedBrand = localStorage.getItem("tk_beauty_search_by_brand")
            ? [JSON.parse(localStorage.getItem("tk_beauty_search_by_brand"))]
            : [];
    
        const updatedCategories = _categories.map(category => ({
            ...category,
            checked: storedCategory.some(stored => stored.id === category.id)
        }));
        const updatedBrands = _brands.map(brand => ({
            ...brand,
            checked: storedBrand.some(stored => stored.id === brand.id)
        }));
    
        setCategoriesCopy(updatedCategories);
        setBrandsCopy(updatedBrands);
    
        if (storedCategory.length > 0) {
            setSelectedCategories([storedCategory[0].id]);
        } else {
            setSelectedCategories([]);
        }
    
        if (storedBrand.length > 0) {
            setSelectedBrands([storedBrand[0].id]);
        } else {
            setSelectedBrands([]);
        }

        setPrecoValue([_prices.min_price, _prices.max_price])
        
        let timeout = setTimeout(() => {
            localStorage.removeItem("tk_beauty_search_by_category");
            localStorage.removeItem("tk_beauty_search_by_brand");
            clearTimeout(timeout);
        }, 1500)
    };
    
    const refreshFilter = () => {

        const _filter = {
            name: text,
            categories: selectedCategories.length ? selectedCategories : undefined,
            brands: selectedBrands.length ? selectedBrands : undefined,
            situation: selectSituacao !== 0 ? selectSituacao : undefined,
            order: selectOrder !== 0 ? selectOrder : undefined,
            min_price: selectedPrecoValue[0],
            max_price: selectedPrecoValue[1]
        };

        loadSearchProducts(_filter);
    }

     const handleSetCheckedCategory = (id) => {
        setCategoriesCopy(prevCategories =>
            prevCategories.map(category =>
                category.id === id ? { ...category, checked: !category.checked } : category
            )
        );
        setSelectedCategories(
            categoriesCopy
                .filter(category => (category.checked && category.id !== id) || (!category.checked && category.id === id))
                .map(category => category.id)
        );
    };

    const handleSetCheckedBrand = (id) => {
        setBrandsCopy(prevBrands =>
            prevBrands.map(brand =>
                brand.id === id ? { ...brand, checked: !brand.checked } : brand
            )
        );
        setSelectedBrands(
            brandsCopy
                .filter(brand => (brand.checked && brand.id !== id) || (!brand.checked && brand.id === id))
                .map(brand => brand.id)
        );
    };

    const loadSearchProducts = async (filter) => {
        await Api.general.productsSearch({ data: filter }).then(async data => {
            setProducts(data?.data);
        })
    }

    const handleFilter = () => {
        setModalFilter(true);
    }

    const onCloseCallbackModalFilter = () => {
        setModalFilter(false);
    }

    return (
        <FragmentView noPaddingContainer>
            <Modal childrenPadding={"0px"} show={modalFilter} setShow={setModalFilter} onCloseCallback={onCloseCallbackModalFilter}>
                <FilterComponent
                    text={text}
                    selectSituacao={selectSituacao}
                    setSelectSituacao={setSelectSituacao}
                    selectOrder={selectOrder}
                    setSelectOrder={setSelectOrder}
                    precoValue={precoValue}
                    setPrecoValue={setPrecoValue}
                    onCloseCallbackModalFilter={onCloseCallbackModalFilter}
                    categoriesCopy={categoriesCopy}
                    setCategoriesCopy={setCategoriesCopy}
                    brandsCopy={brandsCopy}
                    setBrandsCopy={setBrandsCopy}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                    selectedPrecoValue={selectedPrecoValue}
                    setSelectedPrecoValue={setSelectedPrecoValue}
                    handleSetCheckedCategory={handleSetCheckedCategory}
                    handleSetCheckedBrand={handleSetCheckedBrand}
                    refreshFilter={refreshFilter}
                />
            </Modal>
            {Utils.mobileCheck() ? (
                <FlatButton onClick={handleFilter}>
                    <ion-icon name="funnel-outline" style={{ fontSize: "1.5rem", margin: 0 }}></ion-icon>
                </FlatButton>
            ) : (null)}
            <Container center className={'mt-2'}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ background: "#fff", border: 'solid 1px #ddd', borderRadius: '8px', padding: '8px', width: '100%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ overflow: 'hidden', flex: '0.99' }}>
                            <input ref={inputRef} type='text' placeholder='Pesquisar produto...' style={{ width: '100%', height: '40px', border: 'none', fontSize: '1rem', border: 'none', outline: 'none' }} onChange={e => setText(e.target.value)} value={text} />
                        </div>
                        <ion-icon name="search-outline" style={{ fontSize: "1.5rem" }}></ion-icon>
                    </div>
                </div>
                {loaded ? (
                    <div className='mt-1 mb-1' style={{ display: 'flex' }}>
                        {!Utils?.mobileCheck() ? (
                            <FilterComponent
                                text={text}
                                selectSituacao={selectSituacao}
                                setSelectSituacao={setSelectSituacao}
                                selectOrder={selectOrder}
                                setSelectOrder={setSelectOrder}
                                precoValue={precoValue}
                                setPrecoValue={setPrecoValue}
                                categoriesCopy={categoriesCopy}
                                setCategoriesCopy={setCategoriesCopy}
                                brandsCopy={brandsCopy}
                                setBrandsCopy={setBrandsCopy}
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                                selectedBrands={selectedBrands}
                                setSelectedBrands={setSelectedBrands}
                                selectedPrecoValue={selectedPrecoValue}
                                setSelectedPrecoValue={setSelectedPrecoValue}
                                handleSetCheckedCategory={handleSetCheckedCategory}
                                handleSetCheckedBrand={handleSetCheckedBrand}
                                refreshFilter={refreshFilter}
                            />
                        ) : (null)}
                        <div style={{ width: '100%' }}>
                            {products?.length > 0 ? (
                                <div className='grid-container '>
                                    {products?.map((product, index) => (
                                        <ProductView key={index} index={index} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <b className='mt-3' style={{ color: 'gray' }}>{'Nenhum produto encontrado!'}</b>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '10px'}}>
                        <b className='mt-3' style={{ color: 'gray' }}>{'Carregando...'}</b>
                    </div>
                )}
            </Container>
            <SpaceBox space={20}/>
        </FragmentView>
    )
}