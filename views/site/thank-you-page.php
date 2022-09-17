<?php

/* @var $this yii\web\View */
/* @var $name string */
/* @var $message string */
/* @var $exception Exception */

use yii\helpers\{Html, Url};

if( null !== Yii::$app->request->get('lang') ) {
    Yii::$app->language = Yii::$app->request->get('lang');
}

$this->title = Yii::t('app', 'Ваша заявка получена');

echo Html::tag(
    'main',
    Html::tag(
        'section',
        Html::tag('h1', Html::encode($this->title))
        . Html::tag('h3', Html::encode(Yii::t('app', 'В ближайшее время наш менеджер свяжется с Вами')))
        . Html::a(
            Html::tag('i', '', ['class' => 'fa fa-caret-left']) . ' ' . Yii::t('app', 'Вернуться на главную страницу'), 
            Url::to(['/', 'lang' => Yii::$app->language]),
            ['class' => 'btn btn-primary btn-medium']
        ),
        ['class' => 'thank-you-page']
    
    ),
    ['class' => 'main']
);
