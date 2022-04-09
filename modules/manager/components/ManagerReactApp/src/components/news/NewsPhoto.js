import React, {useState, useEffect} from 'react';
import UploadImageFile from '../common/form/UploadImageFile';
import {uploadFile} from '../../api/file';
import {setNewsPhoto} from '../../api/news';
import {getToastSuccess, getToastError} from '../../utils/toasts';

const NewsPhoto = (props) => {

    const {news} = props;

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if( news.newsFiles && news.newsFiles.length > 0 ) {
            setSelectedFile({
                data: news.newsFiles[0].url,
                name: news.newsFiles[0].name,
                ext: news.newsFiles[0].extention
            });
        }
    }, [news]);
    
    const [isImageChanged, setImageChanged] = useState(false);

    const handleSubmitForm = e => {
        e.preventDefault();

        if(selectedFile) {

            const {data, name, ext} = selectedFile;
            uploadFile({data, name, ext})
                .then(file => {
                    setNewsPhoto({
                        news_id: news.id,
                        file_id: file.data.id,
                    })
                        .then(newsPhoto => getToastSuccess('Картинка сохранена!', newsPhoto))
                        .catch(err => getToastError('Ошибка при сохранении картинки!', err))
                        .finally(() => setImageChanged(false));
                })
                .catch(err => getToastError('Ошибка при загрузке файла!', err))
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmitForm}>
                <h3>Картинка новости</h3>
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

export default NewsPhoto;