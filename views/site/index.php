<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\User */
/* @var $form ActiveForm */
?>

<main role="main">

    <header style="text-align: center">
        <h1><?= Html::encode($this->title) ?></h1>
    </header>

    <div class="login-container" style="margin: 0 auto; max-width: 480px;">


            <?php $form = ActiveForm::begin(); ?>

                <?= $form->field($model, 'email', [
                    'template' => '{input}{error}',
                    'inputOptions' => [
                        'autofocus' => 'autofocus',
                        'tabindex' => '1',
                        'placeholder' => 'Email',
                        'class'=>'form-control input-lg',
                        //'pattern'=>'\D+([a-zA-Z0-9._@])$'
                    ]
                ])->label(false) ?>


                <?= $form->field($model, 'password', [
                    'template' => '{input}{error}',
                    'inputOptions' => [
                        'tabindex' => '2',
                        'placeholder' => 'Пароль',
                        'class'=>'form-control input-lg'
                    ]
                ])->passwordInput()->label(false) ?>

                <?= $form->field($model, 'rememberMe', [
                    'template' => '{input}{error}',
                    'inputOptions' => [
                        'tabindex' => '3',
                        'class'=>'form-control input-lg'
                    ]
                ])->checkbox(['value' => 0, 'checked' => false]) ?>

                <div class="form-group  text-center">
                    <?= Html::submitButton('Войти', ['class' => 'btn-login']) ?>
                </div>
            <?php ActiveForm::end(); ?>

            <div class="login-links">
                <a href="<?=Yii::$app->urlManager->createUrl(['password-restore'])?>">Забыли пароль?</a>
            </div>

    </div><!-- end login-container -->
   
</main>