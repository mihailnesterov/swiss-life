<?php
namespace app\models;

use Yii;
use app\models\{User, UserIdentity};

/**
 * User Password Reset form
 */
class UserPasswordReset extends UserIdentity
{

    public $newPassword;

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['email', 'string'],
            ['password', 'required', 'message' => Yii::t('app', 'Пароль не может быть пустым')],
            ['password', 'string', 'min' => 8, 'max' => 100, 'tooShort' => Yii::t('app', 'Длина пароля не минее 8 символов')],
            ['newPassword', 'required', 'message' => Yii::t('app', 'Пароль не может быть пустым')],
            ['newPassword', 'string', 'min' => 8, 'max' => 100, 'tooShort' => Yii::t('app', 'Длина пароля не минее 8 символов')],
            ['newPassword', 'validateNewPassword'],
        ];
    }

    public function validateNewPassword()
    {
        if (!$this->hasErrors()) {
            if ($this->password !== $this->newPassword) {
                $this->addError(Yii::t('app', 'Пароли не совпадают'));
            }
        }
    }

    public function resetPassword()
    {
        if ($this->password === $this->newPassword) {
            if( Yii::$app->request->cookies->has('_swiss_life_restore_password_email') ) {
                
                $email = Yii::$app->getRequest()->getCookies()->getValue('_swiss_life_restore_password_email');
                
                $user = User::findOne(['email' => $email, 'status' => 1]);
                $user->password = Yii::$app->security->generatePasswordHash($this->password);
                
                //if ( $user->save() ) {
                    Yii::$app->session->setFlash('login', '<div class="flash success slide-in-right"><h4>' . Yii::t('app', 'Пароль изменен') . '</h4></div>');
                    Yii::$app->response->cookies->remove('_swiss_life_restore_password_email');
                    // отправить пароль на емайл пользователя
                    // ...
                //}
                
            }

            Yii::$app->response->cookies->remove('_swiss_life_one_time_code');
        }
    }

}
