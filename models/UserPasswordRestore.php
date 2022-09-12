<?php
namespace app\models;

use Yii;
use app\models\{User, UserIdentity};

/**
 * User Password Restore form
 */
class UserPasswordRestore extends UserIdentity
{

    /**
     * One-time code for password restore.
     */
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

    /**
     * Validates user's email
     */
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
     * Sends one time code on user's email
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

        Yii::$app->mailer->getView()->params['fullName'] = "$user->firstName $user->lastName";
        Yii::$app->mailer->getView()->params['code'] = $this->oneTimeCode;
        
        $isEmailSent = Yii::$app->mailer->compose([
            'html' => 'one-time-code-html',
            'text' => 'one-time-code-text',
        ],
        [
            'fullName' => "$user->firstName $user->lastName",
            'code' => $this->oneTimeCode,
        ])
        ->setFrom([Yii::$app->params['email'] => Yii::$app->name])
        ->setTo($user->email)
        ->setSubject(Yii::t('app', 'Одноразовый код для смены пароля'))
        ->send();

        Yii::$app->mailer->getView()->params['fullName'] = null;
        Yii::$app->mailer->getView()->params['code'] = null;

        return $isEmailSent;
        
    }
}
