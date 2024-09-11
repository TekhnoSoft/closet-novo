import React, { useEffect, useState, useRef } from 'react';
import { Container, FlatButton, FragmentView } from '../../components';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Utils from '../../Utils';

export default () => {
    
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [loaded, setLoaded] = useState(false);
    const [text, setText] = useState(localStorage.getItem("search_text") || null);
    const [results, setResults] = useState([]);

    useEffect(() => {
        setLoaded(true);
        inputRef?.current?.focus();
        if(localStorage.getItem("search_text")){
            localStorage.removeItem("search_text")
        }
    }, [])

    const requestSearch = async (_text) => {
        setText(_text);
    }
    
    return (
        <FragmentView noPaddingContainer>
            {Utils.mobileCheck() ? (
                <FlatButton>
                    <ion-icon name="funnel-outline" style={{ fontSize: "1.5rem"}}></ion-icon>
                </FlatButton>
            ) : (null)}
            <Container center className={'mt-1'}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{background: "#fff", border: 'solid 1px #ddd', borderRadius: '16px', padding: '8px', width: '100%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{overflow: 'hidden', flex: '0.99'}}> 
                            <input  ref={inputRef} type='text' placeholder='Pesquisar produto...' style={{width: '100%', height: '40px', border: 'none', fontSize: '1rem', border: 'none', outline: 'none'}} onChange={e => requestSearch(e.target.value)} value={text} />
                        </div>
                        <ion-icon name="search-outline" style={{ fontSize: "1.5rem"}}></ion-icon>
                    </div>
                </div>
                {loaded ? (
                    <div className='search-results'>
                        {results?.length > 0 ? (
                            <>
                            produtos...
                            </>
                        ) : (
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <b className='mt-3' style={{color: 'gray'}}>{text}</b>
                            </div>
                        )}
                    </div>
                ) : (null)}
            </Container>
        </FragmentView>
    )
}