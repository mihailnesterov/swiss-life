import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 

const DocumentsListItem = (props) => {

    const {item} = props;

    return (
        <div>
            <div>
                <a href={item.url} target='_blank'>
                    <FontAwesomeIcon icon={solid('square-arrow-up-right')} /> Открыть
                </a>
                <a download={item.url} href={item.url}>
                    <FontAwesomeIcon icon={solid('download')} /> Скачать
                </a>
            </div>
            <img src={item.url} alt={item.name} />
        </div>
    )
}

export default DocumentsListItem;