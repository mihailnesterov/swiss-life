import React, {useState, useMemo} from 'react';
import { useActions } from '../../hooks/useActions';
import { Trans } from '@lingui/macro';

const AssetCategoriesFilter = (props) => {

    const {categories} = props;

    const {fetchAssets} = useActions();

    const [active, setActive] = useState(null);

    useMemo(() => {
        setActive('Все');
    }, []);

    const setActiveCategory = (item) => {
        if ( item === 'Все' )
            fetchAssets();
        else
            fetchAssets({'category':item});
        setActive(item);
    }

    return (
        <div className='asset-categories-filter'>
            <ul>
                <li>
                    <button
                        className={active === 'Все' ? 'active' : null}
                        onClick={() => setActiveCategory('Все')}
                    ><Trans>Все</Trans></button>
                </li>
                {
                    categories.map(item => 
                        <li key={item}>
                            <button 
                                className={active === item ? 'active' : null}
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