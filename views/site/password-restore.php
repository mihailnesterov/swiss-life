<?php

use yii\helpers\{Html, Url};
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\UserRestorePassword */
/* @var $form ActiveForm */


if( null !== Yii::$app->request->get('lang') ) {
    Yii::$app->language = Yii::$app->request->get('lang');
}

$this->title = Yii::t('app', 'Восстановление пароля');

/*echo '<pre>';
print_r($model->oneTimeCode);
print_r(Yii::$app->getRequest()->getCookies()->getValue('_swiss_life_one_time_code'));
print_r(Yii::$app->request->post());
echo '</pre>';*/

?>
<main class="main">
    <?= Yii::$app->session->getFlash('password-restore') ?>
    <div class="login">
        <h1><?= Html::encode($this->title) ?></h1>
        <div class="login-list">
            <?php $form = ActiveForm::begin([
                'id' => 'password-restore',
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
                    ]
                ])->label('Email') ?>

                <div class="form-submit-group">
                    <?= Html::submitButton(Yii::t('app', 'Отправить код'), ['class' => 'btn btn-primary']) ?>
                </div>
            <?php ActiveForm::end(); ?>
        </div>
    </div>
</main>