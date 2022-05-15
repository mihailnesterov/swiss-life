import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { en, ru } from 'make-plural/plurals';
import { messages as enMessages } from './locales/en/messages';
import { messages as ruMessages } from './locales/ru/messages';
import App from './App';
import './theme/dark/style.scss';

i18n.loadLocaleData({
    en: { plurals: en },
    ru: { plurals: ru },
});
i18n.load({
    en: enMessages,
    ru: ruMessages,
});
i18n.activate('ru');

ReactDOM.render(
    <I18nProvider i18n={i18n}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </I18nProvider>,
    document.getElementById('investor-react-app')
);