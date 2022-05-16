import React from 'react';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';
import { Trans } from '@lingui/macro';

const InvestmentListItem = (props) => {

    const {item} = props;

    return (
        <div>
            {
                item.assetFiles && 
                item.assetFiles.length > 0 &&
                <Link to={`${BASE_URL}/investment/${item.id}`}>
                    <img 
                        src={item.assetFiles[0].url} 
                        alt={item.assetFiles[0].name} 
                    />
                </Link>
            }
            <div>
                <h3>{item.name}</h3>
                <p>{item.excerpt}</p>
                <p><Trans>Стоимость</Trans>: <b>{item.calculation}</b></p>
                <Link className='btn btn-more mr-1' to={`${BASE_URL}/investment/${item.id}`}><Trans>Подробнее...</Trans></Link>
                <Link className='btn btn-red' to={`${BASE_URL}/invest/${item.id}`}><Trans>Инвестировать</Trans></Link>
            </div>
        </div>
    )
}

export default InvestmentListItem;