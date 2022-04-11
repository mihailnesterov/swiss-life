import React from 'react';

const UserStat = (props) => {
    
    const {title, icon, stat} = props;

    return (
        <div className='stat-list'>
            <h3>{icon}<span>{title}</span></h3>
            <ul>
            {
                stat.length > 0 &&
                stat.map((item,i) => 
                    <li key={i}><span>{Object.keys(item)}</span><b>{Object.values(item)}</b></li>)
            }
            </ul>
        </div>        
    )
}

export default UserStat;