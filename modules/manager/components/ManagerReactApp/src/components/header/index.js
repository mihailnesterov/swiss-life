import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Logo from './logo';
import CompanyName from './CompanyName';
import UserMailBox from './UserMailBox';
import UserMenu from './UserMenu';

const Header = () => {
    
    const {company} = useSelector( state => state.company);
    const {user} = useSelector( state => state.user);
    
    const {fetchCompany, fetchUserAuthorizedExpanded} = useActions();
    
    const [companyName, setCompanyName] = useState(null);

    useEffect(() => {
        fetchUserAuthorizedExpanded();
        fetchCompany();
    },[]);

    useEffect(() => {
        if(company.length > 0 && company[0].name) {
            setCompanyName(company[0].name);
        }
        return () => setCompanyName(null);
    }, [company]);

    return (
        <header className='header'>
            <div>
                <Logo />
                { companyName && user && <CompanyName name={companyName} /> }
            </div>
            {
                companyName && user &&
                <div>
                    <UserMailBox newMessages={user.newMessages} />
                    <UserMenu user={user}/>
                </div>
            }
        </header>
        
    )
}


export default Header;