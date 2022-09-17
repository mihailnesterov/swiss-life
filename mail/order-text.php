<?php

/** @var $this \yii\web\View */
/** @var $name string */
/** @var $email string */
/** @var $phone string */
/** @var $address string */
/** @var $business string */
/** @var $first_payment string */
/** @var $contract_amount string */

?>
<?= \Yii::t('app', 'Получена новая заявка') ?>
<?= \Yii::t('app', 'Детали заявки') ?>:

<?= \Yii::t('app', 'ФИО') ?>: <?= $name ?>
<?= \Yii::t('app', 'Email') ?>: <?= $email ?>
<?= \Yii::t('app', 'Телефон') ?>: <?= $phone ?>
<?= \Yii::t('app', 'Адрес') ?>: <?= $address ?>
<?= \Yii::t('app', 'Вид деятельности') ?>: <?= $business ?>
<?= \Yii::t('app', 'Первоначальный взнос') ?>: <?= $first_payment ?>
<?= \Yii::t('app', 'Сумма контракта') ?>: <?= $contract_amount ?>