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

    /*
     * After order save
     */
    public function afterSave($insert, $changedAttributes) {
        parent::afterSave($insert, $changedAttributes);
        
        if ($insert) {
            // if new order

            $receivers = Yii::$app->params['company']['emails'];

            foreach($receivers as $receiver) {

                Yii::$app->mailer->getView()->params['name'] = $this->name;
                Yii::$app->mailer->getView()->params['email'] = $this->email;
                Yii::$app->mailer->getView()->params['phone'] = $this->phone;
                Yii::$app->mailer->getView()->params['address'] = $this->address;
                Yii::$app->mailer->getView()->params['business'] = $this->business;
                Yii::$app->mailer->getView()->params['first_payment'] = $this->first_payment;
                Yii::$app->mailer->getView()->params['contract_amount'] = $this->contract_amount;
                
                Yii::$app->mailer->compose([
                    'html' => 'order-html',
                    'text' => 'order-text',
                ],
                [
                    'name' => $this->name,
                    'email' => $this->email,
                    'phone' => $this->phone,
                    'address' => $this->address,
                    'business' => $this->business,
                    'first_payment' => $this->first_payment,
                    'contract_amount' => $this->contract_amount,
                ])
                ->setFrom([Yii::$app->params['email'] => Yii::$app->name])
                ->setTo($receiver)
                ->setSubject(Yii::t('app', 'Заявка от') . ': ' . $this->name)
                ->send();

                Yii::$app->mailer->getView()->params['name'] = null;
                Yii::$app->mailer->getView()->params['email'] = null;
                Yii::$app->mailer->getView()->params['phone'] = null;
                Yii::$app->mailer->getView()->params['address'] = null;
                Yii::$app->mailer->getView()->params['business'] = null;
                Yii::$app->mailer->getView()->params['first_payment'] = null;
                Yii::$app->mailer->getView()->params['contract_amount'] = null;

            }

        } else {
            // if updates order
            
        }
    }
}
