<?php

use yii\helpers\{Html, Url};
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\UserOneTimeCode */
/* @var $form ActiveForm */


if( null !== Yii::$app->request->get('lang') ) {
    Yii::$app->language = Yii::$app->request->get('lang');
}

$this->title = Yii::t('app', 'Ввести одноразовый код');

?>
<main class="main">
    <?= Yii::$app->session->getFlash('one-time-code') ?>
    <div class="login">
        <h1><?= Html::encode($this->title) ?></h1>
        <div class="login-list">
            <?php $form = ActiveForm::begin([
                'id' => 'one-time-code',
                'validateOnType' => true,
                'fieldConfig' => [
                    'template' => '<div class="input-block">{label}{input}{error}</div>',
                ],
                'options' => [
                    'class' => 'login-form',
                ],
            ]); ?>

                <?= $form->field($model, 'code', [
                    'inputOptions' => [
                        'autofocus' => 'autofocus',
                        'tabindex' => '1',
                        'placeholder' => Yii::t('app', 'Введите код'),
                        'class'=>'input',
                    ]
                ])->label(Yii::t('app', 'Одноразовый код')) ?>

                <div class="form-submit-group">
                    <?= Html::submitButton(Yii::t('app', 'Далее'), ['class' => 'btn btn-primary']) ?>
                </div>
            <?php ActiveForm::end(); ?>
        </div>
    </div>
</main>