import React, {useState, useEffect} from 'react';
import {uploadFile} from '../../api/file';
import {setSeminarFile} from '../../api/seminar';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import UploadImageFile from '../common/form/UploadImageFile';

const SeminarUploadFile = (props) => {

    const {seminar} = props;

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if( seminar.file && seminar.file.id ) {
            setSelectedFile({
                id: seminar.file.id,
                data: seminar.file.url,
                name: seminar.file.name,
                ext: seminar.file.extention
            });
        }
    }, [seminar]);
    
    const [isImageChanged, setImageChanged] = useState(false);

    const handleSubmitForm = e => {
        e.preventDefault();

        if(selectedFile) {

            const {data, name, ext} = selectedFile;
            uploadFile({data, name, ext})
                .then(file => {
                    setSeminarFile({
                        id: seminar.id,
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
                <h3>Картинка семинара</h3>
                <fieldset>
                    <UploadImageFile 
                        name="fileName"
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        setImageChanged={setImageChanged}
                    />
                </fieldset>
                <button disabled={isImageChanged ? false : true} type='submit'>Сохранить</button>
            </form>
        </div>
    )
}

export default SeminarUploadFile;