import React, { useEffect, useState, useRef } from 'react';
import {getAssets, getAsset} from '../../../api/asset';

const AutocompleteAsset = (props) => {

    const {transaction, setParams, params} = props;

    const [asset, setAsset] = useState(null);
    const [assets, setAssets] = useState(null);

    const [isDropdownListOpen, setDropdownListOpen] = useState(false);

    const [clickedOutside, setClickedOutside] = useState(false);
    const dropdownListRef = useRef();

    useEffect(() => {
        getAssets()
            .then(res => setAssets(res.data))
            .catch(err => console.log(`get assets error`, err));
    }, []);

    useEffect(() => {
        if(assets && assets.length > 0 && transaction && transaction.asset_id) {
            getAsset(transaction.asset_id)
                .then(res => setAsset(res.data))
                .catch(err => console.log(`get asset by id error`, err));
        }
    }, [assets, transaction]);

    const handleClickAsset = () => {
        setClickedOutside(false);
        setDropdownListOpen(true);
    }

    const handleSelectAsset = item => {
        setAsset(item);
        setParams({
            'asset_id':Number(item.id),
            ...params
        });
        setDropdownListOpen(false);
    }

    const onDropdownListClickOutsideHandler = e => {
        if (dropdownListRef.current && !dropdownListRef.current.contains(e.target)) {
            setClickedOutside(true);
        }
    };

    const onDropdownListClickInsideHandler = () => setClickedOutside(false);

    useEffect(() => {
        document.addEventListener('mousedown', onDropdownListClickOutsideHandler);
        return () => document.removeEventListener('mousedown', onDropdownListClickOutsideHandler);
    }, []);

    return (
        <label 
            htmlFor="assets"
            className='autocomplete'
        >
            <p><small>Актив</small></p>
            <input 
                name='assets'
                type='text'
                placeholder='Выберите актив'
                value={asset && asset.name && asset.name}
                onClick={handleClickAsset}
                autoComplete='off'
            />
                {
                    (isDropdownListOpen && !clickedOutside) &&
                    <div 
                        ref={dropdownListRef}
                        className='autocomplete-items'
                        onClick={onDropdownListClickInsideHandler}
                    >
                        <ul>
                            {
                                assets &&
                                assets.assets &&
                                assets.assets.length > 0 ?
                                assets.assets.map(item => 
                                    <li 
                                        key={item.id}
                                        onClick={() => handleSelectAsset(item)}
                                    >
                                        {item.name}
                                    </li>
                                ) :
                                <li>Не найдено...</li>
                            }
                        </ul>
                    </div>    
                }
                <input 
                    name='asset_id'
                    type='hidden'
                    placeholder='asset_id'
                    value={asset && asset.id && asset.id}
                    autoComplete='off'
                />
        </label>
    )
}

export default AutocompleteAsset;