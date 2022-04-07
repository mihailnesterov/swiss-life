<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "transaction".
 *
 * @property int $id id транзакции
 * @property int $account_id id счета
 * @property int $manager_id id менеджера
 * @property int|null $asset_id id актива 
 * @property int $currency_id id валюты
 * @property int $transaction_type_id id типа транзакции
 * @property int $sum Сумма транзакции
 * @property string $description Описание
 * @property int $status Статус
 * @property string|null $accepted Дата принятия
 * @property string|null $rejected Дата отмены
 * @property string $created Дата создания
 *
 * @property Account $account
 * @property Asset $asset 
 * @property Currency $currency
 * @property User $manager
 * @property TransactionType $transactionType
 */
class Transaction extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'transaction';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['account_id', 'manager_id', 'currency_id', 'transaction_type_id', 'sum'], 'required'],
            [['account_id', 'manager_id', 'asset_id', 'currency_id', 'transaction_type_id', 'sum', 'status'], 'integer'],
            [['accepted', 'rejected', 'created'], 'safe'],
            [['description'], 'string', 'max' => 512],
            [['account_id'], 'exist', 'skipOnError' => true, 'targetClass' => Account::className(), 'targetAttribute' => ['account_id' => 'id']],
            [['currency_id'], 'exist', 'skipOnError' => true, 'targetClass' => Currency::className(), 'targetAttribute' => ['currency_id' => 'id']],
            [['manager_id'], 'exist', 'skipOnError' => true, 'targetClass' => Manager::className(), 'targetAttribute' => ['manager_id' => 'id']],
            [['asset_id'], 'exist', 'skipOnError' => true, 'targetClass' => Asset::className(), 'targetAttribute' => ['asset_id' => 'id']], 
            [['transaction_type_id'], 'exist', 'skipOnError' => true, 'targetClass' => TransactionType::className(), 'targetAttribute' => ['transaction_type_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id транзакции',
            'account_id' => 'id счета',
            'manager_id' => 'id менеджера',
            'asset_id' => 'id актива', 
            'currency_id' => 'id валюты',
            'transaction_type_id' => 'id типа транзакции', 
            'sum' => 'Сумма транзакции',
            'description' => 'Описание',
            'status' => 'Статус',
            'accepted' => 'Дата принятия',
            'rejected' => 'Дата отмены',
            'created' => 'Дата создания',
        ];
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function fields()
    {
        $fields = parent::fields();

        return array_merge($fields, [
            'user' => function () {
                return [
                    'id' => $this->account->user->id,
                    'email' => $this->account->user->email,
                    'fullName' => $this->account->user->lastName . ' ' .  $this->account->user->firstName,
                    'role' => $this->account->user->role,
                ];
            },
            'debit' => function () {
                return $this->sum > 0 ? $this->sum : 0;
            },
            'credit' => function () {
                return $this->sum < 0 ? $this->sum : 0;
            },
            'account' => function () {
                return [
                    'id' => $this->account->id,
                    'user_id' => $this->account->user_id,
                    'currency_id' => $this->account->currency_id,
                    'number' => $this->account->number
                ];
            },
            'type' => function () {
                return [
                    'name' => $this->transactionType->name,
                    'description' => $this->transactionType->description
                ];
            },
            'currency' => function () {
                return [
                    'name' => $this->currency->name,
                    'shortName' => $this->currency->shortName,
                    'sign' => $this->currency->sign,
                    'code' => $this->currency->code
                ];
            },
            'manager' => function () {
                return [
                    'id' => $this->manager->id,
                    'email' => $this->manager->email,
                    'fullName' => $this->manager->lastName . ' ' .  $this->manager->firstName,
                    'role' => $this->manager->role,
                ];
            },
            'asset' => function () {
                return $this->asset;
            },
        ]);
    }

    /**
     * Gets query for [[Account]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAccount()
    {
        return $this->hasOne(Account::className(), ['id' => 'account_id']);
    }

    /** 
    * Gets query for [[Asset]]. 
    * 
    * @return \yii\db\ActiveQuery 
    */ 
    public function getAsset() 
    { 
        return $this->hasOne(Asset::className(), ['id' => 'asset_id']); 
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
     * Gets query for [[Manager]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getManager()
    {
        return $this->hasOne(User::className(), ['id' => 'manager_id']);
    }

    /** 
    * Gets query for [[TransactionType]]. 
    * 
    * @return \yii\db\ActiveQuery 
    */ 
    public function getTransactionType() 
    { 
        return $this->hasOne(TransactionType::className(), ['id' => 'transaction_type_id']); 
    }

    /**
     * Search by query params for [[Transaction]].
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
        
        return new \yii\data\ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'defaultPageSize' => 20,
                'pageSizeLimit' => [0, 20],
            ],
        ]);
    }
}
