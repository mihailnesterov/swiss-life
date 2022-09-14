<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "order_account".
 *
 * @property int $id id заказа
 * @property string|null $name ФИО
 * @property string|null $email Email
 * @property string|null $address Адрес
 * @property string|null $phone Телефон
 * @property string|null $business Вид деятельности
 * @property int $first_payment Первоначальный взнос
 * @property int $contract_amount Сумма контракта
 * @property string $created Дата создания
 */
class OrderAccount extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'order_account';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['first_payment', 'contract_amount'], 'integer'],
            [['created'], 'safe'],
            [['name', 'business'], 'string', 'max' => 255],
            [['email'], 'string', 'max' => 64],
            [['email'], 'email'],
            [['address'], 'string', 'max' => 512],
            [['phone'], 'string', 'max' => 32],
            ['name', 'required', 'message' => Yii::t('app', 'ФИО не может быть пустым')],
            ['email', 'required', 'message' => Yii::t('app', 'Email не может быть пустым')],
            ['phone', 'required', 'message' => Yii::t('app', 'Телефон не может быть пустым')],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id заказа',
            'name' => 'ФИО',
            'email' => 'Email',
            'address' => 'Адрес',
            'phone' => 'Телефон',
            'business' => 'Вид деятельности',
            'first_payment' => 'Первоначальный взнос',
            'contract_amount' => 'Сумма контракта',
            'created' => 'Дата создания',
        ];
    }
}
