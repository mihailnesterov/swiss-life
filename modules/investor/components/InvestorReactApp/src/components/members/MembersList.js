import React from 'react';
import MembersListHead from './MembersListHead';
import MembersListItem from './MembersListItem';

const MembersList = (props) => {

    const {members} = props;

    return (
        <div className='members-list'>
            <table>
                <thead>
                    <MembersListHead />
                </thead>
                <tbody>
                    {
                        members.map((item,i) => <MembersListItem key={item.id} num={i} item={item} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MembersList;