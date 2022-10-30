<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "user_visit".
 *
 * @property int $id id dbpbnf
 * @property int|null $user_id id пользователя
 * @property string|null $ip_address ip адрес
 * @property string $created Дата визита
 *
 * @property User $user
 */
class UserVisit extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_visit';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id'], 'integer'],
            [['created'], 'safe'],
            [['ip_address'], 'string', 'max' => 15],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id визита',
            'user_id' => 'id пользователя',
            'ip_address' => 'ip адрес',
            'created' => 'Дата визита',
        ];
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
