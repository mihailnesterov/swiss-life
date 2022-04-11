import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Spinner from '../../common/loader/Spinner';
import {getToastSuccess, getToastError} from '../../../utils/toasts';

const DeleteBtn = (props) => {

    const {id, size, title, onDelete, onSuccess, onError, successMsg, errorMsg} = props;

    const [deleting, setDeleting] = useState(false);

    const onDeleteHandler = () => {
        const confirmDelete = confirm(`${title ? title : 'Удалить'}?`);
        if(confirmDelete) {
            setDeleting(true);
            setTimeout(() => {
                onDelete(id)
                    .then(res => {
                        if(onSuccess)
                            onSuccess();
                        getToastSuccess(`${successMsg ? successMsg : 'Запись удалена!'}`,res);
                    })
                    .catch(err => {
                        if(onError)
                            onError();
                        getToastError(`${errorMsg ? errorMsg : 'Ошибка при удалении записи!'}`,err)
                    })
                    .finally(() => setDeleting(false));
            }, 1000);
        }
    }

    return (
        deleting ?
        <Spinner size={1} /> :
        
        <button className='btn-delete' onClick={onDeleteHandler}>
            <FontAwesomeIcon 
                size={size ? size : '2x'}
                title={title ? title : 'Удалить'}
                icon={solid('square-xmark')} 
            />
        </button>
    )
}

export default DeleteBtn;