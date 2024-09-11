import React, { useState, useEffect } from 'react';
import './style.css';
import Button from '../Button';
import Utils from '../../Utils';

export default ({ children, onClick, fontSize, text }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Após um pequeno atraso, ative a animação de fade in
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 100); // Ajuste o tempo conforme necessário

        // Limpe o timeout no desmonte do componente para evitar vazamentos de memória
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Button
            onClick={onClick}
            className={isVisible ? 'fade-in' : ''}
            style={{
                opacity: 1,
                position: 'fixed',
                right: 0,
                bottom: 0,
                marginBottom: Utils.mobileCheck() ? '95px' : '30px',
                marginRight: Utils.mobileCheck() ? '10px' : '30px',
                width: Utils.mobileCheck() ? '60px' : undefined,
                borderRadius: Utils.mobileCheck() ? '50%' : '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                trasition: '.2s',
                display: (isVisible) ? 'flex' : 'none',
                zIndex: '9'
            }}
        >
            <span style={{ fontSize: fontSize ? fontSize : '2.5rem' }}>{children}</span>
            {text && !Utils.mobileCheck() ? (<b>&nbsp;{text}</b>) : (null)}
        </Button>
    );
};