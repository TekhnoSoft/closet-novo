import React, { useContext, useState, useEffect } from 'react';
import './style.css';
import { AccountModal, Button, Card, FragmentView, Input, SpaceBox } from '../../components';
import { MainContext } from '../../helpers/MainContext';
import Utils from '../../Utils';
import { useNavigate } from 'react-router-dom';
import Api from '../../Api';

export default () => {

    const navigate = useNavigate();

    const { user, cart } = useContext(MainContext);
    const [coupon, setCoupon] = useState('');
    const [loadedFreight, setLoadedFreight] = useState(false);
    const [freight, setFreight] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [cep, setCep] = useState("");

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (user){
            let addressSelected = user?.addresses.filter(a => {return a.selected})[0];
            setCep(addressSelected?.cep?.replace(/(\d{5})(\d{3})/, '$1-$2'));
        }
    }, [user])

    useEffect(() => {
        if(Utils.validateCEP(cep)){
            calculateFreight();
        }else{
            setFreight(0);
            setLoadedFreight(false);
        }
    }, [cep])

    useEffect(() => {
        applyCoupon();
        setTotalPrice(cart.getCartPrice() - discount + freight);
        calculateFreight();
    }, [cart, discount, freight])

    const applyCoupon = () => {
        if(coupon?.length <= 0) return;
        if (coupon === 'DESCONTO10') {
            setDiscount(cart.getCartPrice() * 0.1);
        } else {
            Utils.toast({type: "error", text: 'Cupom inválido'});
        }
    };

    const calculateFreight = async () => {
        if(cep?.length < 9) return;
        setLoadedFreight(false);
        const ids = cart?.cart.map(item => item.id);
        if(ids.length <= 0) return;
        await Api.general.calcularFrete({cep: cep, ids_product: ids}).then(async data => {
            if(data?.data?.code == 200){
                setFreight(Number(data?.data?.data?.total)); 
                setLoadedFreight(true);
            }else{
                setFreight(Number(0)); 
                Utils.toast({type: "error", text: "CEP Inválido"})
                setLoadedFreight(false);
            }
        });
    };

    const handleFinish = () => {
        if(!loadedFreight) return;
        const validUser = user != null || !user;
        setShowAccountModal(validUser);
        if(validUser){}
    }

    return (
        <FragmentView noPaddingContainer>
            <AccountModal show={showAccountModal} setShow={setShowAccountModal} />
            <div className="cart-container">
                {cart.cart.length > 0 ? (
                    <div>
                        <ul className="cart-items">
                            {cart.cart.map((product) => (
                                <li key={product.id} className="cart-item">
                                    <img src={product.images[0].path} alt={product.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3>{product.name}</h3>
                                        <p>Ref: {product.ref}</p>
                                        <p>Preço: R$ {Utils.formatBRL((product.price))}</p>
                                        <p>Quantidade: {product.qtd}</p>
                                        <div className="item-actions">
                                            <button className="remove-button" onClick={() => {cart.removeFromCart(product.id)}}>
                                                <ion-icon name="trash-outline"></ion-icon> Remover
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-summary">
                            <Card>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <ion-icon name="cube-outline"></ion-icon>&nbsp;
                                    <b style={{fontSize: '10pt', color: 'rgba(0, 0, 0, 0.8)'}}>Calcular Frete</b>
                                </div>
                                <SpaceBox space={10}/>
                                <Input label={"Digite seu CEP"} type={"cep"} value={cep} setValue={setCep} hideInputBoxMargin/>
                            </Card>
                            <SpaceBox space={20}/>
                            <div className="coupon-section">
                                <Input
                                    type={"text"}
                                    label={"Insira o cupom"}
                                    value={coupon}
                                    setValue={setCoupon}
                                    style={{width: '100%'}}
                                    hideInputBoxMargin
                                />&nbsp;
                                <Button className="apply-coupon-button" onClick={applyCoupon}>
                                    <ion-icon name="pricetag-outline"></ion-icon> <b>Aplicar</b>
                                </Button>
                            </div>
                            <SpaceBox space={10}/>
                            <Card>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <span style={{color: 'rgba(0, 0, 0, 0.6'}}>Subtotal</span>
                                    <b style={{color: 'rgba(0, 0, 0, 0.6'}}>{Utils.formatBRL(cart.getCartPrice())}</b>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <span style={{color: 'rgba(0, 0, 0, 0.6)'}}>Desconto</span>
                                    <b style={{color: 'rgba(0, 0, 0, 0.6)'}}>-{Utils.formatBRL(discount)}</b>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <span style={{color: 'rgba(0, 0, 0, 0.6)'}}>Frete</span>
                                    <b style={{color: 'rgba(0, 0, 0, 0.6)'}}>{!loadedFreight ? cep?.length > 0 ? "(calculando...)" : "(Digite seu CEP)" : `(SEDEX) ` + Utils.formatBRL(freight)}</b>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <span style={{color: 'rgba(0, 0, 0, 0.6'}}>Total</span>
                                    <b style={{color: 'rgba(0, 0, 0, 0.6'}}>{Utils.formatBRL(totalPrice)}</b>
                                </div>
                            </Card>
                            <SpaceBox space={20}/>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                {loadedFreight ? (
                                     <Button onClick={handleFinish} className="checkout-button">
                                        <ion-icon name="checkmark-circle-outline"></ion-icon> <b>Finalizar Compra</b>
                                    </Button>
                                ) : (null)}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div style={{textAlign: 'center'}}>
                            <SpaceBox space={20}/>
                            <img src='../hero1.png' width={300}/>
                            <p>Seu carrinho está vazio.</p>
                            <SpaceBox space={5}/>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Button className="checkout-button" onClick={() => navigate("/")}>
                                    <b>&nbsp;&nbsp;&nbsp;Ver Ofertas&nbsp;&nbsp;&nbsp;</b>
                                </Button>
                            </div>
                            <SpaceBox space={15}/>
                        </div>
                    </div>
                )}
            </div>
        </FragmentView>
    );
};
