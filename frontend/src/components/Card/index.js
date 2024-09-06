import React from 'react';
import './style.css';

export default ({children, style, className}) => {
  return (
    <div className={`card ${className ? className : ''}`} style={style}>
        {children}
    </div>
  )
}
