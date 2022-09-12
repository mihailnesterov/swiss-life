<?php

use yii\helpers\{Html, Url};
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\UserPasswordReset */
/* @var $form ActiveForm */

$this->registerJs("
    jQuery('#show-password').on('click', function(){
        const eye = jQuery(this).find('i');
        if( jQuery(eye).hasClass('fa-eye') ) {
            jQuery(eye).removeClass('fa-eye').addClass('fa-eye-slash');
            jQuery(this).attr('title', '" . Yii::t('app', 'Скрыть пароль') . "');
        } else {
            jQuery(eye).removeClass('fa-eye-slash').addClass('fa-eye');
            jQuery(this).attr('title', '" . Yii::t('app', 'Показать пароль') . "');
        }
        jQuery('#userpasswordreset-password').attr('type', function(index, attr) {
            return attr === 'password' ? 'text' : 'password';
        });
    });
    jQuery('#show-new-password').on('click', function(){
        const eye = jQuery(this).find('i');
        if( jQuery(eye).hasClass('fa-eye') ) {
            jQuery(eye).removeClass('fa-eye').addClass('fa-eye-slash');
            jQuery(this).attr('title', '" . Yii::t('app', 'Скрыть пароль') . "');
        } else {
            jQuery(eye).removeClass('fa-eye-slash').addClass('fa-eye');
            jQuery(this).attr('title', '" . Yii::t('app', 'Показать пароль') . "');
        }
        jQuery('#userpasswordreset-newpassword').attr('type', function(index, attr) {
            return attr === 'password' ? 'text' : 'password';
        });
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
                    'template' => '<div class="input-block">{label}{input}<button type="button" id="show-password" class="show-password" title="' . Yii::t('app', 'Показать пароль') . '"><i class="fa-regular fa-eye"></i></button>{error}</div>',
                    'inputOptions' => [
                        'tabindex' => '1',
                        'placeholder' => Yii::t('app', 'Новый пароль'),
                        'class'=>'input'
                    ]
                ])->passwordInput()->label(Yii::t('app', 'Введите новый пароль')) ?>

                <?= $form->field($model, 'newPassword', [
                    'template' => '<div class="input-block">{label}{input}<button type="button" id="show-new-password" class="show-password" title="' . Yii::t('app', 'Показать пароль') . '"><i class="fa-regular fa-eye"></i></button>{error}</div>',
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