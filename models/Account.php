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
            $fields['currency_id'],
        );

        return array_merge($fields, [
            'balance' => function () { // текущий баланс
                return floatval(
                    $this->getTransactions()
                        ->where(['in', 'transaction_type_id', [1,3,7,8,9]])
                        // 1 = депозит
                        // 3 = пополнение счета
                        // 7 = инвестиция в актив
                        // 8 = кредит
                        // 9 = погашение кредита
                        ->andWhere(["status" => 1])
                        ->sum('sum')
                );
            },
            'profit' => function () { // накопленные средства
                return floatval(
                    $this->getTransactions()
                    ->where(['in', 'transaction_type_id', [2,4,5,6,9,10]])
                    // 2 = комиссия за обслуживание
                    // 4 = перевод
                    // 5 = начисление прибыли
                    // 6 = вывод средств
                    // 9 = погашение кредита
                    // 10 = банковский перевод
                    ->andWhere(["status" => 1])
                    ->sum('sum')
                );
            },
            'credit' => function () { // кредитный баланс
                return floatval(
                    $this->getTransactions()
                    ->where(['in', 'transaction_type_id', [8,9]])
                    // 8 = кредит
                    // 9 = погашение кредита
                    ->andWhere(["status" => 1])
                    ->sum('sum')
                );
            },
            'currency' => function () {
                return [
                    'id' => $this->currency->id,
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
                $countNotAccepted = $this->getTransactions()
                    ->where(["status" => 0])
                    ->count();
                $sumNotAccepted = $this->getTransactions()
                    ->where(["status" => 0])
                    ->sum('sum');
                
                return compact( 
                    'countAll', 
                    'sumAll', 
                    'countNotAccepted', 
                    'sumNotAccepted'
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

    /**
     * Search by query params for [[Account]].
     *
     * @param Object $params
     * @return \yii\db\ActiveQuery
     */
    public function search($params)
    {
        $query = $this::find();
        
        foreach ($params as $param => $value) {
            $query->orFilterWhere([
                'like', $param, $value
            ]);
        }
        
        $activeData = new \yii\data\ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'defaultPageSize' => 20,
                'pageSizeLimit' => [0, 20],
            ],
        ]);
        
        return $activeData;
    }
}
