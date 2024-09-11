import React from 'react'

export default ({children, checked, setChecked, flexStart, noMargin}) => {

    const handleChangeChecked = async () => {
        setChecked(!checked);
    }

    return (
        <div className={noMargin ? `` :`mt-2 mb-2`} style={{display: 'flex', alignItems: 'center', justifyContent: flexStart ? 'flex-start' : 'space-between'}} onClick={handleChangeChecked}>
            <div className='box shadow' style={{border: checked ? 'none' : 'solid 1px #ddd', background: checked ? "#000" : "#fff", color: checked ? 'white' : 'black', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '18px', height: '18px'}}>
                {checked ? (
                    <ion-icon name="checkmark-outline"></ion-icon>  
                ) : (null)}  
            </div>&nbsp;
            {children}
        </div>
    )
}
