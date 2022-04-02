import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const UploadImageFile = (props) => {

    const {name, selectedFile, setSelectedFile, setImageChanged} = props;

    const handleFileUpload = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedFile({
                    src: reader.result,
                    alt: file.name
                });
                setImageChanged(true);
            };
            reader.readAsDataURL(file);
        }
    }

    return(
        <div className='load-image-file'>
            <label>
                <input 
                    name={name ? name : 'fileName'}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload} 
                />
                {
                    selectedFile ?
                    <img 
                        src={selectedFile.src ? selectedFile.src : ''} 
                        alt={selectedFile.alt ? selectedFile.alt : ''}
                        title='Выберите фото'
                    /> :
                    <FontAwesomeIcon 
                        size='5x' 
                        className='text-purple'
                        title='Выберите фото'
                        icon={solid('image')}
                    />
                }
            </label>
        </div>
    )
}

export default UploadImageFile;