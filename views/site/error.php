<?php

/* @var $this yii\web\View */
/* @var $name string */
/* @var $message string */
/* @var $exception Exception */

use yii\helpers\{Html, Url};

if( null !== Yii::$app->request->get('lang') ) {
    Yii::$app->language = Yii::$app->request->get('lang');
}

$this->title = $name;

echo Html::tag(
    'div',
    Html::tag('h1', Html::encode($this->title))
    . Html::tag('h3', Html::encode(Yii::t('app', $message)))
    . Html::a(
        Html::tag('i', '', ['class' => 'fa fa-caret-left']) . ' ' . Yii::t('app', 'Вернуться на предыдущую страницу'), 
        'javascript:history.go(-1)'
    ),
    ['class' => 'error-404']
);
