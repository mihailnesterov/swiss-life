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
            <table>
                <thead>
                    <MembersListHead />
                </thead>
                <tbody>
                    {
                        loading ?
                        <Spinner size={2} /> :
                        members &&
                        members.length > 0 &&
                        members.map((item,i) => <MembersListItem key={item.id} num={i} item={item} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MembersList;