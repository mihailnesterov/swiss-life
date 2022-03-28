<?php
		
/*
* user identity model
 * 
 */
namespace app\models;

use Yii;
use yii\behaviors\TimestampBehavior;

/**
* This is the model class for table "user".
*
* @property string $email email пользователя
* @property string $password пароль пользователя
* @property boolean $rememberMe запомнить меня
*/
class UserIdentity extends \yii\db\ActiveRecord  implements \yii\web\IdentityInterface
{ 
   /** 
    * {@inheritdoc} 
    */ 
    
    private $_user; 
    public $rememberMe = true;
    
    public static function tableName() 
    {
        return '{{%user}}'; 
    } 

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            TimestampBehavior::className(),
        ];
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function rules() 
    { 
        return [ 
            ['email', 'email'],
            ['email', 'string', 'min' => 8, 'max' => 100],
            ['rememberMe', 'boolean'],
            
            ['email', 'required', 'message' => 'Email не может быть пустым'],
            ['password', 'required', 'message' => 'Пароль не может быть пустым'],
            ['password', 'string', 'min' => 8, 'max' => 100, 'tooShort' => 'Длина пароля не минее 8 символов'],
        ]; 
    } 

    /** 
     * {@inheritdoc} 
     */ 
    public function attributeLabels() 
    { 
        return [ 
            'email' => 'Email', 
            'password' => 'Пароль',
            'rememberMe' => 'Запомнить меня',
        ]; 
    }

    public function setPassword($password)
    {
        $this->password = Yii::$app->security->generatePasswordHash($password);
    }
    
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }
    
    public function getId()
    {
        return $this->id;
    }
    
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['token' => $token]);
    }
    
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }
    
    /**
     * Generates "remember me" authentication key
     */
    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }

    /**
     * Generates access_token
     */
    public function generateAccessToken()
    {
        $this->token = Yii::$app->security->generateRandomString();
    }

    public function login()
    {
        if ($this->validate()) {
            return Yii::$app->user->login($this->getUser(), $this->rememberMe ? 3600*24*30 : 0);
        }
        else {
            return false;
        }
    }

    protected function getUser()
    {
        if ($this->_user === null) {
            $this->_user = UserIdentity::findByEmail($this->email);
        }

        return $this->_user;
    }

    public static function findByEmail($email)
    {
        return static::findOne(['email' => $email]);
    }

    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password);
    }

} 
