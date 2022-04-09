<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\User */
/* @var $form ActiveForm */

$this->title = 'Регистрация админа/менеджера';
?>

<div style="margin: 0 auto; max-width: 480px;">
    
    <h1><?= Html::encode($this->title) ?></h1>

    <?php $form = ActiveForm::begin(); ?>
        
        <?= $form->field($model, 'email', [
            'template' => '{input}{error}',
            'inputOptions' => [
                'autofocus' => 'autofocus',
                'tabindex' => '1',
                'placeholder' => 'Email',
                'class'=>'',
                //'pattern'=>'\D+([a-zA-Z0-9._@])$'
            ]
        ])->textInput(['maxlength' => true])->label(false) ?>

        <?= $form->field($model, 'password', [
            'template' => '{input}{error}',
            'inputOptions' => [
                'tabindex' => '2',
                'placeholder' => 'Пароль',
                'class'=>''
            ]
        ])->passwordInput(['maxlength' => true])->label(false) ?>

        <?= $form->field($model, 'firstName', [
            'template' => '{input}{error}',
            'inputOptions' => [
                'tabindex' => '3',
                'placeholder' => 'Имя',
                'class'=>''
            ]
        ])->textInput()->label(false) ?>

        <?= $form->field($model, 'lastName', [
            'template' => '{input}{error}',
            'inputOptions' => [
                'tabindex' => '4',
                'placeholder' => 'Фамилия',
                'class'=>''
            ]
        ])->textInput()->label(false) ?>

        <div class="">
            <?= Html::submitButton('Зарегистрироваться', ['class' => '']) ?>
        </div>
    <?php ActiveForm::end(); ?>
    
    <div>
        У меня уже есть аккаунт <a href="<?=Yii::$app->urlManager->createUrl(['/'])?>" >Войти</a>
    </div>

</div>
