import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import {useNavigate} from 'react-router-dom';
import {RouteNames} from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

const AdminMailBox = () => {
   
    const {count} = useSelector( state => state.messagesCount);
    
    const {fetchNewMessagesCount} = useActions();

    useEffect(() => {
        fetchNewMessagesCount();
    }, []);
    
    const navigate = useNavigate();
    
    const {MESSAGES} = RouteNames;

    const handleNavigateToMessagesPage = () => {
        navigate(MESSAGES);
    }

    return (
        <div>
            <button 
                onClick={handleNavigateToMessagesPage}
            >
                <FontAwesomeIcon 
                    size='2x' 
                    icon={regular('envelope')} 
                />
                { 
                    count > 0 && <span>{count}</span>
                }
            </button>
        </div>
    )
}

export default AdminMailBox;