import React from 'react';
import {getDateToString} from '../../utils/dates';

const TransactionItem = (props) => {

    const {item} = props;

    return (
        <tr>
            <td>{getDateToString(item.created)}</td>
            <td>{item.type.name}</td>
            <td>
                <div>
                    {item.description && <span>{item.description}</span>}
                    {
                        item.status === 1 &&
                        <div>
                            {
                                item.debit !== 0 &&
                                <svg width="30" height="15" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.897178 14.1408C0.403789 13.6545 0.403789 12.8585 0.897178 12.3722L12.3505 1.08302C13.0543 0.389559 14.0086 -5.09892e-06 15.0038 -4.78162e-06C15.9989 -4.46433e-06 16.9532 0.38956 17.657 1.08302L29.1028 12.3648C29.5962 12.8511 29.5962 13.6471 29.1028 14.1334C28.6194 14.6099 27.8429 14.6099 27.3595 14.1334L15.8882 2.8265C15.6536 2.59534 15.3355 2.46549 15.0038 2.46549C14.672 2.46549 14.3539 2.59534 14.1193 2.8265L2.64047 14.1408C2.15705 14.6173 1.3806 14.6173 0.897178 14.1408Z" fill="#47BB1E"/>
                                </svg>
                            }
                            {
                                item.credit !== 0 &&
                                <svg width="30" height="15" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M29.1028 0.85916C29.5962 1.34548 29.5962 2.14148 29.1028 2.6278L17.6495 13.917C16.9457 14.6104 15.9914 15 14.9962 15C14.0011 15 13.0468 14.6104 12.343 13.917L0.89718 2.63519C0.403791 2.14888 0.40379 1.35287 0.89718 0.866551C1.3806 0.390061 2.15705 0.390061 2.64047 0.866551L14.1118 12.1735C14.3464 12.4047 14.6645 12.5345 14.9962 12.5345C15.328 12.5345 15.6461 12.4047 15.8807 12.1735L27.3595 0.859159C27.8429 0.382669 28.6194 0.382669 29.1028 0.85916Z" fill="#AD0E0E"/>
                                </svg>
                            }
                        </div>
                    }
                </div>
            </td>
            <td className={item.status === 0 ? 'text-red' : null}>{item.debit && item.debit !== 0 ? `${item.debit} ${item.currency.shortName}` : ''}</td>
            <td>{item.credit && item.credit !== 0 ? `${item.credit < 0 ? item.credit * (-1) : item.credit} ${item.currency.shortName}` : ''}</td>
            <td>{item.balance} {item.currency.shortName}</td>
            <td>{
                item.status === 1 ?
                <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.3191 0.431008L8.50012 14.249C8.40721 14.3423 8.2968 14.4163 8.17522 14.4668C8.05363 14.5173 7.92327 14.5433 7.79162 14.5433C7.65997 14.5433 7.52961 14.5173 7.40803 14.4668C7.28644 14.4163 7.17603 14.3423 7.08312 14.249L1.73912 8.90001C1.64621 8.80673 1.5358 8.73272 1.41422 8.68222C1.29263 8.63172 1.16228 8.60572 1.03062 8.60572C0.898968 8.60572 0.768609 8.63172 0.647027 8.68222C0.525444 8.73272 0.415031 8.80673 0.322121 8.90001C0.228844 8.99292 0.154832 9.10333 0.10433 9.22492C0.0538287 9.3465 0.027832 9.47685 0.027832 9.60851C0.027832 9.74016 0.0538287 9.87052 0.10433 9.9921C0.154832 10.1137 0.228844 10.2241 0.322121 10.317L5.66812 15.662C6.23207 16.2249 6.99632 16.5411 7.79312 16.5411C8.58992 16.5411 9.35417 16.2249 9.91812 15.662L23.7361 1.84701C23.8292 1.75412 23.9031 1.64377 23.9535 1.52228C24.004 1.40079 24.0299 1.27054 24.0299 1.13901C24.0299 1.00747 24.004 0.877231 23.9535 0.755741C23.9031 0.63425 23.8292 0.5239 23.7361 0.431008C23.6432 0.337732 23.5328 0.263719 23.4112 0.213217C23.2896 0.162716 23.1593 0.136719 23.0276 0.136719C22.896 0.136719 22.7656 0.162716 22.644 0.213217C22.5224 0.263719 22.412 0.337732 22.3191 0.431008Z" fill="#47BB1E"/>
                </svg> :
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 1L1 17M17 17L1 1L17 17Z" stroke="#AD0E0E" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            }</td>
        </tr>
    )
}

export default TransactionItem;