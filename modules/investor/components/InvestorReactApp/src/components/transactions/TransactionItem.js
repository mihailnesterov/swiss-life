import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 
import {getDateTimeToString} from '../../utils/dates';

const TransactionItem = (props) => {

    const {item} = props;

    return (
        <div>
            <div>
                {item.id}
            </div>
            <div>
                {
                    item.debit > 0 ?
                    <FontAwesomeIcon className='text-green' icon={solid('plus')} /> :
                    <FontAwesomeIcon className='text-red' icon={solid('minus')} />
                }
            </div>
            <div>
                {
                    item.credit < 0 ?
                    <FontAwesomeIcon className='text-green' icon={solid('plus')} /> :
                    <FontAwesomeIcon className='text-red' icon={solid('minus')} />
                }
            </div>
            <div>
                {item.sum}
            </div>
            <div>
                <span className='text-gold'>
                    {item.currency.sign}
                </span>
            </div>
            <div>
                {item.type.name}
            </div>
            <div>
                {item.description}
            </div>
            <div>
                {
                    item.status === 1 ?
                    <FontAwesomeIcon className='text-green' icon={solid('check')} /> :
                    <FontAwesomeIcon className='text-red' icon={solid('xmark')} />
                }
            </div>
            <div>
                {getDateTimeToString(item.created)}
            </div>
            <div>
                {getDateTimeToString(item.accepted)}
            </div>
        </div>
    )
}


export default TransactionItem;