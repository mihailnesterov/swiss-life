import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import Spinner from '../components/common/loader/Spinner';
import ContractItem from '../components/contracts/ContractItem';
import { getContract } from '../api/contract';

const ContractItemPage = () => {
    
    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if(id === 'new') {
            setTitle('Добавить договор');
        } else {
            setLoading(true);
            getContract(parseInt(id))
                .then(res => setContract(res.data))
                .catch(err => console.log(err))
                .finally(() => setLoading(false));
        }
        
        return () => setContract(null);
    },[id]);

    useEffect(() => {
        if(contract && contract.id) {
            setTitle(`Договор: ${contract.description}`);
        }
        
        return () => setTitle(null);
    },[contract]);

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
                <ContractItem contract={contract} />
            </div>
        </PageLayout>
    )
}

export default ContractItemPage;