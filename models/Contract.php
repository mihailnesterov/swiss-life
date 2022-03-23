<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "contract".
 *
 * @property int $id id договора
 * @property int $file_id id файла
 * @property string $description Описание договора
 * @property string $created Дата создания
 *
 * @property File $file
 */
class Contract extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'contract';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['file_id'], 'required'],
            [['file_id'], 'integer'],
            [['created'], 'safe'],
            [['description'], 'string', 'max' => 255],
            [['file_id'], 'exist', 'skipOnError' => true, 'targetClass' => File::className(), 'targetAttribute' => ['file_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id договора',
            'file_id' => 'id файла',
            'description' => 'Описание договора',
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
