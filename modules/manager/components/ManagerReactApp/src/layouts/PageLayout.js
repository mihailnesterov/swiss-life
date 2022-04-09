import React from 'react';

const PageLayout = ({children, title}) => {
    return (
        <div className='page'>
            <h1>{title}</h1>
            {children}
        </div>
    )
}

export default PageLayout;