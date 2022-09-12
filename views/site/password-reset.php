<?php

use yii\helpers\{Html, Url};
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\UserPasswordReset */
/* @var $form ActiveForm */

$this->registerJs("
    jQuery('#show-password').change(function(){
        jQuery('#userlogin-password').attr('type', this.checked ? 'text' : 'password');
    })"
);

if( null !== Yii::$app->request->get('lang') ) {
    Yii::$app->language = Yii::$app->request->get('lang');
}

$this->title = Yii::t('app', 'Смена пароля');

?>
<main class="main">
    <?= Yii::$app->session->getFlash('password-reset') ?>
    <div class="login">
        <h1><?= Html::encode($this->title) ?></h1>
        <div class="login-list">
            <?php $form = ActiveForm::begin([
                'id' => 'password-reset',
                'validateOnType' => true,
                'fieldConfig' => [
                    'template' => '<div class="input-block">{label}{input}{error}</div>',
                ],
                'options' => [
                    'class' => 'login-form',
                ],
            ]); ?>

                <?= $form->field($model, 'password', [
                    'inputOptions' => [
                        'tabindex' => '1',
                        'placeholder' => Yii::t('app', 'Новый пароль'),
                        'class'=>'input'
                    ]
                ])->passwordInput()->label(Yii::t('app', 'Введите новый пароль')) ?>

                <?= $form->field($model, 'newPassword', [
                    'inputOptions' => [
                        'tabindex' => '2',
                        'placeholder' => Yii::t('app', 'Новый пароль'),
                        'class'=>'input'
                    ]
                ])->passwordInput()->label(Yii::t('app', 'Подтвердите пароль')) ?>

                <div class="form-submit-group">
                    <?= Html::submitButton(Yii::t('app', 'Сменить пароль'), ['class' => 'btn btn-primary']) ?>
                </div>
            <?php ActiveForm::end(); ?>
        </div>
    </div>
</main>