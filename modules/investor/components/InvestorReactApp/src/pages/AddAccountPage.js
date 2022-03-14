import React from 'react';
import PageLayout from '../layouts/PageLayout';
import AddAccountForm from '../components/account/AddAccountForm';

const AddAccountPage = () => {
    return (
        <PageLayout title="Открыть счет">
            <div className='page-add-account'>
                <AddAccountForm />
            </div>
        </PageLayout>
    )
}

export default AddAccountPage;