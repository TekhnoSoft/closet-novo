import React from 'react'

export default ({elevation, color}) => {
  return (
    <div className='mt-1 mb-1' style={{width: '100%', height: elevation, background: color ? color : '#f5f5f5'}}></div>
  )
}
