<?php

namespace api\modules\v1\controllers;

use Yii;
use yii\helpers\ArrayHelper;
use app\models\Asset;
use api\common\controllers\BaseApiController;

class AssetController extends BaseApiController
{
    public $modelClass = 'app\models\Asset';

    public function actions()
    {
        $actions = parent::actions();
        
        $actions['index']['prepareDataProvider'] = [$this, 'prepareAssetDataProvider'];
        
        return $actions;
    }

    public function prepareAssetDataProvider() 
    {
        
        if( !empty(Yii::$app->request->queryParams) ) {
            $model = new Asset(); 
            return $model->search(Yii::$app->request->queryParams);
        }

        return Yii::createObject([
            'class' => \yii\data\ActiveDataProvider::className(),
            'query' => Asset::find(),
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

}
