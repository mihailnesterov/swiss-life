import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';

const App = () => {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
            <ToastContainer 
                autoClose={3000} 
                transition={Slide}
            />
        </div>
    )
}

export default App;