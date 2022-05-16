import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Trans } from '@lingui/macro';

const DocumentsListItem = (props) => {

    const {item} = props;

    return (
        <div>
            <div>
                <a href={item.url} target='_blank'>
                    <FontAwesomeIcon icon={solid('square-arrow-up-right')} /> <Trans>Открыть</Trans>
                </a>
                <a download={item.url} href={item.url}>
                    <FontAwesomeIcon icon={solid('download')} /> <Trans>Скачать</Trans>
                </a>
            </div>
            <img src={item.url} alt={item.name} />
        </div>
    )
}

export default DocumentsListItem;