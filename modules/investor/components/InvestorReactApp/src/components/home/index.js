import React from 'react';
import { useSelector } from "react-redux";
import Partners from './Partners';
import UserInfo from '../user/UserInfo';
import UserStat from '../user/UserStat';
import { Trans } from '@lingui/macro';

const HomePage = () => {
    
    const {user, loading} = useSelector( state => state.user);

    return (
        <div className='homepage'>
            <div>
                {
                    loading ? 
                    <Trans>Загрузка профиля...</Trans> : 
                    user && 
                    <UserInfo user={user} />
                }
            </div>
            <div>
                {
                    user && 
                    user.accounts && 
                    user.userAssetsTotal &&
                    <UserStat 
                        stat={user.accounts} 
                        assetsStat={user.userAssetsTotal} 
                    />
                }
                <Partners />
            </div>
        </div>
    )
}

export default HomePage;