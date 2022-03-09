<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "asset_file".
 *
 * @property int $id id
 * @property int $asset_id id актива
 * @property int $file_id id файла
 * @property string $created Дата создания
 *
 * @property Asset $asset
 * @property File $file
 * @property UserAsset[] $userAssets
 */
class AssetFile extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'asset_file';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['asset_id', 'file_id'], 'required'],
            [['asset_id', 'file_id'], 'integer'],
            [['created'], 'safe'],
            [['asset_id'], 'exist', 'skipOnError' => true, 'targetClass' => Asset::className(), 'targetAttribute' => ['asset_id' => 'id']],
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
            'asset_id' => 'id актива',
            'file_id' => 'id файла',
            'created' => 'Дата создания',
        ];
    }

    /**
     * Gets query for [[Asset]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAsset()
    {
        return $this->hasOne(Asset::className(), ['id' => 'asset_id']);
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
     * Gets query for [[UserAssets]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUserAssets()
    {
        return $this->hasMany(UserAsset::className(), ['asset_id' => 'id']);
    }
}
