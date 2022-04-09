import React, {useState, useEffect} from 'react';
import {uploadFile} from '../../api/file';
import {setContractFile} from '../../api/contract';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import UploadFile from '../common/form/UploadFile';

const ContractUploadFile = (props) => {

    const {contract} = props;

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if( contract.file && contract.file.id ) {
            setSelectedFile({
                id: contract.file.id,
                data: contract.file.url,
                name: contract.file.name,
                ext: contract.file.extention
            });
        }
    }, [contract]);
    
    const [isImageChanged, setImageChanged] = useState(false);

    const handleSubmitForm = e => {
        e.preventDefault();

        if(selectedFile) {

            const {data, name, ext} = selectedFile;
            uploadFile({data, name, ext})
                .then(file => {
                    setContractFile({
                        id: contract.id,
                        file_id: file.data.id,
                    })
                        .then(res => getToastSuccess('Файл сохранен!', res))
                        .catch(err => getToastError('Ошибка при сохранении файла!', err))
                        .finally(() => setImageChanged(false));
                })
                .catch(err => getToastError('Ошибка при загрузке файла!', err))
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmitForm}>
                <h3>Изменить файл</h3>
                <fieldset>
                    <UploadFile 
                        name="fileName"
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        setImageChanged={setImageChanged}
                        accept=".doc, .docx,.ppt, .pptx,.txt,.pdf,.odt"
                    />
                </fieldset>
                <button disabled={isImageChanged ? false : true} type='submit'>Сохранить</button>
            </form>
        </div>
    )
}

export default ContractUploadFile;