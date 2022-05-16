import React from 'react';
import { useActions } from '../../hooks/useActions';
import { Trans } from '@lingui/macro';

const AssetCategoriesFilter = (props) => {

    const {categories} = props;

    const {fetchAssets} = useActions();

    const setActiveCategory = (item) => {
        if ( item === 'Все' )
            fetchAssets();
        else
            fetchAssets({'category':item});
    }

    return (
        <div className='asset-categories-filter'>
            <ul>
                <li>
                    <button
                        onClick={() => setActiveCategory('Все')}
                    ><Trans>Все</Trans></button>
                </li>
                {
                    categories.map(item => 
                        <li key={item}>
                            <button 
                                onClick={() => setActiveCategory(item)}
                            >{item}</button>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default AssetCategoriesFilter;