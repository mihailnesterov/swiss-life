import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayoutWithoutTitle from '../layouts/PageLayoutWithoutTitle';
import InvestmentItem from '../components/investment/InvestmentItem';
import { getAsset } from '../api/asset';

const InvestmentItemPage = () => {
    
    const {id} = useParams();

    const [asset, setAsset] = useState(null);

    useEffect(() => {
        getAsset(parseInt(id))
            .then(res => setAsset(res.data))
            .catch(err => console.log(err));

        return () => setAsset(null);
    },[id]);

    return (
        asset &&
        <PageLayoutWithoutTitle>
            <div className='page-investment'>
                <InvestmentItem item={asset} />
            </div>
        </PageLayoutWithoutTitle>
    )
}

export default InvestmentItemPage;