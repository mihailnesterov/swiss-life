import React from 'react';
import { useActions } from '../../hooks/useActions';
import {getIconByFileExt} from '../../utils/files';
import EditBtn from '../common/buttons/EditBtn';
import DeleteBtn from '../common/buttons/DeleteBtn';
import {deleteContract} from '../../api/contract';
import {deleteFile} from '../../api/file';

const ContractsListItem = (props) => {

    const {item} = props;

    const {fetchContracts} = useActions();

    const onSuccessHandler = () => {
        fetchContracts();
        if(item && item.file && item.file.id) {
            deleteFile(item.file.id)
                .then(res => console.log('Файл удален!',res))
                .catch(err => console.log('Ошибка при удалении файла',err))
        }
    }

    return (
        <div>
            {
                item.file && 
                item.file.url ?
                <a download={item.file.url} href={item.file.url}>
                    {getIconByFileExt(item.file.extention)}
                    <span title='Скачать'>{item.description}</span>
                    
                </a> :
                <p>{item.description} (Файл не загружен!)</p>
            }
            <EditBtn 
                id={item.id}
                type='contracts'
            />
            <DeleteBtn 
                id={item.id}
                title={`Удалить договор:\n ${item.description}`}
                onDelete={deleteContract}
                onSuccess={onSuccessHandler}
                successMsg='Договор удален!'
                errorMsg='Ошибка при удалении договора!'
            />
        </div>
    )
}

export default ContractsListItem;