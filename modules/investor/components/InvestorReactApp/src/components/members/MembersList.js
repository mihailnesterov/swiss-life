import React from 'react';
import MembersListHead from './MembersListHead';
import MembersListItem from './MembersListItem';
import Spinner from '../common/loader/Spinner';
import MembersForm from './MembersForm';

const MembersList = (props) => {

    const {members, loading} = props;

    return (
        <div className='members-list'>
            <MembersForm />
            <MembersListHead />
            {
                loading ?
                <Spinner size={2} /> :
                members.map((item,i) => <MembersListItem key={item.id} num={i} item={item} />)
            }
        </div>
    )
}

export default MembersList;