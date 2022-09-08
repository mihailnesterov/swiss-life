<?php
use yii\helpers\{Html, Url};
        
echo Html::tag(
    'div',
    Html::a(
        Html::tag(
            'figure',
            Html::img(
                'images/logo.png',
                ['alt' => 'Logo', 'srcset' => 'images/logo.png']
            )
        ),
        Url::to(['/']),
        ['class' => 'logo']
    )
    . Html::tag(
        'p', 
        Html::encode(\Yii::$app->name) 
        . ' - '
        . \Yii::t('app', 'кипрская инвестиционная компания')
        . ' (CIF), '
        . \Yii::t('app', 'контролируемая и регулируемая Кипрской Комиссией по Ценным Бумагам и Биржам')
        . ' (CySEC) '
        . \Yii::t('app', 'с лицензией') . ' '
        . Html::tag('span', 'XXXXXX', ['class' => 'text-red'])
        . ' ' . \Yii::t('app', 'и регистрационным номером компании') . ' '
        . Html::tag('span', 'XXXXXXXX', ['class' => 'text-red'])
    )
)
. Html::tag(
    'div',
    Html::tag(
        'p', 
        'Адрес и тд'
    )
);