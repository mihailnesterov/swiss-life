import React from 'react';
import Header from '../components/header';

const PageLayout = ({children, title}) => {
    return (
        <div className='page'>
            <Header />
            <h1>{title}</h1>
            {children}
        </div>
    )
}

export default PageLayout;