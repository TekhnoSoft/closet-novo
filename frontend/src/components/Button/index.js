import React from 'react';
import './style.css';

export default ({children, style, onClick, className}) => {
  return (
    <button className={`btn ${className}`} style={style} onClick={onClick}>
        {children}
    </button>
  )
}
