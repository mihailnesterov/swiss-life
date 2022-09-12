<?php

/** @var $this \yii\web\View */
/** @var $fullName string */
/** @var $login string */
/** @var $password string */
/** @var Yii::$app->params['url'] string */

?>

<h4><?= \Yii::t('app', 'Здравствуйте') ?>, <?= $fullName ?></h4>

<p><?= \Yii::t('app', 'Ваши данные для авторизации') ?>:</p>

<p><?= \Yii::t('app', 'Логин') ?>: <?= $login ?></p>
<p><?= \Yii::t('app', 'Пароль') ?>: <?= $password ?></p>
<p><?= \Yii::t('app', 'Войти в кабинет') ?>: 
    <a href="<?= \Yii::$app->params['url'] ?>" target="_blank">
        <?= \Yii::$app->params['url'] ?>
    </a>
</p>
