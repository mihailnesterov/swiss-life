<?php

/** @var $this \yii\web\View */
/** @var $fullName string */
/** @var $code string */

?>
<?= \Yii::t('app', 'Здравствуйте') ?>, <?= $fullName ?>, 

<?= \Yii::t('app', 'Одноразовый код для смены пароля') ?>

<?= $code ?>