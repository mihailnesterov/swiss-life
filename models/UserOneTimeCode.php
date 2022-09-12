<?php
namespace app\models;

use Yii;
use app\models\UserIdentity;

/**
 * User One-time Code form
 */
class UserOneTimeCode extends UserIdentity
{

    public $code;

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['code', 'required', 'message' => Yii::t('app', 'Код не может быть пустым')],
            ['code', 'validateCode'],
        ];
    }

    public function validateCode()
    {
        if (!$this->hasErrors()) {
            if( Yii::$app->request->cookies->has('_swiss_life_one_time_code') ) {
                $cookie = Yii::$app->getRequest()->getCookies()->getValue('_swiss_life_one_time_code');
                
                if ($this->code !== $cookie) {
                    $this->addError(Yii::t('app', 'Введен неверный код'));
                }
            }
        }
    }

}
