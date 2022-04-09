import React, {useState} from 'react';
import GoBackBtn from '../common/buttons/GoBackBtn';
import PartnerForm from './PartnerForm';
import newPartner from '../../models/partner';

const PartnerItem = (props) => {

    const {partner} = props;

    const [empty] = useState(newPartner);

    return (
        <div className="partner-item">
            <div>
                <GoBackBtn
                    url='partners'
                    title='В список партнеров'
                />
            </div>
            <div className='form-container'>
                <div className='row'>
                    <PartnerForm partner={partner ? partner : empty} />
                </div>
            </div>
        </div>
    )
}

export default PartnerItem;