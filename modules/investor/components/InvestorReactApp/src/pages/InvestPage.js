import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import InvestForm from '../components/investment/InvestForm';
import Spinner from '../components/common/loader/Spinner';
import { getAsset } from '../api/asset';
import { t } from '@lingui/macro';

const InvestPage = () => {

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
            setTitle(`${t({id: 'Инвестировать в актив', message: 'Инвестировать в актив' })}: ${asset.name}`);
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
            <div className='page-invest'>
                <InvestForm asset={asset} />
            </div>
        </PageLayout>
    )
}

export default InvestPage;