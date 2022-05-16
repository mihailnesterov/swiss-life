import React from 'react';
import MessagesPage from '../components/messages';
import PageLayout from '../layouts/PageLayout';
import { t } from '@lingui/macro';

const Messages = () => {
    return (
        <PageLayout title={t({
            id: 'Сообщения', 
            message: 'Сообщения'
        })}>
            <MessagesPage />
        </PageLayout>
    )
}

export default Messages;