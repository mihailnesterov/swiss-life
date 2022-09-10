<?php

use yii\helpers\{Html, Url};

/* @var $this yii\web\View */
/* @var $model app\models\Partners */

if( null !== Yii::$app->request->get('lang') ) {
    Yii::$app->language = Yii::$app->request->get('lang');
}

echo Html::tag(
    'main',
    Html::tag(
        'section',
        Html::tag('h1', Html::encode(Yii::$app->name))
        . Html::tag('p', Yii::t('app', 'Мы создаем, подбираем и ребалансируем инвестиционный портфель, чтобы вы могли расслабиться!'), ['class' => 'wow slide-in-bck-bottom', 'data-wow-delay' => '.2s'])
        . Html::a(Yii::t('app', 'Рассчитать доходность'), Url::to([Yii::$app->controller->route . '#calculate']), ['class' => 'btn btn-secondary wow slide-in-bck-bottom', 'data-wow-delay' => '.4s'])
        ,
        ['class' => 'first-screen']
    )
    . Html::tag(
        'section',
        Html::tag('h2', Yii::t('app', 'О нашей компании и ценностях'))
        . Html::tag(
            'p', 
            Yii::t('app', 'Мы не верим в спекуляции, но мы верим в ответственное инвестирование. Подотчетность и надежность - это наши руководящие принципы.'),
            ['class' => 'about-excerpt wow slide-in-bck-bottom']
        )
        . Html::tag(
            'div', 
            Html::tag(
                'section', 
                Html::tag('h3', Yii::t('app', 'Ответственность'))
                . Html::tag('p', Yii::t('app', 'Мы берем на себя ответственность за управление деньгами наших клиентов')), 
                ['class' => 'about-list__item']
            )
            . Html::tag(
                'section', 
                Html::tag('h3', Yii::t('app', 'Личная вовлеченность'))
                . Html::tag('p', Yii::t('app', 'Мы инвестируем своё время и ресурсы в развитие бизнес проектов для максимаотной доходности')), 
                ['class' => 'about-list__item']
            )
            . Html::tag(
                'section', 
                Html::tag('h3', Yii::t('app', 'Честность'))
                . Html::tag('p', Yii::t('app', 'Мы ценим прозрачность как по отношению к нашим клиентам, так и по отношению к нашим сотрудникам')), 
                ['class' => 'about-list__item']
            )
            . Html::tag(
                'section', 
                Html::tag('h3', Yii::t('app', 'Командная работа'))
                . Html::tag('p', Yii::t('app', 'Мы не приемлем ограниченность мышления. Мы работаем продуктивно вместе')), 
                ['class' => 'about-list__item']
            )
            . Html::tag(
                'section', 
                Html::tag('h3', Yii::t('app', 'Простота'))
                . Html::tag('p', Yii::t('app', 'Простота - это эффективность')), 
                ['class' => 'about-list__item']
            )
            . Html::tag(
                'section', 
                Html::tag('h3', Yii::t('app', 'Разнообразие'))
                . Html::tag('p', Yii::t('app', 'Мы разные. Но мы используем наши различия в качестве движущей силы для создания продукта высочайшего класса')), 
                ['class' => 'about-list__item']
            )
            . Html::tag(
                'section', 
                Html::tag('h3', Yii::t('app', 'Этические принципы'))
                . Html::tag('p', Yii::t('app', 'Мы дорожим нашими взаимоотношениями и считаем их основой нашего благополучия')), 
                ['class' => 'about-list__item']
            )
            . Html::tag(
                'section', 
                Html::tag('h3', Yii::t('app', 'Уверенность'))
                . Html::tag('p', Yii::t('app', 'Мы потратили годы на поиски новой инвестиционной возможности, которую мы сами используем с уверенностью')), 
                ['class' => 'about-list__item']
            )
            ,
            ['class' => 'about-list wow slide-in-bck-bottom', 'data-wow-delay' => '.4s']
        )
        ,
        ['id' => 'about', 'class' => 'about']
    )
    . Html::tag(
        'section',
        Html::tag('h2', Yii::t('app', 'Отдельно управляемый счет') . ' ' . Html::encode(Yii::$app->name), ['class' => 'wow slide-in-bck-bottom', 'data-wow-delay' => '.2s'])
        . Html::tag(
            'div',
            Html::tag(
                'section',
                Html::tag('p', '/1/')
                . Html::tag('h3', Yii::t('app', 'Активное управление'))
                . Html::tag('p', Yii::t('app', 'Управляемый счет позволит Вам расслабиться, в то время как Ваши деньги и NSM SWISS LIFE INVESTMENT & CONSULTING LP работают на Вас')),
                ['class' => 'nsm-account-list__item']
            )
            . Html::tag(
                'section',
                Html::tag('p', '/2/')
                . Html::tag('h3', Yii::t('app', 'Сегрегированный счет'))
                . Html::tag('p', Yii::t('app', 'Ваши деньги не объединяются с любыми другими инвестициями и Вы сохраняете право собственности на свои средства')),
                ['class' => 'nsm-account-list__item']
            ) 
            . Html::tag(
                'section',
                Html::tag('p', '/3/')
                . Html::tag('h3', Yii::t('app', 'Форма договора')),
                ['class' => 'nsm-account-list__item']
            )
            . Html::tag(
                'section',
                Html::tag('p', '/4/')
                . Html::tag('h3', Yii::t('app', 'Широкая диверсификация')),
                ['class' => 'nsm-account-list__item']
            )
            . Html::tag(
                'section',
                Html::tag('p', '/5/')
                . Html::tag('h3', Yii::t('app', 'Маржа портфеля'))
                . Html::tag('p', Yii::t('app', 'Получите кредитное плечо от размера Ваших инвестиций, используя маржу портфеля')),
                ['class' => 'nsm-account-list__item']
            )
            . Html::tag(
                'section',
                Html::tag('p', '/6/')
                . Html::tag('h3', Yii::t('app', 'Онлайн доступ'))
                . Html::tag('p', Yii::t('app', 'Контролируйте Ваши инвестиции с помощью онлайн-платформы управления счетом') . ' ' . Html::encode(Yii::$app->name)),
                ['class' => 'nsm-account-list__item']
            )
            . Html::tag(
                'section',
                Html::tag('p', '/7/')
                . Html::tag('h3', Yii::t('app', 'Британское законодательство')),
                ['class' => 'nsm-account-list__item']
            )
            . Html::tag(
                'section',
                Html::tag('p', '/8/')
                . Html::tag('h3', Yii::t('app', 'Прозрачность')),
                ['class' => 'nsm-account-list__item']
            )
            . Html::tag(
                'section',
                Html::tag('p', '/9/')
                . Html::tag('h3', Yii::t('app', 'Строгая конфиденциальность')),
                ['class' => 'nsm-account-list__item']
            )
            . Html::tag(
                'section',
                Html::tag('p', '/10/')
                . Html::tag('h3', Yii::t('app', 'Доступность')),
                ['class' => 'nsm-account-list__item']
            ),
            ['class' => 'nsm-account-list container wow slide-in-bck-bottom', 'data-wow-delay' => '.4s']
        )
        ,
        ['class' => 'nsm-account']
    )
    . Html::tag(
        'section',
        Html::tag('h2', Yii::t('app', 'Создайте учетную запись, чтобы воспользоваться всеми преимуществами'))
        . Html::tag('p', Yii::t('app', 'Мы взимаем комиссию только за успешный результат'))
        . Html::tag(
            'div',
            Html::a(Yii::t('app', 'Создать аккаунт'), Url::to(['signup', 'lang' => Yii::$app->language]), ['class' => 'btn btn-primary btn-medium'])
            . Html::a(Yii::t('app', 'Авторизоваться'), Url::to(['login', 'lang' => Yii::$app->language]), ['class' => 'btn btn-secondary btn-medium']),
            ['class' => 'btn-group']
        )
        ,
        ['class' => 'create-account wow slide-in-bck-bottom', 'data-wow-delay' => '.4s']
    
    )
    . Html::tag(
        'section',
        sprintf(
            '%s<ul>%s</ul>',
            Html::tag('h2', Yii::t('app', 'Наши партнеры')),
            implode(
                '', 
                array_map(
                    function($partner) {
                        return '<li><a href="' . $partner['url'] . '" target="_blank">' . $partner['name'] . '</a></li>';
                    }, 
                    $partners
                )
            )
        ),
        ['class' => 'our-partners container wow slide-in-bck-bottom', 'data-wow-delay' => '.4s']
    )
    . Html::tag(
        'section',
        Html::tag('h2', Yii::t('app', 'Связаться с нами'))
        . Html::a('nsm@nsm-swissconsulting.com', 'mailto:nsm@nsm-swissconsulting.com')
        . Html::a('nsm-invest@nsm-swissconsulting.com', 'mailto:nsm-invest@nsm-swissconsulting.com')
        ,
        ['class' => 'contact-us wow slide-in-bck-bottom']
    
    ),
    ['class' => 'main']
);