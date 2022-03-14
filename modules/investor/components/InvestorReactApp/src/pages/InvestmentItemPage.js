import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useActions } from '../hooks/useActions';
import PageLayout from '../layouts/PageLayout';
import Spinner from '../components/common/loader/Spinner';
import InvestmentItem from '../components/investment/InvestmentItem';

const InvestmentItemPage = () => {
    
    const {id} = useParams();

    const {assets, loading} = useSelector( state => state.assets);

    const {fetchAsset} = useActions();

    useEffect(() => {
        fetchAsset(parseInt(id));
    },[id]);

    if(loading) {
        return(
            <div className='m-1'>
                <Spinner size={2} />
            </div>
        );
    }

    return (
        assets && 
        assets.length > 0 &&
        <PageLayout title={assets[0].name}>
            <div className='page-investment'>
                <InvestmentItem item={assets[0]} />
            </div>
        </PageLayout>
    )
}


export default InvestmentItemPage;