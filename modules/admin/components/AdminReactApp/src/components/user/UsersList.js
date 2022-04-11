import React, {useState, useEffect} from 'react';
//import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Pagination from '../common/pagination';
import UsersHead from './UsersHead';
import UserListItem from './UserListItem';
import UserAddNew from './UserAddNew';
import ListMetaHeader from '../common/header/ListMetaHeader';
//import CategoriesFilter from '../common/filters/CategoriesFilter';

const UsersList = (props) => {
    
    const {users, links, meta} = props;

    //const {usersCategories} = useSelector( state => state.usersCategories);

    const {fetchRoleUserExpanded, fetchUsersCategories} = useActions();

    const [isOpenNewUser, setOpenNewUser] = useState(false);

    useEffect(() => {
        fetchUsersCategories();
        // доделать фильтр с CategoriesFilter
    }, []);

    const handleOpenNewUser = () => setOpenNewUser(!isOpenNewUser);

    return (
        <div className='users-list'>
            <div>
                <ListMetaHeader
                    title="Список пользователей"
                    meta={meta}
                />
                <button onClick={handleOpenNewUser}>{isOpenNewUser ? 'Отмена' : '+ Добавить'}</button>
            </div>
            <UsersHead />
            <div>
                {isOpenNewUser && <UserAddNew onOpen={handleOpenNewUser} />}
                {users.map(item => <UserListItem key={item.id} item={item} />)}
            </div>
            <Pagination 
                id={null} 
                links={links} 
                meta={meta}
                fetchData={fetchRoleUserExpanded} 
            />
        </div>
    )
}

export default UsersList;