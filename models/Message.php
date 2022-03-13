<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "message".
 *
 * @property int $id id сообщения
 * @property int $user_id id пользователя
 * @property int $manager_id id менеджера
 * @property int|null $parent_id id родительского сообщения
 * @property string $theme Тема сообщения
 * @property string $text Текст сообщения
 * @property int $isRead Прочитано
 * @property string $created Дата создания сообщения
 *
 * @property Manager $manager
 * @property MessageFile[] $messageFiles
 * @property User $user
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
            [['user_id', 'manager_id', 'theme', 'text'], 'required'],
            [['user_id', 'manager_id', 'parent_id', 'isRead'], 'integer'],
            [['text'], 'string'],
            [['created'], 'safe'],
            [['theme'], 'string', 'max' => 255],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
            [['manager_id'], 'exist', 'skipOnError' => true, 'targetClass' => Manager::className(), 'targetAttribute' => ['manager_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id сообщения',
            'user_id' => 'id пользователя',
            'manager_id' => 'id менеджера',
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
            'messageFiles' => function () {
                return $this->messageFiles;
            }
        ]);
    }

    /**
     * Gets query for [[Manager]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getManager()
    {
        return $this->hasOne(Manager::className(), ['id' => 'manager_id']);
    }

    /**
     * Gets query for [[MessageFiles]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMessageFiles()
    {
        //return $this->hasMany(MessageFile::className(), ['message_id' => 'id']);
        return $this->hasMany(File::className(), ['id' => 'file_id'])->viaTable('message_file', ['message_id' => 'id']);
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
