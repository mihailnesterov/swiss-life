<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "company".
 *
 * @property int $id id компании
 * @property string $name Название компании
 * @property string $email Email компании
 * @property string $phone Телефон компании
 * @property string $created Дата регистрации
 *
 * @property Asset[] $assets
 * @property Manager[] $managers
 * @property News[] $news
 * @property Partner[] $partners
 */
class Company extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'company';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'email', 'phone'], 'required'],
            [['created'], 'safe'],
            [['name'], 'string', 'max' => 255],
            [['email', 'phone'], 'string', 'max' => 100],
            [['name'], 'unique'],
            [['email'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id компании',
            'name' => 'Название компании',
            'email' => 'Email компании',
            'phone' => 'Телефон компании',
            'created' => 'Дата регистрации',
        ];
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function fields()
    {
        $fields = parent::fields();

        unset(
            $fields['created']
        );

        return $fields;
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function extraFields()
    {
        return [
            'assets',
            'partners'
        ];
    }

    /**
     * Gets query for [[Assets]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAssets()
    {
        return $this->hasMany(Asset::className(), ['company_id' => 'id']);
    }

    /** 
    * Gets query for [[News]]. 
    * 
    * @return \yii\db\ActiveQuery 
    */ 
    public function getNews() 
    { 
        return $this->hasMany(News::className(), ['company_id' => 'id']); 
    } 

    /**
    * Gets query for [[Partners]].
    *
    * @return \yii\db\ActiveQuery
    */
    public function getPartners()
    {
        return $this->hasMany(Partner::className(), ['company_id' => 'id']);
    }
}
