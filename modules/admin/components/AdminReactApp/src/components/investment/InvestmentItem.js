import React, {useState} from 'react';
import GoBackBtn from '../common/buttons/GoBackBtn';
import InvestmentForm from './InvestmentForm';
import newAsset from '../../models/asset';
import InvestmentImageGallery from './InvestmentImageGallery';

const InvestmentItem = (props) => {

    const {asset} = props;

    const [empty] = useState(newAsset);

    return (
        <div className="investment-item">
            <div>
                <GoBackBtn
                    url='investment'
                    title='В список объектов'
                />
            </div>
            <div className='form-container'>
                <div className='row'>
                    <InvestmentForm asset={asset ? asset : empty} />
                    <InvestmentImageGallery asset={asset ? asset: empty} />
                </div>
            </div>
        </div>
    )
}

export default InvestmentItem;