import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import DocumentsListItem from './DocumentsListItem';
import Spinner from '../common/loader/Spinner';

const DocumentsList = () => {

    const {user, loading} = useSelector( state => state.user);

    const [userDocuments, setUserDocuments] = useState(null);

    useEffect(() => {
        if(user.userDocuments && user.userDocuments.length > 0 ) {
            setUserDocuments(user.userDocuments);
        }
    },[user]);

    return (
        <div className='documents-list'>
            {
                loading ?
                <Spinner size={2} /> :
                userDocuments && 
                userDocuments.map(item => <DocumentsListItem item={item} />)
            }
        </div>
    )
}

export default DocumentsList;