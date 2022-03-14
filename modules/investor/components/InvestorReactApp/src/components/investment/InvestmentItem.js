import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';

const InvestmentItem = (props) => {

    const {item} = props;

    return (
        <div className="investment-item">
            <div>
                <Link 
                    className='btn btn-more' 
                    to={`${BASE_URL}/investment`}
                >
                    <FontAwesomeIcon icon={solid('angles-left')} /> В список объектов
                </Link>
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
                <p>Стоимость: <b>{item.calculation}</b></p>
                <Link to={`${BASE_URL}/invest/${item.id}`}>Инвестировать</Link>
            </div>
        </div>
    )
}

export default InvestmentItem;