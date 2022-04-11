import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {generateFileName} from '../../../utils/files';

const UploadImageFile = (props) => {

    const {name, selectedFile, setSelectedFile, setImageChanged, accept} = props;

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
        <div className='upload-image-file'>
            <label>
                <input 
                    name={name ? name : 'fileName'}
                    type="file"
                    accept={`${accept ? accept : "image/*"}`}
                    onChange={handleFileUpload} 
                />
                {
                    selectedFile ?
                    <img 
                        src={selectedFile.data ? selectedFile.data : ''} 
                        alt={selectedFile.name ? selectedFile.name : ''}
                        title='Выберите файл'
                    /> :
                    <FontAwesomeIcon 
                        size='5x' 
                        className='text-purple'
                        title='Выберите файл'
                        icon={solid('image')}
                    />
                }
            </label>
        </div>
    )
}

export default UploadImageFile;