import React, {useState} from 'react';
import { useActions } from '../../hooks/useActions';
import Pagination from '../common/pagination';
import AdminsHead from './AdminsHead';
import AdminListItem from './AdminListItem';
import AdminAddNew from './AdminAddNew';
import ListMetaHeader from '../common/header/ListMetaHeader';

const AdminsList = (props) => {
    
    const {admins, links, meta} = props;

    const {fetchRoleAdminExpanded} = useActions();

    const [isOpenNewAdmin, setOpenNewAdmin] = useState(false);

    const handleOpenNewAdmin = () => setOpenNewAdmin(!isOpenNewAdmin);

    return (
        <div className='admins-list'>
            <div>
                <ListMetaHeader
                    title="Список администраторов"
                    meta={meta}
                />
                <button onClick={handleOpenNewAdmin}>{isOpenNewAdmin ? 'Отмена' : '+ Добавить'}</button>
            </div>
            <AdminsHead />
            <div>
                {isOpenNewAdmin && <AdminAddNew onOpen={handleOpenNewAdmin} />}
                {admins.map(item => <AdminListItem key={item.id} item={item} />)}
            </div>
            <Pagination 
                id={null} 
                links={links} 
                meta={meta}
                fetchData={fetchRoleAdminExpanded} 
            />
        </div>
    )
}

export default AdminsList;