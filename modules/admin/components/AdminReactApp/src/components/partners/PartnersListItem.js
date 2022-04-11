import React from 'react';
import { useActions } from '../../hooks/useActions';
import {deletePartner} from '../../api/partner';
import {getDateToString} from '../../utils/dates';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';
import EditBtn from '../common/buttons/EditBtn';
import DeleteBtn from '../common/buttons/DeleteBtn';

const PartnersListItem = (props) => {

    const {item} = props;

    const {fetchPartners} = useActions();

    const onSuccessHandler = () => {
        fetchPartners({'sort':'-created'});
    }

    return (
        <div>
            <div>
                <Link to={`${BASE_URL}/partners/${item.id}`} title={item.name}>
                    {item.name}
                </Link>
            </div>
            <div>
                <p>{item.description}</p>
            </div>
            <div>
                <p><a href={item.url} target="_blank">{item.url}</a></p>
            </div>
            <div>
                <p>{getDateToString(item.created)}</p>
            </div>
            <div>
                <EditBtn 
                    id={item.id}
                    type='partners'
                />
                <DeleteBtn 
                    id={item.id}
                    title={`Удалить партнера:\n ${item.name}`}
                    onDelete={deletePartner}
                    onSuccess={onSuccessHandler}
                    successMsg='Партнер удален!'
                    errorMsg='Ошибка при удалении партнера!'
                />
            </div>
        </div>
    )
}

export default PartnersListItem;