import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import {useActions} from '../../hooks/useActions';
import ContractsListItem from './ContractsListItem';
import Spinner from '../common/loader/Spinner';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../api';

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
            <div>
                <h3>Список договоров</h3>
                <Link to={`${BASE_URL}/contracts/new`}>+ Добавить</Link>
            </div>
            <div>
                {
                    contracts &&
                    contracts.length > 0 &&
                    contracts.map(item => <ContractsListItem key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}

export default ContractsList;