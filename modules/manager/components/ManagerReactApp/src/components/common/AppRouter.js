import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {investorRoutes} from '../../routes';
import Error404 from '../../pages/Error404';

const AppRouter = () => {
	return(
        <Routes>
            {investorRoutes.map(route => 
                <Route 
                    key={route.path}
                    path={route.path}
                    element={<route.element/>}
                    caseSensitive={false}
                />
            )}
            <Route path="*" element={<Error404/>}/>
        </Routes>
    );
};

export default AppRouter;