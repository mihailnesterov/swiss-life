<?php

/** @var $this \yii\web\View */
/** @var $fullName string */
/** @var $login string */
/** @var $password string */
/** @var Yii::$app->params['url'] string */

?>
<?= \Yii::t('app', 'Здравствуйте') ?>, <?= $fullName ?>, 

<?= \Yii::t('app', 'Ваши данные для авторизации') ?>:

<?= \Yii::t('app', 'Логин') ?>: <?= $login ?>,
<?= \Yii::t('app', 'Пароль') ?>: <?= $password ?>, 
<?= \Yii::t('app', 'Войти в кабинет') ?>: <?= \Yii::$app->params['url'] ?>