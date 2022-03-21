import React from 'react';
import MembersListItem from './MembersListItem';
import Spinner from '../common/loader/Spinner';

const MembersList = (props) => {

    const {members, loading} = props;

    return (
        <div className='members-list'>
            <div>
                {
                    loading ?
                    <Spinner size={2} /> :
                    members.map(item => <MembersListItem key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}

export default MembersList;