import React from 'react';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';
import GoBackBtn from '../common/buttons/GoBackBtn';
import { Trans, t } from '@lingui/macro';

const InvestmentItem = (props) => {

    const {item} = props;

    return (
        <div className="investment-item">
            <div>
                <GoBackBtn
                    url='investment'
                    title={t({
                        id: 'В список объектов', 
                        message: 'В список объектов'
                    })}
                />
            </div>
            {
                item.assetFiles &&
                item.assetFiles.length > 0 &&
                <div>
                    {
                        item.assetFiles.map(image => 
                            <img 
                                src={image.url} 
                                alt={image.name} 
                            />
                        )
                    }
                </div>
            }
            
            <div>
                <p>{item.description}</p>
                <p><Trans>Стоимость</Trans>: <b>{item.calculation}</b></p>
                <Link to={`${BASE_URL}/invest/${item.id}`}><Trans>Инвестировать</Trans></Link>
            </div>
        </div>
    )
}

export default InvestmentItem;