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
            'balance' => function () {
                return floatval(
                    $this->getTransactions()
                        ->where(['transaction_type_id' => 1]) // 1 = депозит
                        ->orWhere(['transaction_type_id' => 3]) // 3 = пополнение счета
                        ->orWhere(['transaction_type_id' => 4]) // 4 = перевод
                        ->sum('sum')
                );
            },
            'profit' => function () {
                return floatval(
                    $this->getTransactions()
                    ->where(['transaction_type_id' => 4]) // 4 = перевод
                    ->orWhere(['transaction_type_id' => 5]) // 5 = начисление прибыли
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
                    ->where('accepted IS NULL')
                    ->count();
                $sumNotAccepted = $this->getTransactions()
                    ->where('accepted IS NULL')
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
