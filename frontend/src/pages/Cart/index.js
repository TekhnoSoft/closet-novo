import React, { useContext, useState, useEffect } from 'react';
import './style.css';
import { Button, Card, FragmentView, Input, SpaceBox } from '../../components';
import { MainContext } from '../../helpers/MainContext';
import Utils from '../../Utils';
import { useNavigate } from 'react-router-dom';

export default () => {

    const navigate = useNavigate();

    const { cart } = useContext(MainContext);
    const [coupon, setCoupon] = useState('');
    const [freight, setFreight] = useState(0);
    const [discount, setDiscount] = useState(0);

    const applyCoupon = () => {
        // Exemplo de lógica para aplicar cupom
        if (coupon === 'DESCONTO10') {
            setDiscount(cart.getCartPrice() * 0.1); // 10% de desconto
        } else {
            alert('Cupom inválido');
        }
    };

    const calculateFreight = () => {
        // Exemplo de lógica para calcular frete
        setFreight(50); // Definindo o valor fixo de frete
    };

    const totalPrice = (cart.getCartPrice() - discount + freight);

    return (
        <FragmentView noPaddingContainer>
            <div className="cart-container">
                {cart.cart.length > 0 ? (
                    <div>
                        <ul className="cart-items">
                            {cart.cart.map((product) => (
                                <li key={product.id_product} className="cart-item">
                                    <img src={product.images[0]} alt={product.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3>{product.name}</h3>
                                        <p>Ref: {product.ref}</p>
                                        <p>Preço: R$ {Utils.formatBRL((product.price))}</p>
                                        <p>Quantidade: {product.qtd}</p>
                                        <div className="item-actions">
                                            <button className="remove-button" onClick={() => cart.removeFromCart(product.id_product)}>
                                                <ion-icon name="trash-outline"></ion-icon> Remover
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-summary">
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
                                    <b style={{color: 'rgba(0, 0, 0, 0.6)'}}>{Utils.formatBRL(discount)}</b>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <span style={{color: 'rgba(0, 0, 0, 0.6)'}}>Frete</span>
                                    <b style={{color: 'rgba(0, 0, 0, 0.6)'}}>{Utils.formatBRL(freight)}</b>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <span style={{color: 'rgba(0, 0, 0, 0.6'}}>Total</span>
                                    <b style={{color: 'rgba(0, 0, 0, 0.6'}}>{Utils.formatBRL(totalPrice)}</b>
                                </div>
                            </Card>
                            <SpaceBox space={20}/>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                <Button className="checkout-button">
                                    <ion-icon name="checkmark-circle-outline"></ion-icon> <b>Finalizar Compra</b>
                                </Button>
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
