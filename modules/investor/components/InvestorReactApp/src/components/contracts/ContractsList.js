import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import {useActions} from '../../hooks/useActions';
import ContractsListItem from './ContractsListItem';
import Spinner from '../common/loader/Spinner';

const ContractsList = () => {
    
    const {contracts, loading} = useSelector( state => state.contracts);
    
    const {fetchContracts} = useActions();
    
    const [contractsList, setContractsList] = useState(null);

    useEffect(() => {
        fetchContracts();
    },[]);

    useEffect(() => {
        if(contracts && contracts.contracts && contracts.contracts.length > 0) {
            setContractsList(contracts.contracts);
        }
        return () => setContractsList(null);
    },[contracts]);

    return (
        loading ?
        <Spinner size={2} /> :

        <div className='contracts-list'>
            {
                contractsList &&
                contractsList.length > 0 &&
                contractsList.map(item => <ContractsListItem key={item.id} item={item} />)
            }
        </div>
    )
}

export default ContractsList;