import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';

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
                    >Все</button>
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