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

    public function actionSender($id)
    {
        return new \yii\data\ActiveDataProvider([
            'query' => $this->modelClass::find()
                ->orderBy(['created' => SORT_DESC])
                ->where(['sender_id' => $id]),
            'pagination' => $this->pagination,
        ]);
    }

    public function actionReceiver($id)
    {
        return new \yii\data\ActiveDataProvider([
            'query' => $this->modelClass::find()
                ->orderBy(['created' => SORT_DESC])
                ->where(['receiver_id' => $id]),
            'pagination' => $this->pagination,
        ]);
    }

}
