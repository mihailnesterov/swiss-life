<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;
use yii\helpers\ArrayHelper;

class TransactionController extends BaseApiController
{
    public $modelClass = 'app\models\Transaction';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'transactions'
    ];

    public function actions()
    {
        $actions = parent::actions();

        $actions['index']['prepareDataProvider'] = [$this, 'prepareTransactionsDataProvider'];

        return $actions;
    }

    public function prepareTransactionsDataProvider()
    {
        return Yii::createObject([
            'class' => \yii\data\ActiveDataProvider::className(),
            'query' => \app\models\Transaction::find()->orderBy(['created' => SORT_DESC]),
        ]);
    }

    public function actionUser($id)
    {
        $activeData = new \yii\data\ActiveDataProvider([
            'query' => \app\models\Transaction::find()
                ->orderBy(['created' => SORT_DESC])
                ->joinWith('account')
                ->where(['user_id' => $id]),
            'pagination' => [
                'defaultPageSize' => 20,
                'pageSizeLimit' => [0, 20],
            ],
        ]);
        
        return $activeData;
    }

}
