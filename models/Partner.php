<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "partner".
 *
 * @property int $id id партнера
 * @property int $company_id id компании
 * @property string $name Название
 * @property string $description Описание
 * @property string $url Ссылка на сайт партнера
 * @property string $created Дата создания
 *
 * @property Company $company
 */
class Partner extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'partner';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'description', 'url'], 'required'],
            [['company_id'], 'integer'],
            [['description'], 'string'],
            [['created'], 'safe'],
            [['name'], 'string', 'max' => 512],
            [['url'], 'string', 'max' => 255],
            [['company_id'], 'exist', 'skipOnError' => true, 'targetClass' => Company::className(), 'targetAttribute' => ['company_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id партнера',
            'company_id' => 'id компании',
            'name' => 'Название',
            'description' => 'Описание',
            'url' => 'Ссылка на сайт партнера',
            'created' => 'Дата создания',
        ];
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function fields()
    {
        $fields = parent::fields();

        unset(
            $fields['company_id'],
        );

        return $fields;
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
}
