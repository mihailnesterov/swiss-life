import React, {useState, useEffect} from 'react';
import { useActions } from '../../hooks/useActions';
import {Link} from 'react-router-dom';
import {RouteNames} from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {setPageTitle} from '../../utils/navbar';
import { Trans } from "@lingui/macro";

const Avatar = (props) => {
    
    const {url} = props;
    
    return(
        url ?
        <span>
            <img src={url} alt="Аватар" />
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_275_3844)"><circle cx="5.5" cy="5.5" r="5.5" fill="#28D624"/></g>
                <defs>
                    <filter id="filter0_d_275_3844" x="0" y="0" width="11" height="11" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dx="5" dy="5"/>
                        <feGaussianBlur stdDeviation="2.5"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_275_3844"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_275_3844" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </span> :
        <FontAwesomeIcon size='2x' icon={solid('user-tie')} />
    );
}

const Account = (props) => {
    const {fullName, userStatus} = props;
    return(
        <span>
            {fullName && fullName}
            {
                userStatus &&
                userStatus.id &&
                userStatus.id > 1 && 
                <>
                    <br />
                    <small><Trans>Статус</Trans>:
                        <span 
                            title={userStatus.description} 
                            style={{color:`#${userStatus.color}`}}
                        >
                            {userStatus.name}
                        </span>
                    </small>
                </>
            }
        </span>
    );
}

const UserMenu = (props) => {
    
    const {fullName, userPhotos, accounts, userStatus} = props.user;

    const {setMobileMenuClose} = useActions();

    const {PROFILE, LOGOUT} = RouteNames;
    
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if(userPhotos && userPhotos.length > 0) {
            setAvatarUrl(userPhotos[0].url);
        }
    }, [userPhotos]);

    const handleMenuOpen = () => setMenuOpen(!isMenuOpen);

    const handleMyProfileClick = () => {
        handleMenuOpen();
        setMobileMenuClose();
        setPageTitle('Мой профиль');
    }

    return (
        <div className='user-menu'>
           <button onClick={handleMenuOpen}>
                {avatarUrl && <Avatar url={avatarUrl} />}
                {<Account fullName={fullName} userStatus={userStatus}/>}
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
                            <li onClick={handleMyProfileClick}>
                                <Link to={PROFILE}><Trans>Мой профиль</Trans></Link>
                            </li>
                            <li>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.1725 9.375C7.00674 9.375 6.84777 9.44085 6.73056 9.55806C6.61335 9.67527 6.5475 9.83424 6.5475 10V11.875C6.5475 12.3723 6.34996 12.8492 5.99833 13.2008C5.64669 13.5525 5.16978 13.75 4.6725 13.75H3.125C2.62772 13.75 2.15081 13.5525 1.79917 13.2008C1.44754 12.8492 1.25 12.3723 1.25 11.875V3.125C1.25 2.62772 1.44754 2.15081 1.79917 1.79917C2.15081 1.44754 2.62772 1.25 3.125 1.25H4.6725C5.16978 1.25 5.64669 1.44754 5.99833 1.79917C6.34996 2.15081 6.5475 2.62772 6.5475 3.125V5C6.5475 5.16576 6.61335 5.32473 6.73056 5.44194C6.84777 5.55915 7.00674 5.625 7.1725 5.625C7.33826 5.625 7.49723 5.55915 7.61444 5.44194C7.73165 5.32473 7.7975 5.16576 7.7975 5V3.125C7.79651 2.2965 7.46695 1.50222 6.88111 0.916387C6.29528 0.330551 5.501 0.000992411 4.6725 0H3.125C2.2965 0.000992411 1.50222 0.330551 0.916387 0.916387C0.330551 1.50222 0.000992411 2.2965 0 3.125L0 11.875C0.000992411 12.7035 0.330551 13.4978 0.916387 14.0836C1.50222 14.6694 2.2965 14.999 3.125 15H4.6725C5.501 14.999 6.29528 14.6694 6.88111 14.0836C7.46695 13.4978 7.79651 12.7035 7.7975 11.875V10C7.7975 9.83424 7.73165 9.67527 7.61444 9.55806C7.49723 9.44085 7.33826 9.375 7.1725 9.375Z" fill="#F8F8F8"/>
                                    <path d="M14.2919 6.17449L11.4256 3.30824C11.368 3.24854 11.299 3.20093 11.2228 3.16817C11.1465 3.13542 11.0645 3.11818 10.9815 3.11746C10.8985 3.11673 10.8162 3.13255 10.7394 3.16397C10.6626 3.1954 10.5928 3.24181 10.5341 3.30049C10.4754 3.35917 10.429 3.42896 10.3976 3.50577C10.3662 3.58258 10.3504 3.66488 10.3511 3.74786C10.3518 3.83085 10.3691 3.91286 10.4018 3.98911C10.4346 4.06537 10.4822 4.13433 10.5419 4.19199L13.2056 6.85636L3.75 6.87511C3.58424 6.87511 3.42527 6.94096 3.30806 7.05817C3.19085 7.17538 3.125 7.33435 3.125 7.50011C3.125 7.66587 3.19085 7.82484 3.30806 7.94205C3.42527 8.05926 3.58424 8.12511 3.75 8.12511L13.2425 8.10574L10.5406 10.8082C10.4809 10.8659 10.4333 10.9349 10.4006 11.0111C10.3678 11.0874 10.3506 11.1694 10.3498 11.2524C10.3491 11.3353 10.3649 11.4176 10.3964 11.4945C10.4278 11.5713 10.4742 11.6411 10.5329 11.6997C10.5916 11.7584 10.6613 11.8048 10.7382 11.8363C10.815 11.8677 10.8973 11.8835 10.9803 11.8828C11.0632 11.882 11.1453 11.8648 11.2215 11.832C11.2978 11.7993 11.3667 11.7517 11.4244 11.692L14.2906 8.82574C14.6423 8.47429 14.84 7.99755 14.8402 7.50037C14.8405 7.00319 14.6432 6.52627 14.2919 6.17449Z" fill="#F8F8F8"/>
                                </svg>
                                <a href={LOGOUT}><Trans>Выйти из аккаунта</Trans></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            }
        </div>
    )
}

export default UserMenu;