import React, {useState, useEffect} from 'react';
import UploadImageFile from '../common/form/UploadImageFile';

const ProfileChangePhoto = (props) => {

    const {user} = props;

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if( user.userPhotos && user.userPhotos.length > 0 ) {
            setSelectedFile({
                src: user.userPhotos[0].url,
                alt: user.userPhotos[0].name
            });
        }
    }, [user]);

    const [isImageChanged, setImageChanged] = useState(false);

    const handleSubmitForm = e => {
        e.preventDefault();

        if(selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('fileName', selectedFile.src);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };

            setImageChanged(false);
            
            /*axios.post("api/uploadfile", formData, config).then((response) => {
                console.log(response.data);
            });*/
        }
        
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmitForm}>
                <h3>Изменить фото</h3>
                <fieldset>
                    <UploadImageFile 
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