import React from 'react';
import { useActions } from '../../../hooks/useActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import DeleteBtn from '../buttons/DeleteBtn';
import {deleteFile} from '../../../api/file';
import {generateFileName} from '../../../utils/files';

const UploadGalleryFiles = (props) => {

    const {files, selectedFile, setSelectedFile, setImageChanged} = props;

    const {fetchAssets} = useActions();

    const onDeleteSuccessHandler = () => {
        fetchAssets();
    }

    const handleFileUpload = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedFile({
                    data: reader.result,
                    name: generateFileName(),
                    ext: file.name.split('.')[file.name.split('.').length-1]
                });
                setImageChanged(true);
            };
            reader.readAsDataURL(file);
        }
    }

    return(
        <div className='upload-gallery-files'>
            {
                files &&
                files.length > 0 ?
                files.map((file,i) => 
                    <div key={i}>
                        <img
                            src={file.data ? file.data : ''} 
                            alt={file.name ? file.name : ''}
                        />
                        <DeleteBtn 
                            id={file.id}
                            title={`Удалить файл:\n ${file.name}.${file.ext}`}
                            onDelete={deleteFile}
                            onSuccess={onDeleteSuccessHandler}
                            successMsg='Файл удален!'
                            errorMsg='Ошибка при удалении файла!'
                        />
                    </div>
                ) :
                <FontAwesomeIcon 
                    size='5x' 
                    className='text-purple'
                    title='Выберите файл'
                    icon={solid('image')}
                />
            }
            {
                selectedFile &&
                <img 
                    src={selectedFile.data ? selectedFile.data : ''} 
                    alt={selectedFile.name ? selectedFile.name : ''}
                />
            }
            <label htmlFor='fileName'>
                <input 
                    name='fileName'
                    type="file"
                    accept='image/*'
                    onChange={handleFileUpload} 
                />
                {/*<button disabled={selectedFile ? true : false} type='button'>+ Добавить</button>*/}
            </label>
        </div>
    )
}

export default UploadGalleryFiles;