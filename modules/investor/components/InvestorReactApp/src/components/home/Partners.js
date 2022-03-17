import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import {useActions} from '../../hooks/useActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Spinner from '../common/loader/Spinner';

const Partners = () => {
    // store
    const {partners, loading} = useSelector( state => state.partners);
    // action-creators
    const {fetchPartners} = useActions();
    // local state
    const [partnersList, setPartnersList] = useState(null);
    
    useEffect(() => {
        fetchPartners();
    },[]);

    useEffect(() => {
        if(partners && partners.length > 0) {
            setPartnersList(partners);
        }
        return () => setPartnersList(null);
    },[partners]);

    return (
        loading ? 
        <Spinner size={2} /> :
        <div className='partners'>
            <h3>Наши партнеры</h3>
            <div>
                {
                    partnersList &&
                    partnersList.map(item => 
                        <div key={item.id}>
                            <h4>{item.name}</h4>
                            <p><small>{item.description}</small></p>
                            <a 
                                href={item.url} 
                                target="_blank"
                                title="Перейти на сайт"
                            >
                                <FontAwesomeIcon icon={solid('link')} />
                            </a>
                            <a 
                                href={item.url} 
                                title="Подробнее..."
                            >
                                <FontAwesomeIcon icon={solid('ellipsis')} />
                            </a>
                        </div>
                    )
                }
            </div>
        </div>
    )
}


export default Partners;