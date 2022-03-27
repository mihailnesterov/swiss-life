<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\User */
/* @var $form ActiveForm */
?>
<main role="main">
    <header class="header">
        <h1><?= Html::encode($this->title) ?></h1>
    </header>

    <div class="container">

        <div class="login">

                <?php $form = ActiveForm::begin(); ?>

                    <?= $form->field($model, 'email', [
                        'template' => '{input}{error}',
                        'inputOptions' => [
                            'autofocus' => 'autofocus',
                            'tabindex' => '1',
                            'placeholder' => 'Email',
                            'class'=>'input',
                            //'pattern'=>'\D+([a-zA-Z0-9._@])$'
                        ]
                    ])->label(false) ?>


                    <?= $form->field($model, 'password', [
                        'template' => '{input}{error}',
                        'inputOptions' => [
                            'tabindex' => '2',
                            'placeholder' => 'Пароль',
                            'class'=>'input'
                        ]
                    ])->passwordInput()->label(false) ?>

                    <?= $form->field($model, 'rememberMe', [
                        'template' => '{input}{error}',
                        'inputOptions' => [
                            'tabindex' => '3',
                            'class'=>'checkbox'
                        ]
                    ])->checkbox(['value' => 0, 'checked' => false]) ?>

                    <div class="form-submit-group">
                        <?= Html::submitButton('Войти', ['class' => 'btn-login']) ?>
                        <a href="<?=Yii::$app->urlManager->createUrl(['password-restore'])?>" class='btn-link'>Забыли пароль?</a>
                    </div>
                <?php ActiveForm::end(); ?>

        </div>

    </div>
    
    <footer>
        <p class="copyright"><?= Html::encode(\Yii::$app->name) ?> &copy; <?= date('Y') ?></p>
    </footer>
</main>