import React from 'react';
import { useActions } from '../../hooks/useActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 
import {getDateTimeToString} from '../../utils/dates';
import StatusChecked from '../common/status/StatusChecked';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';
import {deleteUser} from '../../api/user'
import EditBtn from '../common/buttons/EditBtn';
import DeleteBtn from '../common/buttons/DeleteBtn';

const AdminListItem = (props) => {

    const {item} = props;

    const {fetchRoleAdminExpanded} = useActions();

    return (
        <div>
            <div>
                {item.id}
            </div>
            <div>
                {
                    item.userPhotos && 
                    item.userPhotos.length > 0 ?
                    <Link to={`${BASE_URL}/admins/${item.id}`}>
                        <img 
                            src={item.userPhotos[0].url} 
                            alt={item.userPhotos[0].id} 
                        />
                    </Link> :
                    <Link to={`${BASE_URL}/admins/${item.id}`}>
                        <FontAwesomeIcon 
                            className='text-purple' 
                            size='3x'
                            icon={solid('circle-user')} 
                        />
                    </Link>
                }
            </div>
            <div>
                <Link to={`${BASE_URL}/admins/${item.id}`}>
                    {item.fullName}
                </Link>
            </div>
            <div>
                {item.email}
            </div>
            <div>
                {item.phone}
            </div>
            <div>
                <StatusChecked
                    condition={item.status}
                    value={1}
                    textTrue=''
                    textFalse=''
                />
            </div>
            <div>
                {getDateTimeToString(item.created)}
            </div>
            <div>
                <EditBtn 
                    id={item.id}
                    type='admins'
                />
                <DeleteBtn 
                    id={item.id}
                    title={`Удалить администратора:\n ${item.email}\n и все его данные`}
                    onDelete={deleteUser}
                    onSuccess={fetchRoleAdminExpanded}
                    successMsg='Администратор удален!'
                    errorMsg='Ошибка при удалении администратора!'
                />
            </div>
        </div>
    )
}

export default AdminListItem;