import React from 'react';
import Header from '../components/header';

const PageLayoutWithoutTitle = ({children}) => {
    return (
        <div className='page'>
            <Header />
            {children}
        </div>
    )
}

export default PageLayoutWithoutTitle;