import React from 'react';
import PageLayout from '../layouts/PageLayout';
import AddAccountForm from '../components/account/AddAccountForm';
import { t } from '@lingui/macro';

const AddAccountPage = () => {
    return (
        <PageLayout title={t({
            id: 'Открыть счет', 
            message: 'Открыть счет'
        })}>
            <div className='page-add-account'>
                <AddAccountForm />
            </div>
        </PageLayout>
    )
}

export default AddAccountPage;