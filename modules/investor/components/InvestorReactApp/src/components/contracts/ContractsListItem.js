import React from 'react';
import {getIconByFileExt} from '../../utils/files';
import { t } from '@lingui/macro';

const ContractsListItem = (props) => {

    const {item} = props;

    return (
        <a download={item.file.url} href={item.file.url}>
            {getIconByFileExt(item.file.extention)}
            <span title={t({id: 'Скачать', message: 'Скачать'})}>
                {item.description !== '' ? item.description : item.file.name}
            </span>
        </a>
    )
}

export default ContractsListItem;