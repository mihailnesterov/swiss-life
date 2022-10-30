<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "seminar".
 *
 * @property int $id id семинара
 * @property int|null $file_id id файла
 * @property string $name Название семинара
 * @property string|null $description Описание семинара
 * @property string $start_date Дата начала
 * @property string $start_time Время начала
 * @property string $form_link Ссылка на форму
 * @property string $created Дата создания
 *
 * @property File $file
 */
class Seminar extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'seminar';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'start_date', 'start_time', 'form_link'], 'required'],
            [['file_id'], 'integer'],
            [['description', 'form_link'], 'string'],
            [['created'], 'safe'],
            [['name'], 'string', 'max' => 255],
            [['start_date'], 'string', 'max' => 10],
            [['start_time'], 'string', 'max' => 5],
            [['file_id'], 'exist', 'skipOnError' => true, 'targetClass' => File::className(), 'targetAttribute' => ['file_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id семинара',
            'file_id' => 'id файла',
            'name' => 'Название семинара',
            'description' => 'Описание семинара',
            'start_date' => 'Дата начала',
            'start_time' => 'Время начала',
            'form_link' => 'Ссылка на форму',
            'created' => 'Дата создания',
        ];
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function fields()
    {
        $fields = parent::fields();

        unset($fields['file_id']);

        return array_merge($fields, [
            'file' => function () {
                return $this->file;
            }
        ]);
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
}
