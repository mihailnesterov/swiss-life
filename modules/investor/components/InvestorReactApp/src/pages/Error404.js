import React from 'react';
import { Trans } from '@lingui/macro';

const Error404 = () => {
    return (
        <div className='page'>
            <h1>404 error</h1>
            <div>
                <p><Trans>Страница не найдена...</Trans></p>
            </div>
        </div>
    )
}

export default Error404;