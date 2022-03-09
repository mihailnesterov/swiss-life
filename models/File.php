<?php

namespace app\models;

use Yii;
use yii\helpers\Url;

/**
 * This is the model class for table "file".
 *
 * @property int $id id файла
 * @property string $name Имя файла
 * @property string $extention Расширение файла
 * @property string $created Дата создания файла
 *
 * @property AssetFile[] $assetFiles
 * @property MessageFile[] $messageFiles
 * @property NewsFile[] $newsFiles
 * @property UserDocument[] $userDocuments
 * @property UserPhoto[] $userPhotos
 */
class File extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'file';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'extention'], 'required'],
            [['created'], 'safe'],
            [['name'], 'string', 'max' => 255],
            [['extention'], 'string', 'max' => 10],
            [['name'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'id файла',
            'name' => 'Имя файла',
            'extention' => 'Расширение файла',
            'created' => 'Дата создания файла',
        ];
    }

    /** 
     * {@inheritdoc} 
     */ 
    public function fields()
    {
        $fields = parent::fields();

        $base = Url::base(true);
        
        /**
         * Create path from file date. 
         * Exapmle: "2022-01-01 15:12:37" = 2022/01/01
         */
        $datePath = array_reduce(
            explode('-', explode(' ', $this->created)[0]),
            function($acc, $item) {
                return "$acc/$item";
            }
        );

        /**
         * Create field "url" = full path to file
         */
        return array_merge($fields, [
            'url' => function () use ($base, $datePath) {
                return "$base/uploads/$datePath/$this->name.$this->extention";
            },
        ]);
    }

    /**
     * Gets query for [[AssetFiles]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAssetFiles()
    {
        return $this->hasMany(AssetFile::className(), ['file_id' => 'id']);
    }

    /**
     * Gets query for [[MessageFiles]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMessageFiles()
    {
        return $this->hasMany(MessageFile::className(), ['file_id' => 'id']);
    }

    /**
    * Gets query for [[NewsFiles]]. 
    * 
    * @return \yii\db\ActiveQuery 
    */ 
    public function getNewsFiles() 
    { 
        return $this->hasMany(NewsFile::className(), ['file_id' => 'id']); 
    }

    /**
     * Gets query for [[UserDocuments]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUserDocuments()
    {
        return $this->hasMany(UserDocument::className(), ['file_id' => 'id']);
    }

    /**
     * Gets query for [[UserPhotos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUserPhotos()
    {
        return $this->hasMany(UserPhoto::className(), ['file_id' => 'id']);
    }
}
