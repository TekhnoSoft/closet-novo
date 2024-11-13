import React, { useContext, useEffect, useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import './style.css';
import Utils from '../../Utils';
import ProductView from '../ProductView';
import Api from '../../Api';
import { MainContext } from '../../helpers/MainContext';

export default ({icon, title, ctaText, ctaLink, products, transparency, noAction, noPadding, onLoadProduct}) => {
    return (
        <Card style={{background: transparency ? 'transparent' : undefined, boxShadow: transparency ? 'none' : undefined, padding: noPadding ? '0px' : '5px'}} className={`${Utils.mobileCheck() ? 'mb-1' : 'mb-5'}`}>
            <div style={{display: 'flex', alignItems: 'center', height: '50px', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {icon}&nbsp;
                    <b style={{color: 'gray'}}>{title}</b>
                </div>
                {noAction ? (<></>) : (
                    <Button style={{height: '50px'}}>
                        &nbsp;&nbsp;<b>{ctaText}</b>&nbsp;&nbsp;
                    </Button>
                )}
            </div>
            <div className="grid-container">
                {products && products.map((product, index) => (
                    <ProductView key={index} index={index} product={product?.product || product} onLoadProduct={onLoadProduct}/>
                ))}
            </div>
        </Card>
    )
}
