<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;

class MessageController extends BaseApiController
{
    public $modelClass = 'app\models\Message';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'messages'
    ];

    public function actions()
    {
        $actions = parent::actions();
        
        $actions['index']['prepareDataProvider'] = [$this, 'prepareBaseApiDataProvider'];
        
        return $actions;
    }

    public function actionUser($id)
    {
        $activeData = new \yii\data\ActiveDataProvider([
            'query' => $this->modelClass::find()
                ->orderBy(['created' => SORT_DESC])
                ->where(['user_id' => $id]),
            'pagination' => $this->pagination,
        ]);
        
        return $activeData;
    }

    public function actionManager($id)
    {
        $activeData = new \yii\data\ActiveDataProvider([
            'query' => $this->modelClass::find()
                ->orderBy(['created' => SORT_DESC])
                ->where(['manager_id' => $id]),
            'pagination' => $this->pagination,
        ]);
        
        return $activeData;
    }

}
