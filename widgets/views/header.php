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
            Html::tag(
                'div',
                Html::tag(
                    'select',
                    Html::tag('option', 'RU', ['value' => 'ru-RU', 'selected' => Yii::$app->language === 'ru-RU' ? 'selected' : null])
                    . Html::tag('option', 'EN', ['value' => 'en-US', 'selected' => Yii::$app->language === 'en-US' ? 'selected' : null]),
                    ['onchange' => "if (this.value) window.location.href=window.location.origin + window.location.pathname + '?lang=' + this.value"]
                ),
                ['class' => 'languages-menu']
            )
            /*Html::a(
                'RU', 
                Url::to([Yii::$app->controller->route, 'lang' => 'ru-RU']), 
                ['class' => 'btn btn-secondary btn-medium btn-lang' . (Yii::$app->language === 'ru-RU' ? ' active' : '')]
            )
            . Html::a(
                'EN', 
                Url::to([Yii::$app->controller->route, 'lang' => 'en-US']), 
                ['class' => 'btn btn-secondary btn-medium btn-lang' . (Yii::$app->language === 'en-US' ? ' active' : '')]
            )*/
            . Html::a(
                Yii::t('app', 'Авторизоваться'), 
                Url::to(['login', 'lang' => Yii::$app->language]), 
                ['class' => 'btn btn-secondary btn-medium']
            )
            . Html::button(
                '<svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.5" x2="20" y2="0.5" stroke="#F8F8F8"/>
                <line x1="5" y1="5.5" x2="20" y2="5.5" stroke="#F8F8F8"/>
                <line x1="10" y1="10.5" x2="20" y2="10.5" stroke="#F8F8F8"/>
                </svg>', 
                ['class' => 'hamburger']
            ),
            ['class' => 'auth']
        ),
        ['class' => 'container']
    ),
    ['class' => 'header']
);
