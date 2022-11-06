import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import InvestForm from '../components/investment/InvestForm';
import { getAsset } from '../api/asset';
import { t } from '@lingui/macro';

const InvestPage = () => {

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
        <PageLayout title={t({
            id: 'Инвестировать в актив', 
            message: 'Инвестировать в актив' 
        })}>
            <div className='page-invest'>
                <InvestForm asset={asset} />
            </div>
        </PageLayout>
    )
}

export default InvestPage;