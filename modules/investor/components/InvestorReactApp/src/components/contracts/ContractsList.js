import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import {useActions} from '../../hooks/useActions';
import ContractsListItem from './ContractsListItem';
import Spinner from '../common/loader/Spinner';

const ContractsList = () => {
    
    const {contracts, loading} = useSelector( state => state.contracts);
    
    const {fetchContracts} = useActions();

    useEffect(() => {
        fetchContracts();
    },[]);

    return (
        loading ?
        <Spinner size={2} /> :

        <div className='contracts-list'>
            {
                contracts &&
                contracts.length > 0 &&
                contracts.map(item => <ContractsListItem key={item.id} item={item} />)
            }
        </div>
    )
}

export default ContractsList;