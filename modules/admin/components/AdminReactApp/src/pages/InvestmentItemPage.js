import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import Spinner from '../components/common/loader/Spinner';
import InvestmentItem from '../components/investment/InvestmentItem';
import { getAsset } from '../api/asset';

const InvestmentItemPage = () => {
    
    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(null);
    const [asset, setAsset] = useState(null);

    useEffect(() => {
        if(id === 'new') {
            setTitle('Добавить актив');
        } else {
            setLoading(true);
            getAsset(parseInt(id))
                .then(res => setAsset(res.data))
                .catch(err => console.log(err))
                .finally(() => setLoading(false));
        }
        
        return () => setAsset(null);
    },[id]);

    useEffect(() => {
        if(asset && asset.id) {
            setTitle(`Актив: ${asset.name}`);
        }
        
        return () => setTitle(null);
    },[asset]);

    if(loading) {
        return(
            <div className='m-1'>
                <Spinner size={2} />
            </div>
        );
    }

    return (
        <PageLayout title={title}>
            <div className='page-investment'>
                <InvestmentItem asset={asset} />
            </div>
        </PageLayout>
    )
}


export default InvestmentItemPage;