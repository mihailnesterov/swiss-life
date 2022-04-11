import React from 'react';

const UserStatBlock = (props) => {
    
    const {title, icon, value} = props;

    return (
        <div>
            <h4>{icon} {title}</h4>
            <span>{value}</span>
        </div>
    )
}

export default UserStatBlock;