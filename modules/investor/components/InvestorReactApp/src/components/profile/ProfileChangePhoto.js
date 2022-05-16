import React, {useState, useEffect} from 'react';
import UploadImageFile from '../common/form/UploadImageFile';
import {uploadFile} from '../../api/file';
import {setUserPhoto} from '../../api/user';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import { Trans, t } from '@lingui/macro';

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
                        .then(userPhoto => getToastSuccess(t({
                            id: 'Фото сохранено!', 
                            message: 'Фото сохранено!'
                        }), userPhoto))
                        .catch(err => getToastError(t({
                            id: 'Ошибка при сохранении фото!', 
                            message: 'Ошибка при сохранении фото!'
                        }), err))
                        .finally(() => setImageChanged(false));
                })
                .catch(err => getToastError(t({
                    id: 'Ошибка при загрузке файла!', 
                    message: 'Ошибка при загрузке файла!'
                }), err))
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmitForm}>
                <h3><Trans>Изменить фото</Trans></h3>
                <fieldset>
                    <UploadImageFile 
                        name="fileName"
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        setImageChanged={setImageChanged}
                    />
                </fieldset>
                <button disabled={isImageChanged ? false : true} type='submit'><Trans>Сохранить</Trans></button>
            </form>
        </div>
    )
}

export default ProfileChangePhoto;