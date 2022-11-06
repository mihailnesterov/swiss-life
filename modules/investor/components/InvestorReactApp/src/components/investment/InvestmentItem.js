import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';
import GoBackBtn from '../common/buttons/GoBackBtn';
import { Trans, t } from '@lingui/macro';

const InvestmentItem = (props) => {

    const {item} = props;

    const [activeImageUrl, setActiveImageUrl] = useState(null);
    const [activeImageAlt, setActiveImageAlt] = useState(null);
    
    useEffect(() => {
        if(item && item.assetFiles && item.assetFiles[0]) {
            setActiveImageUrl(item.assetFiles[0].url);
            setActiveImageAlt(item.assetFiles[0].name);
        }

        return () => {
            setActiveImageUrl(null);
            setActiveImageAlt(null);
        };
    },[item]);

    const activeImageHandle = (e) => {
        setActiveImageUrl(e.target.src);
        setActiveImageAlt(e.target.alt);
    }

    return (
        <div className="investment-item">
            <div>
                <GoBackBtn
                    url='investment'
                    title={t({
                        id: 'Вернуться к выбору объектов', 
                        message: 'Вернуться к выбору объектов'
                    })}
                />
            </div>
            <div>
                <h1>{t({id: 'Актив', message: 'Актив' })}: {item.name}</h1>
                <p>{item.category}</p>
            </div>
            <div>
                {
                    item.assetFiles &&
                    item.assetFiles.length > 0 &&
                    <div>
                        <img src={activeImageUrl} alt={activeImageAlt}  />
                        <div>
                            {
                                item.assetFiles.map(image => 
                                    <img 
                                        key={image.id}
                                        src={image.url} 
                                        alt={image.name} 
                                        onClick={activeImageHandle}
                                    />
                                )
                            }
                        </div>
                    </div>
                }
                <div>
                    <h3><Trans>Описание</Trans>:</h3>
                    <p>{item.description}</p>
                    {item.profit && item.profit > 0 && <b><Trans>Доходность</Trans> {item.profit}%</b>}
                    <h4><Trans>Стоимость</Trans>: {item.calculation}</h4>
                    <Link className='btn btn-gold' to={`${BASE_URL}/invest/${item.id}`}><Trans>Инвестировать</Trans></Link>
                </div>
            </div>
        </div>
    )
}

export default InvestmentItem;