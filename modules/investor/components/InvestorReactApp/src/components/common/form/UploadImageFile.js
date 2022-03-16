import React from 'react';

const UploadImageFile = (props) => {

    const {src, alt, setSelectedFile} = props;

    const handleFileUpload = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedFile({
                    src: reader.result,
                    alt: file.name
                });
            };
            reader.readAsDataURL(file);
        }
    }

    return(
        src &&
        <div className='load-image-file'>
            <label>
                <input 
                    type="file"
                    onChange={handleFileUpload} 
                />
                <img 
                    id='image-file'
                    src={src} 
                    alt={alt ? alt : ''}
                    title='Выберите фото'
                />
            </label>
        </div>
    )
}


export default UploadImageFile;