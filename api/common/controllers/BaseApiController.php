<?php

namespace api\common\controllers;

use Yii;
use yii\rest\ActiveController;

class BaseApiController extends ActiveController
{

    public function checkAccess($action, $model = null, $params = [])
    {
        parent::checkAccess($action, $model, $params);
        /*if ($model && !$model->checkAccess(Yii::$app->user->identity)) {
            throw new \yii\web\ForbiddenHttpException('You do not have access');
        }*/
        return true;
    }

    /**
     * @inheritdoc
     */
    protected function verbs()
    {
        return [
            'index' => ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
        ];
    }

}
