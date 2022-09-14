<?php

use yii\helpers\{Html, Url};
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Signup */
/* @var $form ActiveForm */

if( null !== Yii::$app->request->get('lang') ) {
    Yii::$app->language = Yii::$app->request->get('lang');
}

$this->title = Yii::t('app', 'Создание нового аккаунта');

?>
<main class="main">
    <?= Yii::$app->session->getFlash('signup') ?>
    <div class="login">
        <h1 class="text-white text-left"><?= Html::encode($this->title) ?></h1>
        <h2 class="text-left"><?= Yii::t('app', 'Оставьте свои данные и наш менеджер свяжется с вами') ?>!</h2>
        <?php
            $form = ActiveForm::begin([
                'id' => 'signup',
                'validateOnType' => true,
                'fieldConfig' => [
                    'template' => '<div class="input-block">{label}{input}{error}</div>',
                ],
                'options' => [
                    'class' => 'signup',
                ],
            ]); ?>
        <div class="login-list">
            
            <div class="column">
                <?php
                echo $form->field($model, 'name', [
                        'inputOptions' => [
                            'autofocus' => 'autofocus',
                            'autocomplete' => 'off',
                            'tabindex' => '1',
                            'placeholder' => Yii::t('app', 'Ваше ФИО'),
                            'class'=>'input'
                        ]
                    ])->label(Yii::t('app', 'Как вас зовут?'))


                    . $form->field($model, 'email', [
                        'inputOptions' => [
                            'autocomplete' => 'off',
                            'tabindex' => '2',
                            'placeholder' => 'Email',
                            'class'=>'input'
                        ]
                    ])->label(Yii::t('app', 'Ваш Email'))

                    . $form->field($model, 'first_payment', [
                        'inputOptions' => [
                            'autocomplete' => 'off',
                            'tabindex' => '3',
                            'placeholder' => Yii::t('app', 'Введите сумму'),
                            'class'=>'input'
                        ]
                    ])->label(Yii::t('app', 'Первоначальный взнос'));
                ?>
            </div>

            <div class="column">
                <?php
                echo $form->field($model, 'address', [
                        'inputOptions' => [
                            'autofocus' => 'autofocus',
                            'autocomplete' => 'off',
                            'tabindex' => '4',
                            'placeholder' => Yii::t('app', 'Ваш адрес'),
                            'class'=>'input'
                        ]
                    ])->label(Yii::t('app', 'Адрес проживания'))


                    . $form->field($model, 'phone', [
                        'inputOptions' => [
                            'autocomplete' => 'off',
                            'tabindex' => '5',
                            'placeholder' => '+7 (909) 760 90-90',
                            'class'=>'input'
                        ]
                    ])->label(Yii::t('app', 'Номер телефона'));
                ?>
            </div>

            <div class="column">
                <?php
                echo $form->field($model, 'business', [
                        'inputOptions' => [
                            'autofocus' => 'autofocus',
                            'autocomplete' => 'off',
                            'tabindex' => '6',
                            'placeholder' => Yii::t('app', 'Чем вы занимаетесь?'),
                            'class'=>'input'
                        ]
                    ])->label(Yii::t('app', 'Вид деятельности'))


                    . $form->field($model, 'contract_amount', [
                        'inputOptions' => [
                            'autocomplete' => 'off',
                            'tabindex' => '7',
                            'placeholder' => Yii::t('app', 'Введите сумму'),
                            'class'=>'input'
                        ]
                    ])->label(Yii::t('app', 'Сумма контракта'));
                ?>
            </div>
        </div>
        <div class="form-submit-group text-left">
            <?= Html::submitButton(Yii::t('app', 'Отправить заявку'), ['class' => 'btn btn-primary btn-medium']) ?>
        </div>
        <?php ActiveForm::end(); ?>
    </div>
</main>