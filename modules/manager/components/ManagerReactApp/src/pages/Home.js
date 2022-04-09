import React from 'react';
import PageLayout from '../layouts/PageLayout';
import HomePage from '../components/home';

const Home = () => {
    return (
        <PageLayout title='Кабинет менеджера'>
            <HomePage />
            {/*<ul>
                <li>Пользователи</li>
                <li>Финансовые операции</li>
                <li>Активы</li>
                <li>Новости</li>
                <li>Партнеры</li>
                <li>Сообщения</li>
                <li>Документы?</li>
                <li>Договоры</li>
                <li>Профиль</li>
            </ul>*/}
        </PageLayout>
    )
}

export default Home;