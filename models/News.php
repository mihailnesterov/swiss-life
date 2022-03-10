<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "news".
 *
 * @property int $id id новости
 * @property int $company_id id компании
 * @property string $title Заголовок
 * @property string $excerpt Анонс
 * @property string $text Текст
 * @property string $created Дата создания
 *
 * @property Company $company
 * @property NewsFile[] $newsFiles
 */
class News extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'news';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title', 'excerpt', 'text'], 'required'],
            [['company_id'], 'integer'],
            [['text'], 'string'],
            [['created'], 'safe'],
            [['title'], 'string', 'max' => 255],
            [['excerpt'], 'string', 'max' => 512],
            [['company_id'], 'exist', 'skipOnError' => true, 'targetClass' => Company::className(), 'targetAttribute' => ['company_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id новости',
            'company_id' => 'id компании',
            'title' => 'Заголовок',
            'excerpt' => 'Анонс',
            'text' => 'Текст',
            'created' => 'Дата создания',
        ];
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function fields()
    {
        $fields = parent::fields();

        unset($fields['company_id']);

        return array_merge($fields, [
            'newsFiles' => function () {
                return $this->newsFiles;
            }
        ]);
    }

    /**
     * Gets query for [[Company]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCompany()
    {
        return $this->hasOne(Company::className(), ['id' => 'company_id']);
    }

    /**
     * Gets query for [[NewsFiles]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getNewsFiles()
    {
        return $this->hasMany(File::className(), ['id' => 'file_id'])->viaTable('news_file', ['news_id' => 'id']);
        //return $this->hasMany(NewsFile::className(), ['news_id' => 'id']);
    }
}
