import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

const Footer = () => {
    
    const {company} = useSelector( state => state.company);
    
    const [companyName, setCompanyName] = useState(null);
    
    useEffect(() => {
        if(company.length > 0 && company[0].name)
            setCompanyName(company[0].name);
    }, [company]);

    return (
        <footer className='footer'>
            <div className='copyright'>
                <h4>2022</h4>
                <FontAwesomeIcon className='text-gold' icon={regular('gem')} /> 
                {companyName && <h4>{companyName}</h4>}
            </div>
        </footer>
    )
}


export default Footer;