import React from 'react';

const UserStatus = (props) => {
    
    const {userStatus} = props;
    
    return (
        <p>Статус: <span title={userStatus.description} 
            style={{
                backgroundColor:`#${userStatus.color}`,
                color: `#${userStatus.id === 2 ? 'fff' : '000'}`,
                padding: '0.25rem 1rem',
                borderRadius: '6px',
                cursor:'pointer'
                }}>{userStatus.name}</span>
        </p>
    )
}

export default UserStatus;