<?php

/** @var $this \yii\web\View */
/** @var $fullName string */
/** @var $code string */

?>

<h4><?= \Yii::t('app', 'Здравствуйте') ?>, <?= $fullName ?></h4>

<p><?= \Yii::t('app', 'Одноразовый код для смены пароля') ?>:</p>

<p><?= $code ?></p>
