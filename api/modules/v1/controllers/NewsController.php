<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;

class NewsController extends BaseApiController
{
    public $modelClass = 'app\models\News';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'news'
    ];

    public function actions()
    {
        $actions = parent::actions();

        $actions['index']['prepareDataProvider'] = [$this, 'prepareNewsDataProvider'];

        return $actions;
    }

    public function prepareNewsDataProvider()
    {
        return Yii::createObject([
            'class' => \yii\data\ActiveDataProvider::className(),
            'query' => \app\models\News::find()->orderBy(['created' => SORT_DESC]),
        ]);
    }

}
