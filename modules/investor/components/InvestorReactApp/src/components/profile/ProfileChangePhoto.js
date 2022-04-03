import React, {useState, useEffect} from 'react';
import UploadImageFile from '../common/form/UploadImageFile';
import {uploadFile} from '../../api/file';
import {setUserPhoto} from '../../api/user';
import {getToastSuccess, getToastError} from '../../utils/toasts';

const ProfileChangePhoto = (props) => {

    const {user} = props;

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if( user.userPhotos && user.userPhotos.length > 0 ) {
            setSelectedFile({
                data: user.userPhotos[0].url,
                name: user.userPhotos[0].name,
                ext: user.userPhotos[0].extention
            });
        }
    }, [user]);
    
    const [isImageChanged, setImageChanged] = useState(false);

    const handleSubmitForm = e => {
        e.preventDefault();

        if(selectedFile) {

            const {data, name, ext} = selectedFile;
            uploadFile({data, name, ext})
                .then(file => {
                    setUserPhoto({
                        user_id: user.id,
                        file_id: file.data.id,
                    })
                        .then(userPhoto => getToastSuccess('Фото сохранено!', userPhoto))
                        .catch(err => getToastError('Ошибка при сохранении фото!', err))
                        .finally(() => setImageChanged(false));
                })
                .catch(err => getToastError('Ошибка при загрузке файла!', err))
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmitForm}>
                <h3>Изменить фото</h3>
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

export default ProfileChangePhoto;