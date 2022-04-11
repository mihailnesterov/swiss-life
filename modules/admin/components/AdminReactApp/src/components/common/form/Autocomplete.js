import React, { useEffect, useState, useRef } from 'react';

const Autocomplete = (props) => {

    const {
        name, 
        placeholder, 
        getSearchData, 
        setResult,
        label, 
        required, 
        params, 
        inputFields,
        excludeSelf
    } = props;

    const [searchData, setSearchData] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [isDropdownListOpen, setDropdownListOpen] = useState(false);

    const [clickedOutside, setClickedOutside] = useState(false);
    const dropdownListRef = useRef();

    useEffect(() => {
        if(searchValue !== '') {
            setParams();
            setDropdownListOpen(true);
            setClickedOutside(false);
            getSearchData(setParams())
                .then(res => setSearchData(
                    excludeSelf ?
                    res.data.filter(item => item.id !== searchData.id) :
                    res.data
                ))
                .catch(err => console.log(`${name} search error`, err))
        } else {
            setDropdownListOpen(false);
        }

        return () => {
            setDropdownListOpen(false);
            setClickedOutside(false);
        }
    }, [searchValue]);

    const onChangeSearchValueHandler = (e) => {
        setSearchValue(e.target.value);
    }

    const onClickUsersSearchHandler = () => {
        if(searchValue === '') {
            setClickedOutside(false);
            setDropdownListOpen(true);
            getSearchData(setParams())
                .then(res => setSearchData(
                    excludeSelf ?
                    res.data.filter(item => item.id !== searchData.id) :
                    res.data
                ))
                .catch(err => console.log(`${name} search error`, err))
        }
    }

    const setParams = () => {
        const _params = {'per-page': '5'}
        for(let i in params) {
            _params[params[i]] = searchValue;
        }
        return _params;
    }

    const onSelectSearchValueHandler = value => {
        //setSearchValue(value);
        setResult(value);
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
            htmlFor={`${name ? name : 'search'}`}
            className='autocomplete'
        >
            {label && <p><small>{label}</small></p>}
            <input 
                name={`${name ? name : null}`}
                type='text'
                placeholder={placeholder ? placeholder : 'Найти'}
                //value={searchValue}
                onChange={onChangeSearchValueHandler}
                onClick={onClickUsersSearchHandler}
                autoComplete='off'
                required={required ? required : false}
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
                                searchData &&
                                searchData.length > 0 ?
                                searchData.map(item => 
                                    <li 
                                        key={item.id}
                                        onClick={() => onSelectSearchValueHandler(item[`${name}`])}
                                    >
                                        {inputFields.map((field,i) => <span key={i} className='mr-1'>{item[`${field}`]}</span>)}
                                    </li>
                                ) :
                                <li>Не найдено...</li>
                            }
                        </ul>
                    </div>    
                }
        </label>
    )
}

export default Autocomplete;