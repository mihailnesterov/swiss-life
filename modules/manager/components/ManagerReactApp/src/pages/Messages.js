import React from 'react';
import MessagesPage from '../components/messages';
import PageLayout from '../layouts/PageLayout';

const Messages = () => {
    return (
        <PageLayout title='Сообщения'>
            <MessagesPage />
        </PageLayout>
    )
}


export default Messages;