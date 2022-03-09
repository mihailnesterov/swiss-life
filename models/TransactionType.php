<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "transaction_type".
 *
 * @property int $id id
 * @property string $name Название
 * @property string $description Описание
 * @property string $created Дата создания
 *
 * @property Transaction[] $transactions
 */
class TransactionType extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'transaction_type';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'description'], 'required'],
            [['description'], 'string'],
            [['created'], 'safe'],
            [['name'], 'string', 'max' => 255],
            [['name'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id',
            'name' => 'Название',
            'description' => 'Описание',
            'created' => 'Дата создания',
        ];
    }

    /**
     * Gets query for [[Transactions]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTransactions()
    {
        return $this->hasMany(Transaction::className(), ['transaction_type_id' => 'id']);
    }
}
