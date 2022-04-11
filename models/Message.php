<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "message".
 *
 * @property int $id id сообщения
 * @property int $sender_id id отправителя
 * @property int $receiver_id id получателя
 * @property int|null $parent_id id родительского сообщения
 * @property string $theme Тема сообщения
 * @property string $text Текст сообщения
 * @property int $isRead Прочитано
 * @property string $created Дата создания сообщения
 *
 * @property MessageFile[] $messageFiles
 * @property User $receiver
 * @property User $sender
 */
class Message extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'message';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['sender_id', 'receiver_id', 'theme', 'text'], 'required'],
            [['sender_id', 'receiver_id', 'parent_id', 'isRead'], 'integer'],
            [['text'], 'string'],
            [['created'], 'safe'],
            [['theme'], 'string', 'max' => 255],
            [['sender_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['sender_id' => 'id']],
            [['receiver_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['receiver_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id сообщения',
            'sender_id' => 'id отправителя',
            'receiver_id' => 'id получателя',
            'parent_id' => 'id родительского сообщения',
            'theme' => 'Тема сообщения',
            'text' => 'Текст сообщения',
            'isRead' => 'Прочитано',
            'created' => 'Дата создания сообщения',
        ];
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function fields()
    {
        $fields = parent::fields();

        return array_merge($fields, [
            'sender' => function () {
                return [
                    'id' => $this->sender->id,
                    'firstName' => $this->sender->firstName,
                    'lastName' => $this->sender->lastName,
                    'email' => $this->sender->email,
                    'phone' => $this->sender->phone,
                    'role' => $this->sender->role,
                    'status' => $this->sender->status
                ];
            },
            'receiver' => function () {
                return [
                    'id' => $this->receiver->id,
                    'firstName' => $this->receiver->firstName,
                    'lastName' => $this->receiver->lastName,
                    'email' => $this->receiver->email,
                    'phone' => $this->receiver->phone,
                    'role' => $this->receiver->role,
                    'status' => $this->receiver->status
                ];
            },
            'messageFiles' => function () {
                return $this->messageFiles;
            }
        ]);
    }

    /**
     * Gets query for [[MessageFiles]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMessageFiles()
    {
        return $this->hasMany(File::className(), ['id' => 'file_id'])->viaTable('message_file', ['message_id' => 'id']);
    }

    /**
    * Gets query for [[Receiver]].
    *
    * @return \yii\db\ActiveQuery
    */
    public function getReceiver()
    {
        return $this->hasOne(User::className(), ['id' => 'receiver_id']);
    }

    /**
    * Gets query for [[Sender]].
    *
    * @return \yii\db\ActiveQuery
    */
    public function getSender()
    {
        return $this->hasOne(User::className(), ['id' => 'sender_id']);
    }

    /**
     * Search by query params for [[Message]].
     *
     * @param Object $params
     * @return \yii\db\ActiveQuery
     */
    public function search($params)
    {
        $query = $this::find();
        
        foreach ($params as $param => $value) {
            $query->andFilterWhere([
                $param => $value,
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
