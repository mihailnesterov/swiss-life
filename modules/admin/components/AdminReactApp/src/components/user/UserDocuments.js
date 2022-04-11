import React, {useState, useEffect} from 'react';
import UploadGalleryFiles from '../common/form/UploadGalleryFiles';
import {uploadFile} from '../../api/file';
import {createUserDocument} from '../../api/userDocument';
import {getToastSuccess, getToastError} from '../../utils/toasts';

const UserDocuments = (props) => {
    
    const {user} = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [userDocuments, setUserDocuments] = useState(null);
    const [isDocumentChanged, setDocumentChanged] = useState(false);

    useEffect(() => {
        if( user.userDocuments && user.userDocuments.length > 0 ) {
            const _files = user.userDocuments.map(file => {
                return {
                    id: file.id,
                    data: file.url,
                    name: file.name,
                    ext: file.extention
                }
            });
            _files.length > 0 && setUserDocuments(_files);
        }
    }, [user]);

    const handleSubmitForm = e => {
        e.preventDefault();

        if(selectedFile) {

            const {data, name, ext} = selectedFile;
            
            uploadFile({data, name, ext})
                .then(file => {
                    createUserDocument({
                        user_id: user.id,
                        file_id: file.data.id,
                    })
                        .then(res => getToastSuccess('Файл добавлен!', res))
                        .catch(err => getToastError('Ошибка при добавлении файла!', err))
                        .finally(() => {
                            setDocumentChanged(false);
                            setSelectedFile(null);
                        });
                })
                .catch(err => getToastError('Ошибка при загрузке файла!', err));
        }
    };

    return (
        <form className='image-gallery' onSubmit={handleSubmitForm}>
            <h3>Документы</h3>
            <div className='row'>
                <fieldset>
                    <UploadGalleryFiles 
                        files={userDocuments}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        setImageChanged={setDocumentChanged}
                    />
                </fieldset>
            </div>
            <fieldset className='row'>
                <button disabled={isDocumentChanged ? false : true} type='submit'>Сохранить</button>
            </fieldset>
        </form>
    )
}

export default UserDocuments;