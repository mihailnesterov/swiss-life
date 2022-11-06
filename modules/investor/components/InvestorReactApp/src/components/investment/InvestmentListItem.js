import React from 'react';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';
import { Trans } from '@lingui/macro';

const InvestmentListItem = (props) => {

    const {item} = props;

    return (
        <div>
            <div>
                <h3>{item.name}</h3>
                <p>{item.excerpt}</p>
                {
                    (item.maximum || item.minimum) &&
                    <div>
                        {
                            item.maximum &&
                            <p><small><Trans>Исторический максимум</Trans>: {item.maximum.replace('.', ',')}%</small></p>
                        }
                        {
                            item.minimum &&
                            <p><small><Trans>Исторический минимум</Trans>: {item.minimum.replace('.', ',')}%</small></p>
                        }
                    </div>
                }
            </div>
            <div>
                <p><Trans>Стоимость</Trans>: <b>{item.calculation}</b></p>
                <div>
                    <Link className='btn btn-default' to={`${BASE_URL}/investment/${item.id}`}><Trans>Подробнее</Trans></Link>
                    <Link className='btn btn-gold' to={`${BASE_URL}/invest/${item.id}`}><Trans>Инвестировать</Trans></Link>
                </div>
            </div>
        </div>
    )
}

export default InvestmentListItem;