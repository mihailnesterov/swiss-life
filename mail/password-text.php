<?php

/** @var $this \yii\web\View */
/** @var $fullName string */
/** @var $login string */
/** @var $password string */
/** @var Yii::$app->params['url'] string */

?>
Здравстуйте, <?= $fullName ?>, 

Ваши данные для авторизации:

Логин: <?= $login ?>,
Пароль: <?= $password ?>, 
Войти в кабинет: <?= \Yii::$app->params['url'] ?>