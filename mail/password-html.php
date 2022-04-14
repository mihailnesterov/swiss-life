<?php

/** @var $this \yii\web\View */
/** @var $fullName string */
/** @var $login string */
/** @var $password string */
/** @var Yii::$app->params['url'] string */

?>

<h4>Здравстуйте, <?= $fullName ?></h4>,

<p>Ваши данные для авторизации:</p>

<p>Логин: <?= $login ?></p>
<p>Пароль: <?= $password ?></p>
<p>Войти в кабинет: 
    <a href="<?= \Yii::$app->params['url'] ?>" target="_blank">
        <?= \Yii::$app->params['url'] ?>
    </a>
</p>
