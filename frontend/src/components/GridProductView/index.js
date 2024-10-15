import React from 'react';
import Card from '../Card';
import Button from '../Button';
import './style.css';
import Utils from '../../Utils';
import ProductView from '../ProductView';

export default ({icon, title, products, transparency, noAction, noPadding}) => {
    return (
        <Card style={{background: transparency ? 'transparent' : undefined, boxShadow: transparency ? 'none' : undefined, padding: noPadding ? '0px' : '5px'}} className={`${Utils.mobileCheck() ? 'mb-1' : 'mb-5'}`}>
            <div style={{display: 'flex', alignItems: 'center', height: '50px', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {icon}&nbsp;
                    <b style={{color: 'gray'}}>{title}</b>
                </div>
                {noAction ? (<></>) : (
                    <Button style={{height: '50px'}}>
                        &nbsp;&nbsp;<b>ver mais</b>&nbsp;&nbsp;
                    </Button>
                )}
            </div>
            <div className="grid-container">
                {products.map((product, index) => (
                    <ProductView index={index} product={product}/>
                ))}
            </div>
        </Card>
    )
}
