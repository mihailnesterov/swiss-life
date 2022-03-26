<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;

class ManagerController extends BaseApiController
{
    public $modelClass = 'app\models\Manager';

    public function actionUsers($id)
    {
        return \app\models\User::find()->where(['manager_id' => $id])->all();
    }

    public function actionAccounts($id)
    {
        return new \yii\data\ActiveDataProvider([
            'query' => \app\models\Account::find()
                ->where(['manager_id' => $id])
                ->joinWith('user', false)
        ]);
    }

    public function actionMessages($id)
    {
        return new \yii\data\ActiveDataProvider([
            'query' => \app\models\Message::find()
                ->orderBy(['created' => SORT_DESC])
                ->where(['manager_id' => $id]),
            'pagination' => $this->pagination,
        ]);
    }

}
