import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './components/main';
import MobileMenu from './components/mobile/MobileMenu';

const App = () => {
    return (
        <div className='wrapper'>
           <Main />
           <MobileMenu />
            <ToastContainer 
                autoClose={3000} 
                transition={Slide}
            />
        </div>
    )
}

export default App;