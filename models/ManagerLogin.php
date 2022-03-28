<?php
namespace app\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\ManagerIdentity;

/**
 * Manager Login form
 */
class ManagerLogin extends ManagerIdentity
{

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['email', 'required', 'message' => 'Email не может быть пустым'],
            ['password', 'required', 'message' => 'Пароль не может быть пустым'],
            ['password', 'validatePassword'],
            [['token'], 'string'],
        ];
    }

    public function validatePassword($params)
    {
        if (!$this->hasErrors()) {
            $manager = $this->getManager();

            if (!$manager || !$manager->validatePassword($this->password)) {
                $this->addError('Неправильный логин или пароль');
            }
        }
    }

}
