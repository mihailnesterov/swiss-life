import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Pagination from '../common/pagination';
import InvestmentListItem from './InvestmentListItem';
import Spinner from '../common/loader/Spinner';
import AssetCategoriesFilter from './AssetCategoriesFilter';

const InvestmentList = () => {

    const {assets, links, meta, loading} = useSelector( state => state.assets);
    const {assetCategories} = useSelector( state => state.assetCategories);

    const {fetchAssets, fetchAssetsCategories} = useActions();

    useEffect(() => {
        fetchAssets();
        fetchAssetsCategories();
    },[]);

    return (
        loading ?
        <Spinner size={2} /> :
        
        <div className='investment-list'>
            <h2>Объекты инвестирования</h2>
            {
                assetCategories &&
                assetCategories.length > 0 &&
                <AssetCategoriesFilter categories={assetCategories} />
            }
            <div>
                {
                    assets &&
                    assets.length > 0 &&
                    assets.map(item => <InvestmentListItem key={item.id} item={item} />)
                }
            </div>
            <Pagination 
                id={null} 
                links={links} 
                meta={meta} 
                fetchData={fetchAssets} 
            />
        </div>
    )
}

export default InvestmentList;