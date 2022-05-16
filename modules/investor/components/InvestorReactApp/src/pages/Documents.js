import React from 'react';
import PageLayout from '../layouts/PageLayout';
import DocumentsPage from '../components/documents';
import { t } from '@lingui/macro';

const Documents = () => {
    return (
        <PageLayout title={t({
            id: 'Документы', 
            message: 'Документы'
        })}>
            <DocumentsPage />
        </PageLayout>
    )
}

export default Documents;