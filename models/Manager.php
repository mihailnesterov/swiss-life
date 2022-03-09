<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "manager".
 *
 * @property int $id id менеджера
 * @property int $company_id id компании
 * @property string $email Email менеджера
 * @property string $password Пароль менеджера
 * @property string|null $auth_key Authentication Key
 * @property string $firstName Имя
 * @property string $lastName Фамилия
 * @property string $role Роль менеджера
 * @property int $status Статус активен/неактивен
 * @property string $created Дата создания профиля
 *
 * @property Company $company
 * @property Message[] $messages
 * @property Transaction[] $transactions
 * @property User[] $users
 */
class Manager extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'manager';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        /*return [
            [['company_id', 'email', 'password', 'auth_key', 'firstName', 'lastName'], 'required'],
            [['company_id', 'status'], 'integer'],
            [['created'], 'safe'],
            [['email', 'password', 'firstName', 'lastName', 'role'], 'string', 'max' => 100],
            [['auth_key'], 'string', 'max' => 255],
            [['email'], 'unique'],
            [['company_id'], 'exist', 'skipOnError' => true, 'targetClass' => Company::className(), 'targetAttribute' => ['company_id' => 'id']],
        ];*/
        return [
            [['email', 'password', 'firstName', 'lastName'], 'required'],
            [['company_id'], 'integer'],
            [['status'], 'boolean'],
            [['created'], 'safe'],
            [['email', 'password', 'firstName', 'lastName', 'role'], 'string', 'max' => 100],
            [['auth_key'], 'string', 'max' => 255],
            [['email'], 'unique'],
            [['company_id'], 'exist', 'skipOnError' => true, 'targetClass' => Company::className(), 'targetAttribute' => ['company_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id менеджера',
            'company_id' => 'id компании',
            'email' => 'Email менеджера',
            'password' => 'Пароль менеджера',
            'auth_key' => 'Authentication Key',
            'firstName' => 'Имя',
            'lastName' => 'Фамилия',
            'role' => 'Роль менеджера',
            'status' => 'Статус активен/неактивен',
            'created' => 'Дата создания профиля',
        ];
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function fields()
    {
        $fields = parent::fields();

        unset(
            $fields['company_id'], 
            $fields['password'],
            $fields['auth_key']
        );

        return array_merge($fields, [
            'fullName' => function () {
                return "$this->lastName $this->firstName";
            },
        ]);
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function extraFields()
    {
        return [
            'users',
            'messages',
            'transactions',
        ];
    }

    /**
     * Gets query for [[Company]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCompany()
    {
        return $this->hasOne(Company::className(), ['id' => 'company_id']);
    }

    /**
     * Gets query for [[Messages]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMessages()
    {
        return $this->hasMany(Message::className(), ['manager_id' => 'id']);
    }

    /**
     * Gets query for [[Transactions]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTransactions()
    {
        return $this->hasMany(Transaction::className(), ['manager_id' => 'id']);
    }

    /** 
    * Gets query for [[Users]]. 
    * 
    * @return \yii\db\ActiveQuery 
    */ 
    public function getUsers() 
    { 
        return $this->hasMany(User::className(), ['manager_id' => 'id']); 
    }
}
