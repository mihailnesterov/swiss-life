import React, {useState, useEffect} from 'react';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {updateUser} from '../../api/user';
import Spinner from '../common/loader/Spinner';
import AutocompleteUserRepresentive from '../common/autocomplete/AutocompleteUserRepresentive';
import AutocompleteUserStatus from '../common/autocomplete/AutocompleteUserStatus';
import AutocompleteManager from '../common/autocomplete/AutocompleteManager';

const UserForm = (props) => {

    const {user} = props;

    const [params, setParams] = useState(null);
    const [saving, setSaving] = useState(false);
    const [parentId, setParentId] = useState(null);
    const [statusId, setStatusId] = useState(null);
    const [managerId, setManagerId] = useState(null);

    useEffect(() => {
        if(parentId) {
            setParams({
                ...params,
                'parent_id': parentId
            });
        }
    }, [parentId]);

    useEffect(() => {
        if(statusId) {
            setParams({
                ...params,
                'status_id': statusId === 1 ? null : statusId
            });
        }
    }, [statusId]);

    useEffect(() => {
        if(managerId) {
            setParams({
                ...params,
                'manager_id': managerId ? managerId : null
            });
        }
    }, [managerId]);

    const handleChangeForm = e => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? (e.target.checked === true ? 1 : 0) : e.target.value;
        const excludeFields = [
            'user',
            'user-statuses',
            'manager'
        ];
        
        if(excludeFields.filter(item => item === name).length > 0) {
            setParams({...params});
        } else {
            setParams({
                ...params, 
                ...{[name]:value}
            });
        } 
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        setSaving(true);
        if(params) {
            updateUser(user.id, params)
                .then(res => getToastSuccess('???????????????????????? ????????????????!',res))
                .catch(err => getToastError('???????????? ?????? ???????????????????? ????????????????????????!',err))
                .finally(() => {
                    setParams(null);
                    setSaving(false);
                });
        }
    }

    return (
        <form onSubmit={handleSubmitForm} onChange={handleChangeForm}>
            <div className='row'>
                <fieldset className='column'>
                    <input 
                        name="firstName"
                        type="text"
                        placeholder='??????'
                        defaultValue={user.firstName}
                        autoComplete='off'
                    />
                    <input 
                        name="lastName"
                        type="text"
                        placeholder='??????????????'
                        defaultValue={user.lastName}
                        autoComplete='off'
                    />
                    <input 
                        name="email"
                        type="email"
                        placeholder='Email'
                        defaultValue={user.email}
                        autoComplete='off'
                    />
                    <input 
                        name="phone"
                        type="text"
                        placeholder='??????????????'
                        defaultValue={user.phone}
                        autoComplete='off'
                    />
                    <input 
                        name="address"
                        type="text"
                        placeholder='??????????'
                        value={user.address}
                        autoComplete='off'
                    />
                </fieldset> 

                <fieldset className='column'>
                    <AutocompleteUserRepresentive 
                        user={user} 
                        setParentId={setParentId} 
                    />
                    <AutocompleteUserStatus 
                        user={user} 
                        setStatusId={setStatusId} 
                    />
                    <AutocompleteManager 
                        user={user}
                        setManagerId={setManagerId}
                    />
                </fieldset>

                <fieldset className='column'>
                    <div className='checkbox'>
                        <input  
                            name="status"
                            type="checkbox"
                            defaultChecked={user.status} 
                        />
                        <label htmlFor="status">??????????????</label>
                    </div>
                    <div className='checkbox'>
                        <input  
                            name="verified"
                            type="checkbox"
                            defaultChecked={user.verified} 
                        />
                        <label htmlFor="verified">??????????????????????????</label>
                    </div>
                    <div className='checkbox'>
                        <input 
                            name="representive"
                            type="checkbox"
                            defaultChecked={user.representive} 
                        />
                        <label htmlFor="representive">??????????????????????????</label>
                    </div>
                </fieldset>
            </div>                  
            <fieldset>
                <button disabled={params ? false : true} type='submit'>??????????????????</button>
                {saving && <Spinner size={2} />}
            </fieldset>
        </form>
    )
}

export default UserForm;