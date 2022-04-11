import React, {useState} from 'react';
import { useActions } from '../../hooks/useActions';
import Pagination from '../common/pagination';
import ManagersHead from './ManagersHead';
import ManagerListItem from './ManagerListItem';
import ManagerAddNew from './ManagerAddNew';
import ListMetaHeader from '../common/header/ListMetaHeader';

const ManagersList = (props) => {
    
    const {managers, links, meta} = props;

    const {fetchRoleManagerExpanded} = useActions();

    const [isOpenNewManager, setOpenNewManager] = useState(false);

    const handleOpenNewManager = () => setOpenNewManager(!isOpenNewManager);

    return (
        <div className='managers-list'>
            <div>
                <ListMetaHeader
                    title="Список менеджеров"
                    meta={meta}
                />
                <button onClick={handleOpenNewManager}>{isOpenNewManager ? 'Отмена' : '+ Добавить'}</button>
            </div>
            <ManagersHead />
            <div>
                {isOpenNewManager && <ManagerAddNew onOpen={handleOpenNewManager} />}
                {managers.map(item => <ManagerListItem key={item.id} item={item} />)}
            </div>
            <Pagination 
                id={null} 
                links={links} 
                meta={meta}
                fetchData={fetchRoleManagerExpanded} 
            />
        </div>
    )
}

export default ManagersList;