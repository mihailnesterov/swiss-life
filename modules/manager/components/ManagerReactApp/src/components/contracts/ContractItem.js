import React, {useState} from 'react';
import GoBackBtn from '../common/buttons/GoBackBtn';
import ContractForm from './ContractForm';
import newContract from '../../models/contract';
import ContractUploadFile from './ContractUploadFile';

const ContractItem = (props) => {

    const {contract} = props;

    const [empty] = useState(newContract);

    return (
        <div className="contract-item">
            <div>
                <GoBackBtn
                    url='contracts'
                    title='В список договоров'
                />
            </div>
            <div className='form-container'>
                <div className='row'>
                    <ContractForm contract={contract ? contract : empty} />
                    <ContractUploadFile contract={contract ? contract : empty} />
                </div>
            </div>
        </div>
    )
}

export default ContractItem;