import React, { useEffect, useState } from 'react';
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
        setLoading(true);
        getAsset(parseInt(id))
            .then(res => setAsset(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));

        return () => setAsset(null);
    },[id]);

    useEffect(() => {
        if(asset && asset.name) {
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
        asset &&
        <PageLayout title={title}>
            <div className='page-investment'>
                <InvestmentItem item={asset} />
            </div>
        </PageLayout>
    )
}

export default InvestmentItemPage;