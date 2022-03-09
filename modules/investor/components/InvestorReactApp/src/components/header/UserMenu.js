import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {RouteNames} from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {setPageTitle} from '../../utils/navbar';

const Avatar = (props) => {
    
    const {url} = props;
    
    return(
        url ?
        <img src={url} width="28" height="32" /> :
        <FontAwesomeIcon size='2x' icon={solid('user-tie')} />
    );
}

const UserMenu = (props) => {

    const {fullName, userPhotos} = props.user;
    const {PROFILE, LOGOUT} = RouteNames;
    
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if(userPhotos && userPhotos.length > 0) {
            setAvatarUrl(userPhotos[0].url);
        }
    }, [userPhotos]);

    const menuOpenHandler = () => setMenuOpen(!isMenuOpen);

    const myProfileHandler = () => {
        menuOpenHandler();
        setPageTitle('Мой профиль');
    }

    return (
        <div>
           <button onClick={menuOpenHandler}>
                {avatarUrl && <Avatar url={avatarUrl} />}
                {fullName}
                {
                    isMenuOpen ?
                    <FontAwesomeIcon icon={solid('chevron-up')} /> :
                    <FontAwesomeIcon icon={solid('chevron-down')} />
                }
                
            </button>
            { 
                isMenuOpen &&
                <div className='user-menu-dropdown'>
                    <nav>
                        <ul>
                            <li onClick={myProfileHandler}>
                                <Link to={PROFILE}>Мой профиль</Link>
                            </li>
                            <li><a href={LOGOUT}>Выход</a></li>
                        </ul>
                    </nav>
                </div>
            }
        </div>
    )
}


export default UserMenu;