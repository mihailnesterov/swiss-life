import React from 'react';
import {useNavigate} from 'react-router-dom';
import {RouteNames} from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

const UserMailBox = (props) => {
   
    const {newMessages} = props;

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
                    newMessages > 0 && <span>{newMessages}</span>
                }
            </button>
        </div>
    )
}


export default UserMailBox;