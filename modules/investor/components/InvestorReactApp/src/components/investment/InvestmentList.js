import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import InvestmentListItem from './InvestmentListItem';
import Spinner from '../common/loader/Spinner';

const InvestmentList = () => {

    const {assets, loading} = useSelector( state => state.assets);

    const {fetchAssets} = useActions();

    useEffect(() => {
        fetchAssets();
    },[]);

    return (
        assets &&
        assets.length > 0 &&
        <div className='investment-list'>
            <h2>Объекты инвестирования</h2>
            <div>
                {
                    loading ?
                    <Spinner size={2} /> :
                    assets.map(item => <InvestmentListItem item={item} />)
                }
            </div>
        </div>
    )
}

export default InvestmentList;