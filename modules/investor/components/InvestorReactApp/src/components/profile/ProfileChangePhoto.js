import React, {useState, useEffect} from 'react';
import { useActions } from '../../hooks/useActions';
import GoBackBtn from '../common/buttons/GoBackBtn';
import UploadImageFile from '../common/form/UploadImageFile';
import Spinner from '../common/loader/Spinner';
import {uploadFile} from '../../api/file';
import {setUserPhoto} from '../../api/user';
import {setPageTitle} from '../../utils/navbar';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import { Trans, t } from '@lingui/macro';

const ProfileChangePhoto = (props) => {

    const {user} = props;

    const {fetchUserAuthorizedExpanded} = useActions();

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
    
    const [loading, setLoading] = useState(false);
    const [isImageChanged, setImageChanged] = useState(false);

    const handleSubmitForm = e => {
        e.preventDefault();

        if(selectedFile) {

            const {data, name, ext} = selectedFile;
            uploadFile({data, name, ext})
                .then(file => {
                    setLoading(true);
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
                        .finally(() => {
                            fetchUserAuthorizedExpanded();
                            setImageChanged(false);
                            setLoading(false);
                        });
                })
                .catch(err => getToastError(t({
                    id: 'Ошибка при загрузке файла!', 
                    message: 'Ошибка при загрузке файла!'
                }), err))
        }
    };

    return (
        <>
            <div
                onClick={() => setPageTitle(t({
                    id: 'Мой профиль', 
                    message: 'Мой профиль'
                }))}
            >
                <GoBackBtn
                    url='profile'
                    title={t({
                        id: 'Вернуться в профиль', 
                        message: 'Вернуться в профиль'
                    })}
                />
            </div>
            <div>
                <h1><Trans>Изменить фото</Trans></h1>
            </div>
            {
                loading ?
                <Spinner size={2} /> :
                <div className='form-container'>                
                    <form onSubmit={handleSubmitForm}>
                        <fieldset>
                            <UploadImageFile 
                                name="fileName"
                                selectedFile={selectedFile}
                                setSelectedFile={setSelectedFile}
                                setImageChanged={setImageChanged}
                            />
                        </fieldset>
                        <fieldset>
                            <button 
                                type='submit'
                                disabled={isImageChanged ? false : true}
                                className='btn btn-gold'
                            >
                                <Trans>Сохранить</Trans>
                            </button>
                        </fieldset>
                    </form>
                </div>
            }
        </>
    )
}

export default ProfileChangePhoto;