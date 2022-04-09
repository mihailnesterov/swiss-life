import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import {useActions} from '../../hooks/useActions';
import ContractsListItem from './ContractsListItem';
import Spinner from '../common/loader/Spinner';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../api';

const ContractsList = () => {
    
    const {contracts, meta, loading} = useSelector( state => state.contracts);
    
    const {fetchContracts} = useActions();
    
    const [contractsList, setContractsList] = useState(null);

    useEffect(() => {
        fetchContracts();
    },[]);

    useEffect(() => {
        if(contracts && contracts.length > 0) {
            setContractsList(contracts);
        }
        return () => setContractsList(null);
    },[contracts]);

    return (
        loading ?
        <Spinner size={2} /> :

        <div className='contracts-list'>
            <div>
                <h3>Список договоров{meta && meta.totalCount && ` (${meta.totalCount})`}</h3>
                <Link to={`${BASE_URL}/contracts/new`}>+ Добавить</Link>
            </div>
            <div>
                {
                    contractsList &&
                    contractsList.length > 0 &&
                    contractsList.map(item => <ContractsListItem key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}

export default ContractsList;