<?php

use yii\helpers\{Html, Url};
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\User */
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
        jQuery('#userlogin-password').attr('type', function(index, attr) {
            return attr === 'password' ? 'text' : 'password';
        });
    });"
);

if( null !== Yii::$app->request->get('lang') ) {
    Yii::$app->language = Yii::$app->request->get('lang');
}

$this->title = Yii::t('app', 'Войдите в свой аккаунт или создайте новый');

?>
<main class="main">
    <?= Yii::$app->session->getFlash('login') ?>
    <div class="login">
        <h1><?= Html::encode($this->title) ?></h1>
        <div class="login-list">
            <?php $form = ActiveForm::begin([
                'id' => 'signin',
                'validateOnType' => true,
                'fieldConfig' => [
                    'template' => '<div class="input-block">{label}{input}{error}</div>',
                ],
                'options' => [
                    'class' => 'login-form',
                ],
            ]); ?>

                <?= $form->field($model, 'email', [
                    'inputOptions' => [
                        'autofocus' => 'autofocus',
                        'tabindex' => '1',
                        'placeholder' => Yii::t('app', 'Ваш email'),
                        'class'=>'input',
                        //'pattern'=>'\D+([a-zA-Z0-9._@])$'
                    ]
                ])->label('Email') ?>


                <?= $form->field($model, 'password', [
                    'template' => '<div class="input-block">{label}{input}<button type="button" id="show-password" class="show-password" title="' . Yii::t('app', 'Показать пароль') . '"><i class="fa-regular fa-eye"></i></button>{error}</div>',
                    'inputOptions' => [
                        'tabindex' => '2',
                        'placeholder' => Yii::t('app', 'Ваш пароль'),
                        'class'=>'input'
                    ]
                ])->passwordInput()->label(Yii::t('app', 'Пароль')) ?>

                <?= $form->field($model, 'rememberMe', [
                    'inputOptions' => [
                        'tabindex' => '3',
                        'class'=>'checkbox hidden'
                    ]
                ])->checkbox(['value' => 0, 'checked' => true]) ?>

                <div class="form-submit-group">
                    <?= Html::submitButton(Yii::t('app', 'Войти в аккаунт'), ['class' => 'btn btn-secondary']) ?>
                    <a href="<?=Yii::$app->urlManager->createUrl(['password-restore', 'lang' => Yii::$app->language])?>" class='btn-link'><?= Yii::t('app', 'Забыли пароль?') ?></a>
                </div>
            <?php ActiveForm::end(); ?>
        
            <?php $form = ActiveForm::begin([
                'id' => 'signup',
                'validateOnType' => true,
                'fieldConfig' => [
                    'template' => '<div class="input-block">{label}{input}{error}</div>',
                ],
                'options' => [
                    'class' => 'login-form',
                ],
            ]); ?>

                <?= $form->field($model, 'email', [
                    'inputOptions' => [
                        'autofocus' => 'autofocus',
                        'tabindex' => '1',
                        'placeholder' => Yii::t('app', 'Ваш email'),
                        'class'=>'input',
                        //'pattern'=>'\D+([a-zA-Z0-9._@])$'
                    ]
                ])->label('Email') ?>


                <?= $form->field($model, 'password', [
                    'inputOptions' => [
                        'tabindex' => '2',
                        'placeholder' => Yii::t('app', 'Ваш пароль'),
                        'class'=>'input'
                    ]
                ])->passwordInput()->label(Yii::t('app', 'Придумайте пароль')) ?>

                <?= $form->field($model, 'rememberMe', [
                    'inputOptions' => [
                        'tabindex' => '3',
                        'class'=>'checkbox hidden'
                    ]
                ])->checkbox(['value' => 0, 'checked' => true]) ?>

                <div class="form-submit-group">
                    <?= Html::submitButton(Yii::t('app', 'Создать аккаунт'), ['class' => 'btn btn-primary']) ?>
                </div>
            <?php ActiveForm::end(); ?>
        </div>
    </div>

</main>