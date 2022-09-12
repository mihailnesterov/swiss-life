<?php
namespace app\models;

use Yii;
use app\models\{User, UserIdentity};

/**
 * User Password Restore form
 */
class UserPasswordRestore extends UserIdentity
{

    public $oneTimeCode;

    public function __construct()
    {
        if( Yii::$app->request->cookies->has('_swiss_life_one_time_code') ) {
            Yii::$app->response->cookies->remove('_swiss_life_one_time_code');
        }

        $this->oneTimeCode = $this->generateOneTimeCode();
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['email', 'trim'],
            ['email', 'required', 'message' => Yii::t('app', 'Email не может быть пустым')],
            ['email', 'email', 'message' => Yii::t('app', 'Введенный email содержит ошибки')],
            ['email', 'validateEmail'],
            ['oneTimeCode', 'string'],
        ];
    }

    /**
     * Generates one time code
     *
     * @return string
     */
    private function generateOneTimeCode() {
        return Yii::$app->security->generateRandomString(8);
    }

    public function validateEmail()
    {
        if (!$this->hasErrors()) {
            $user = UserIdentity::findByEmail($this->email);

            if (!$user) {
                $this->addError(Yii::t('app', 'Пользователь с таким email не найден'));
            } else {
                $cookie = new \yii\web\Cookie([
                    'name' => '_swiss_life_restore_password_email',
                    'value' => $this->email,
                    'expire' => time() + 60 * 60,
                ]);
        
                Yii::$app->getResponse()->getCookies()->add($cookie); 
            }
        }
    }

    /**
     * Sends one time code to user
     *
     * @return bool whether the email was sent
     */
    public function sendCodeOnEmail()
    {
        $user = User::findOne([
            'email' => $this->email,
            'status' => 1
        ]);

        if ($user === null) {
            return false;
        }

        return true;

        /*return Yii::$app
            ->mailer
            ->compose(
                ['html' => 'emailVerify-html', 'text' => 'emailVerify-text'],
                ['user' => $user]
            )
            ->setFrom([Yii::$app->params['supportEmail'] => Yii::$app->name . ' robot'])
            ->setTo($this->email)
            ->setSubject('Account registration at ' . Yii::$app->name)
            ->send();*/
        
    }

}
