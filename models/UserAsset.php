<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "user_asset".
 *
 * @property int $id id
 * @property int $user_id id пользователя
 * @property int $asset_id id актива
 * @property int $currency_id Валюта вклада
 * @property int $sum Сумма вклада в актив
 * @property string $created
 *
 * @property Asset $asset
 * @property Currency $currency
 * @property User $user
 */
class UserAsset extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_asset';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'asset_id', 'currency_id'], 'required'],
            [['user_id', 'asset_id', 'currency_id', 'sum'], 'integer'],
            [['created'], 'safe'],
            [['currency_id'], 'exist', 'skipOnError' => true, 'targetClass' => Currency::className(), 'targetAttribute' => ['currency_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
            [['asset_id'], 'exist', 'skipOnError' => true, 'targetClass' => Asset::className(), 'targetAttribute' => ['asset_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id',
            'user_id' => 'id пользователя',
            'asset_id' => 'id актива',
            'currency_id' => 'Валюта вклада',
            'sum' => 'Сумма вклада в актив',
            'created' => 'Created',
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
            $fields['asset_id'],
            $fields['currency_id'],
        );

        return array_merge($fields, [
            'asset' => function () {
                return [
                    'name' => $this->asset->name,
                    'excerpt' => $this->asset->excerpt,
                    'calculation' => $this->asset->calculation,
                ];
            },
            'currency' => function () {
                return [
                    'name' => $this->currency->name,
                    'shortName' => $this->currency->shortName,
                    'sign' => $this->currency->sign,
                ];
            }
        ]);
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
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }
}
