import React, { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import {getDateTimeToString} from '../../utils/dates';
import {updateMessage} from '../../api/message';
import MessageEnvelope from './MessageEnvelope';
import { t } from '@lingui/macro';

const MessagesListItem = (props) => {

    const {item, selectMessage} = props;

    const {fetchUserAuthorizedExpanded} = useActions();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if( item && item.id) {
            selectMessage(item.id, checked);
        }
    }, [item, checked]);

    const handleChangeRead = () => {
        if(item && item.id) {
            updateMessage(item.id, {
                'isRead': item.isRead === 1 ? 0 : 1
            }).then(() => fetchUserAuthorizedExpanded())
            .catch(err => console.log(err))
        }
    }

    const handleChecked = () => setChecked(!checked);

    return (
        <tr>
            <td>
                <label>
                    <input type="checkbox" checked={checked} />
                    <span onClick={handleChecked}></span>
                </label>
            </td>
            <td>
                <span>
                    <MessageEnvelope 
                        isRead={item.isRead}
                        setRead={handleChangeRead}
                    />
                    <span>{item.theme}</span>
                </span>
            </td>
            <td>{item.text}</td>
            <td>
                <div>
                    {
                        item.messageFiles &&
                        item.messageFiles.length > 0 &&
                        item.messageFiles.map(item => 
                            <a 
                                key={item.id}
                                download={item.url}
                                href={item.url}
                                title={t({ id: 'Скачать вложенный файл', message: 'Скачать вложенный файл' })}
                            >
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_275_3510)">
                                        <path d="M14.3439 6.00024C14.2267 5.88307 14.0677 5.81725 13.902 5.81725C13.7363 5.81725 13.5773 5.88307 13.4601 6.00024L6.65261 12.8371C6.36243 13.1273 6.01792 13.3576 5.63877 13.5146C5.25961 13.6717 4.85323 13.7526 4.44283 13.7526C3.61397 13.7527 2.81905 13.4235 2.23292 12.8374C1.64679 12.2514 1.31747 11.4565 1.31741 10.6276C1.31736 9.79879 1.64656 9.00387 2.23261 8.41774L8.82573 1.79774C9.17829 1.4508 9.65365 1.25722 10.1483 1.25917C10.6429 1.26113 11.1167 1.45846 11.4665 1.80818C11.8163 2.1579 12.0138 2.63167 12.0159 3.12631C12.0179 3.62094 11.8245 4.09635 11.4776 4.44899L4.88448 11.069C4.76557 11.1829 4.60727 11.2465 4.44261 11.2465C4.27794 11.2465 4.11964 11.1829 4.00073 11.069C3.88356 10.9518 3.81774 10.7928 3.81774 10.6271C3.81774 10.4614 3.88356 10.3024 4.00073 10.1852L9.87073 4.28836C9.98458 4.17049 10.0476 4.01261 10.0462 3.84874C10.0447 3.68486 9.979 3.52811 9.86312 3.41223C9.74724 3.29635 9.59048 3.23062 9.42661 3.22919C9.26273 3.22777 9.10486 3.29076 8.98698 3.40461L3.11698 9.30149C2.94284 9.4756 2.8047 9.68231 2.71045 9.90982C2.6162 10.1373 2.56769 10.3812 2.56769 10.6274C2.56769 10.8737 2.6162 11.1175 2.71045 11.345C2.8047 11.5725 2.94284 11.7792 3.11698 11.9534C3.47424 12.2943 3.94909 12.4845 4.44292 12.4845C4.93674 12.4845 5.41159 12.2943 5.76886 11.9534L12.3614 5.33274C12.9351 4.74418 13.2539 3.95327 13.2486 3.13135C13.2433 2.30942 12.9145 1.52266 12.3332 0.941502C11.752 0.360343 10.9652 0.0315786 10.1432 0.0264286C9.32132 0.0212786 8.53046 0.340157 7.94198 0.913988L1.34886 7.53399C0.528342 8.3545 0.0673828 9.46736 0.0673828 10.6277C0.0673828 11.7881 0.528342 12.901 1.34886 13.7215C2.16937 14.542 3.28222 15.003 4.44261 15.003C5.60299 15.003 6.71584 14.542 7.53636 13.7215L14.3439 6.88649C14.4022 6.82841 14.4486 6.75936 14.4802 6.68331C14.5118 6.60727 14.5281 6.52572 14.5281 6.44336C14.5281 6.361 14.5118 6.27946 14.4802 6.20341C14.4486 6.12737 14.4022 6.05832 14.3439 6.00024Z" fill="#CEA15D"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_275_3510">
                                            <rect width="15" height="15" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        )
                    }
                </div>
            </td>
            <td>
                <div>
                    {getDateTimeToString(item.created)}
                </div>
            </td>
        </tr>
    )
}

export default MessagesListItem;