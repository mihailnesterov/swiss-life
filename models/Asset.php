<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "asset".
 *
 * @property int $id id актива
 * @property int $company_id id компании
 * @property string $name Название актива
 * @property string|null $excerpt Краткое описание
 * @property string $description Описание
 * @property string|null $category Категория
 * @property string|null $calculation Калькуляция
 * @property float|null $maximum Исторический максимум 
 * @property float|null $minimum Исторический минимум 
 * @property int $status Статус
 * @property string $created Дата создания актива
 *
 * @property AssetFile[] $assetFiles
 * @property Company $company
 * @property Transaction[] $transactions 
 * @property UserAsset[] $userAssets
 */
class Asset extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'asset';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['company_id'], 'integer'],
            [['name', 'calculation'], 'required'],
            [['description'], 'string'],
            [['status'], 'boolean'],
            [['maximum', 'minimum'], 'number'],
            [['created'], 'safe'],
            [['name', 'category', 'calculation'], 'string', 'max' => 255],
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
            'id' => 'id актива',
            'company_id' => 'id компании',
            'name' => 'Название актива',
            'excerpt' => 'Краткое описание',
            'description' => 'Описание',
            'category' => 'Категория',
            'calculation' => 'Калькуляция',
            'maximum' => 'Исторический максимум', 
            'minimum' => 'Исторический минимум', 
            'status' => 'Статус',
            'created' => 'Дата создания актива',
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
            $fields['created'],
        );

        return array_merge($fields, [
            'assetFiles' => function () {
                return $this->assetFiles;
            }
        ]);
    }

    /**
     * Gets query for [[AssetFiles]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAssetFiles()
    {
        return $this->hasMany(File::className(), ['id' => 'file_id'])->viaTable('asset_file', ['asset_id' => 'id']);
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
    * Gets query for [[Transactions]]. 
    * 
    * @return \yii\db\ActiveQuery 
    */ 
    public function getTransactions() 
    { 
        return $this->hasMany(Transaction::className(), ['asset_id' => 'id']); 
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

    /**
     * Search by query params for [[Asset]].
     *
     * @param Object $params
     * @return \yii\db\ActiveQuery
     */
    public function search($params)
    {
        $query = $this::find();
        
        foreach ($params as $param => $value) {
            $query->orFilterWhere([
                'like', $param, $value
            ]);
        }
        
        return new \yii\data\ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'defaultPageSize' => 20,
                'pageSizeLimit' => [0, 20],
            ],
        ]);
    }
}
