<?php

namespace api\modules\v1\controllers;

use Yii;
use yii\helpers\ArrayHelper;
use app\models\Asset;
use api\common\controllers\BaseApiController;

class AssetController extends BaseApiController
{
    public $modelClass = 'app\models\Asset';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'assets'
    ];

    public function actions()
    {
        $actions = parent::actions();
        
        $actions['index']['prepareDataProvider'] = [$this, 'prepareAssetDataProvider'];
        
        return $actions;
    }

    public function prepareAssetDataProvider() 
    {
        
        if( !empty(Yii::$app->request->queryParams) ) {
            $model = new $this->modelClass; 
            return $model->search(Yii::$app->request->queryParams);
        }

        return Yii::createObject([
            'class' => \yii\data\ActiveDataProvider::className(),
            'query' => Asset::find()
                ->orderBy(['created' => SORT_DESC]),
        ]);
    }

    public function actionCategories()
    {
        $categories = Asset::find()
            ->select('category')
            ->groupBy('category')
            ->orderBy(['category' => SORT_ASC])
            ->all();
        
        return ArrayHelper::getColumn($categories, 'category');
    }

    public function actionUpdate_photo()
    {
        if( Yii::$app->request->getBodyParams() ) {
            
            $asset_id = Yii::$app->request->getBodyParam('asset_id');
            $file_id = Yii::$app->request->getBodyParam('file_id');

            if(!empty($asset_id) && !empty($file_id)) {
                
                $assetFile = \app\models\AssetFile::find()->where(['asset_id' => $asset_id])->one();
                
                if(!empty($assetFile)) {
                    $assetFile->file_id = $file_id;
                    $assetFile->save();
                } else {
                    $model = new \app\models\AssetFile();
                    $model->asset_id = $asset_id;
                    $model->file_id = $file_id;
                    $model->save();
                }
            }
        }
    }

}
