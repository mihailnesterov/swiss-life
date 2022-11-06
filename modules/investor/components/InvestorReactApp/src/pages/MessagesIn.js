import React from 'react';
import MessagesPageIn from '../components/messages/MessagesPageIn';
import PageLayout from '../layouts/PageLayout';
import { Trans } from '@lingui/macro';
import MessagesMenu from '../components/messages/MessagesMenu';

const Messages = () => {
    return (
        <PageLayout title={
            <>
                <span><Trans>Сообщения</Trans></span> 
                <span><MessagesMenu active="in" /></span>
            </>
        }>
            <MessagesPageIn />
        </PageLayout>
    )
}

export default Messages;