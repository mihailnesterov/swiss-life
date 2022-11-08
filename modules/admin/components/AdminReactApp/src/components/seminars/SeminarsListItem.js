import React from 'react';
import { useActions } from '../../hooks/useActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 
import {deleteSeminar} from '../../api/seminar';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';
import EditBtn from '../common/buttons/EditBtn';
import DeleteBtn from '../common/buttons/DeleteBtn';

const SeminarsListItem = (props) => {

    const {item} = props;

    const {fetchSeminars} = useActions();

    const onSuccessHandler = () => {
        fetchSeminars();
    }

    return (
        <div>
            <div>
                {
                    item.file &&
                    item.file.id ?
                    <Link to={`${BASE_URL}/seminars/${item.id}`}>
                        <img 
                            src={item.file.url} 
                            alt={item.file.name} 
                        />
                    </Link> :
                    <Link to={`${BASE_URL}/seminars/${item.id}`}>
                        <FontAwesomeIcon 
                            size='3x' 
                            className='text-purple' 
                            icon={solid('image')} 
                        />
                    </Link>
                }
            </div>
            <div>
                <Link to={`${BASE_URL}/seminars/${item.id}`} title={item.name}>
                    {item.name}
                </Link>
            </div>
            <div>
                <p>{item.description}</p>
            </div>
            <div>
                <p>{item.start_date}</p>
            </div>
            <div>
                <p>{item.start_time}</p>
            </div>
            <div>
                <p><a href={item.form_link} target="_blank">{item.form_link}</a></p>
            </div>
            <div>
                <EditBtn 
                    id={item.id}
                    type='seminars'
                />
                <DeleteBtn 
                    id={item.id}
                    title={`Удалить семинар:\n ${item.name}`}
                    onDelete={deleteSeminar}
                    onSuccess={onSuccessHandler}
                    successMsg='Семинар удален!'
                    errorMsg='Ошибка при удалении семинара!'
                />
            </div>
        </div>
    )
}

export default SeminarsListItem;