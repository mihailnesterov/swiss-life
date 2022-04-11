import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import InvestmentListItem from './InvestmentListItem';
import Spinner from '../common/loader/Spinner';
import AssetCategoriesFilter from './AssetCategoriesFilter';
import InvestmentHead from './InvestmentHead';
import Pagination from '../common/pagination';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';
import ListMetaHeader from '../common/header/ListMetaHeader';

const InvestmentList = () => {

    const {assets, links, meta, loading} = useSelector( state => state.assets);
    const {assetCategories} = useSelector( state => state.assetCategories);

    const {fetchAssets, fetchAssetsCategories} = useActions();

    useEffect(() => {
        fetchAssets();
        fetchAssetsCategories();
    },[]);

    return (
        <div className='investment-list'>
            <div>
                <ListMetaHeader
                    title="Список активов"
                    meta={meta}
                />
                <Link to={`${BASE_URL}/investment/new`}>+ Добавить</Link>
            </div>
            {
                loading ?
                <Spinner size={2} /> :
                <>
                    {
                        assetCategories &&
                        assetCategories.length > 0 &&
                        <AssetCategoriesFilter categories={assetCategories} />
                    }
                    <InvestmentHead />
                    <div>
                        { assets.map(item => <InvestmentListItem key={item.id} item={item} />)}
                    </div>
                    <Pagination 
                        id={null} 
                        links={links} 
                        meta={meta} 
                        fetchData={fetchAssets} 
                    />
                </>
            }
        </div>
    )
}

export default InvestmentList;