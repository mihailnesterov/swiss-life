import React, {useState, useEffect} from 'react';
import UploadGalleryFiles from '../common/form/UploadGalleryFiles';
import {uploadFile} from '../../api/file';
import {createAssetFile} from '../../api/assetFile';
import {getToastSuccess, getToastError} from '../../utils/toasts';

const InvestmentImageGallery = (props) => {

    const {asset} = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [assetFiles, setAssetFiles] = useState(null);
    const [isImageChanged, setImageChanged] = useState(false);

    useEffect(() => {
        if( asset.assetFiles && asset.assetFiles.length > 0 ) {
            const _files = asset.assetFiles.map(file => {
                return {
                    id: file.id,
                    data: file.url,
                    name: file.name,
                    ext: file.extention
                }
            });
            _files.length > 0 && setAssetFiles(_files);
        }
    }, [asset]);

    const handleSubmitForm = e => {
        e.preventDefault();

        if(selectedFile) {

            const {data, name, ext} = selectedFile;
            
            uploadFile({data, name, ext})
                .then(file => {
                    createAssetFile({
                        asset_id: asset.id,
                        file_id: file.data.id,
                    })
                        .then(res => getToastSuccess('Файл добавлен!', res))
                        .catch(err => getToastError('Ошибка при добавлении файла!', err))
                        .finally(() => {
                            setImageChanged(false);
                            setSelectedFile(null);
                        });
                })
                .catch(err => getToastError('Ошибка при загрузке файла!', err));
        }
    };

    return (
        <form className='image-gallery' onSubmit={handleSubmitForm}>
            <h3>Фотогалерея</h3>
            <div className='row'>
                <fieldset>
                    <UploadGalleryFiles 
                        files={assetFiles}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        setImageChanged={setImageChanged}
                    />
                </fieldset>
            </div>
            <fieldset className='row'>
                <button disabled={isImageChanged ? false : true} type='submit'>Сохранить</button>
            </fieldset>
        </form>
    )
}

export default InvestmentImageGallery;