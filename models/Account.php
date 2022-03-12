<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "account".
 *
 * @property int $id id счета
 * @property int $user_id id пользователя
 * @property int $currency_id id валюты
 * @property string $number Номер счета
 * @property int $contractSum Сумма контракта
 * @property int $depositSum Сумма депозита
 * @property string $created Дата создания счета
 *
 * @property Currency $currency
 * @property Transaction[] $transactions
 * @property User $user
 */
class Account extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'account';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'currency_id', 'number'], 'required'],
            [['user_id', 'currency_id', 'contractSum', 'depositSum'], 'integer'],
            [['created'], 'safe'],
            [['number'], 'string', 'max' => 19],
            [['number'], 'unique'],
            [['currency_id'], 'exist', 'skipOnError' => true, 'targetClass' => Currency::className(), 'targetAttribute' => ['currency_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id счета',
            'user_id' => 'id пользователя',
            'currency_id' => 'id валюты',
            'number' => 'Номер счета',
            'contractSum' => 'Сумма контракта',
            'depositSum' => 'Сумма депозита',
            'created' => 'Дата создания счета',
        ];
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function fields()
    {
        $fields = parent::fields();

        unset(
            $fields['user_id'], 
            $fields['currency_id'],
        );

        return array_merge($fields, [
            'balance' => function () {
                return floatval($this->getTransactions()->sum('sum'));
            },
            'profit' => function () {
                return floatval($this->getTransactions()->where(['transaction_type_id' => 5])->sum('sum'));
            },
            'currency' => function () {
                return [
                    'name' => $this->currency->name,
                    'shortName' => $this->currency->shortName,
                    'sign' => $this->currency->sign,
                    'code' => $this->currency->code,
                ];
            },
            'transactions' => function () {
                return $this->getTransactions()->orderBy(['created' => SORT_DESC])->all();
            },
            'transactionsStat' => function () {
                
                $countAll = $this->getTransactions()
                    ->count();
                $sumAll = $this->getTransactions()
                    ->sum('sum');
                $countAccepted = $this->getTransactions()
                    ->where('accepted IS NOT NULL')
                    ->count();
                $sumAccepted = $this->getTransactions()
                    ->where('accepted IS NOT NULL')
                    ->sum('sum');
                
                return compact( 
                    'countAll', 
                    'sumAll', 
                    'countAccepted', 
                    'sumAccepted'
                );
            }
        ]);
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function extraFields()
    {
        return [
            //'currency',
            'transactions',
            'user'
        ];
    }

    /**
     * Gets query for [[Currency]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCurrency()
    {
        return $this->hasOne(Currency::className(), ['id' => 'currency_id']);
    }

    /**
     * Gets query for [[Transactions]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTransactions()
    {
        return $this->hasMany(Transaction::className(), ['account_id' => 'id']);
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }
}
