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

<h3><?= \Yii::t('app', 'Получена новая заявка') ?></h3>
<h4><?= \Yii::t('app', 'Детали заявки') ?>:</h4>

<p><?= \Yii::t('app', 'ФИО') ?>: <?= $name ?></p>
<p><?= \Yii::t('app', 'Email') ?>: <?= $email ?></p>
<p><?= \Yii::t('app', 'Телефон') ?>: <?= $phone ?></p>
<p><?= \Yii::t('app', 'Адрес') ?>: <?= $address ?></p>
<p><?= \Yii::t('app', 'Вид деятельности') ?>: <?= $business ?></p>
<p><?= \Yii::t('app', 'Первоначальный взнос') ?>: <?= $first_payment ?></p>
<p><?= \Yii::t('app', 'Сумма контракта') ?>: <?= $contract_amount ?></p>
