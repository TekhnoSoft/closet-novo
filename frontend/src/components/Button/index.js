import React from 'react';
import './style.css';

export default ({children, style, onClick, className, disabled}) => {
  return (
    <button disabled={disabled} className={`btn ${className}`} style={style} onClick={onClick}>
        {children}
    </button>
  )
}
