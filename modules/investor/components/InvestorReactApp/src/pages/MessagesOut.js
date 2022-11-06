import React from 'react';
import MessagesPageOut from '../components/messages/MessagesPageOut';
import PageLayout from '../layouts/PageLayout';
import { Trans } from '@lingui/macro';
import MessagesMenu from '../components/messages/MessagesMenu';

const Messages = () => {
    return (
        <PageLayout title={
            <>
                <span><Trans>Сообщения</Trans></span> 
                <span><MessagesMenu active="out" /></span>
            </>
        }>
            <MessagesPageOut />
        </PageLayout>
    )
}

export default Messages;