import React from 'react';
import { useActions } from '../../hooks/useActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; 
import {deleteAsset} from '../../api/asset';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../api';
import EditBtn from '../common/buttons/EditBtn';
import DeleteBtn from '../common/buttons/DeleteBtn';
import StatusChecked from '../common/status/StatusChecked';

const InvestmentListItem = (props) => {

    const {item} = props;

    const {fetchAssets, fetchAssetsCategories} = useActions();

    const onSuccessHandler = () => {
        fetchAssets();
        fetchAssetsCategories();
    }

    return (
        <div>
            <div>
                {
                    item.assetFiles && 
                    item.assetFiles.length > 0 ?
                    <Link to={`${BASE_URL}/investment/${item.id}`}>
                        <img 
                            src={item.assetFiles[0].url} 
                            alt={item.assetFiles[0].name} 
                        />
                    </Link> :
                    <Link to={`${BASE_URL}/investment/${item.id}`}>
                        <FontAwesomeIcon 
                            size='4x' 
                            className='text-purple' 
                            icon={solid('image')} 
                        />
                    </Link>
                }
            </div>
            <div>
                <Link to={`${BASE_URL}/investment/${item.id}`} title={item.name}>
                    {item.name}
                </Link>
            </div>
            <div>
                <p>{item.excerpt}</p>
            </div>
            <div>
                <p>{item.description}</p>
            </div>
            <div>
                <p>{item.category}</p>
            </div>
            <div>
                <p>{item.calculation}</p>
            </div>
            <div>
                <StatusChecked 
                    condition={item.status}
                    value={1}
                    textTrue=''
                    textFalse=''
                />
            </div>
            <div>
                <EditBtn 
                    id={item.id}
                    type='investment'
                />
                <DeleteBtn 
                    id={item.id}
                    title={`Удалить актив:\n ${item.name}`}
                    onDelete={deleteAsset}
                    onSuccess={onSuccessHandler}
                    successMsg='Актив удален!'
                    errorMsg='Ошибка при удалении актива!'
                />
            </div>
        </div>
    )
}

export default InvestmentListItem;