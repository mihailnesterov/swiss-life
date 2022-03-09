<?php
namespace app\models;

use Yii;
use yii\base\Model;
//use yii\data\ActiveDataProvider;
use app\models\UserIdentity;

/**
 * Signup model
 */
class Signup extends UserIdentity
{
    
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['email', 'required', 'message' => 'Email не может быть пустым'],
            ['password', 'required', 'message' => 'Пароль не может быть пустым'],
            ['password', 'string', 'min' => 8, 'max' => 100, 'tooShort' => 'Длина пароля не минее 8 символов'],
            ['email', 'unique', 'targetClass' => Signup::className(), 'message' => 'Пользователь с таким email уже существует'],
        ];
    }
   
}
