<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "message_file".
 *
 * @property int $id id
 * @property int $message_id id сообщения
 * @property int $file_id id файла
 * @property string $created Дата создания
 *
 * @property File $file
 * @property Message $message
 */
class MessageFile extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'message_file';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['message_id', 'file_id'], 'required'],
            [['message_id', 'file_id'], 'integer'],
            [['created'], 'safe'],
            [['message_id'], 'exist', 'skipOnError' => true, 'targetClass' => Message::className(), 'targetAttribute' => ['message_id' => 'id']],
            [['file_id'], 'exist', 'skipOnError' => true, 'targetClass' => File::className(), 'targetAttribute' => ['file_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id',
            'message_id' => 'id сообщения',
            'file_id' => 'id файла',
            'created' => 'Дата создания',
        ];
    }

    /**
     * Gets query for [[File]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getFile()
    {
        return $this->hasOne(File::className(), ['id' => 'file_id']);
    }

    /**
     * Gets query for [[Message]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMessage()
    {
        return $this->hasOne(Message::className(), ['id' => 'message_id']);
    }
}
