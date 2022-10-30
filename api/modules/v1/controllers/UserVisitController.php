<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;

class UserVisitController extends BaseApiController
{
    public $modelClass = 'app\models\UserVisit';

    public function actions()
    {
        $actions = parent::actions();

        $actions['index']['prepareDataProvider'] = [$this, 'prepareUserVisitDataProvider'];

        return $actions;
    }

    public function prepareUserVisitDataProvider()
    {
        return new \yii\data\ActiveDataProvider([
            'query' => $this->modelClass::find()->orderBy(['created' => SORT_DESC])
        ]);
    }
}
