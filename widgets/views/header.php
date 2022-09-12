<?php
use yii\helpers\{Html, Url};
        
echo Html::tag(
    'header',
    Html::tag(
        'div',
        Html::a(
            Html::tag(
                'figure',
                Html::img(
                    'images/logo.png',
                    ['alt' => 'Logo', 'srcset' => 'images/logo.png']
                )
                . Html::tag(
                    'figcaption',
                    'NSM SWISS LIFE<br> INVESTMENT &<br> CONSULTING LP'
                )
            ),
            Url::to(['/', 'lang' => Yii::$app->language]),
            ['class' => 'logo']
        )
        . \app\widgets\MainMenu::widget()
        . Html::tag(
            'div',
            Html::a(
                'RU', 
                Url::to([Yii::$app->controller->route, 'lang' => 'ru-RU']), 
                ['class' => 'btn btn-secondary btn-medium btn-lang' . (Yii::$app->language === 'ru-RU' ? ' active' : '')]
            )
            . Html::a(
                'EN', 
                Url::to([Yii::$app->controller->route, 'lang' => 'en-US']), 
                ['class' => 'btn btn-secondary btn-medium btn-lang' . (Yii::$app->language === 'en-US' ? ' active' : '')]
            )
            . Html::a(
                Yii::t('app', 'Авторизоваться'), 
                Url::to(['login', 'lang' => Yii::$app->language]), 
                ['class' => 'btn btn-secondary btn-medium']
            ),
            ['class' => 'auth']
        ),
        ['class' => 'container']
    ),
    ['class' => 'header']
);
