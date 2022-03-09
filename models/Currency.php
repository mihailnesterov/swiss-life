<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "currency".
 *
 * @property int $id id валюты
 * @property string $name Название валюты
 * @property string $shortName Короткое название валюты
 * @property string $sign Знак валюты
 * @property int $code Код валюты
 *
 * @property Account[] $accounts
 * @property Transaction[] $transactions
 * @property UserAsset[] $userAssets
 */
class Currency extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'currency';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'shortName', 'code'], 'required'],
            [['code'], 'integer'],
            [['name'], 'string', 'max' => 100],
            [['shortName'], 'string', 'max' => 10],
            [['sign'], 'string', 'max' => 1],
            [['name'], 'unique'],
            [['shortName'], 'unique'],
            [['sign'], 'unique'],
            [['code'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id валюты',
            'name' => 'Название валюты',
            'shortName' => 'Короткое название валюты',
            'sign' => 'Знак валюты',
            'code' => 'Код валюты',
        ];
    }

    /**
     * Gets query for [[Accounts]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAccounts()
    {
        return $this->hasMany(Account::className(), ['currency_id' => 'id']);
    }

    /**
     * Gets query for [[Transactions]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTransactions()
    {
        return $this->hasMany(Transaction::className(), ['currency_id' => 'id']);
    }

    /**
     * Gets query for [[UserAssets]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUserAssets()
    {
        return $this->hasMany(UserAsset::className(), ['currency_id' => 'id']);
    }
}
