import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useActions } from '../hooks/useActions';
import PageLayout from '../layouts/PageLayout';
import InvestForm from '../components/investment/InvestForm';
import Spinner from '../components/common/loader/Spinner';

const InvestPage = () => {

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

    console.log('объект',assets[0]);

    return (
        <PageLayout title={`Инвестировать в объект "${assets[0].name}"`}>
            <InvestForm />
        </PageLayout>
    )
}

export default InvestPage;