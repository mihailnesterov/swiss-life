import React, {useState} from 'react';
import GoBackBtn from '../common/buttons/GoBackBtn';
import SeminarForm from './SeminarForm';
import newSeminar from '../../models/seminar';
import SeminarUploadFile from './SeminarUploadFile';

const SeminarItem = (props) => {

    const {seminar} = props;

    const [empty] = useState(newSeminar);

    return (
        <div className="seminar-item">
            <div>
                <GoBackBtn
                    url='seminars'
                    title='В список семинаров'
                />
            </div>
            <div className='form-container'>
                <div className='row'>
                    <SeminarForm seminar={seminar ? seminar : empty} />
                    <SeminarUploadFile seminar={seminar ? seminar : empty} />
                </div>
            </div>
        </div>
    )
}

export default SeminarItem;