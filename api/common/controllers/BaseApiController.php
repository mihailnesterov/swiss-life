<?php

namespace api\common\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\helpers\ArrayHelper;
use yii\web\BadRequestHttpException;
use yii\data\ActiveDataProvider;

class BaseApiController extends ActiveController
{
    private $reservedParams = ['sort','q'];
    
    /**
     * @inheritdoc
     */
    protected function verbs()
    {
        return [
            'index' => ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
        ];
    }

    protected $pagination = [
        'defaultPageSize' => 20,
        'pageSizeLimit' => [0, 20],
    ];

    public function checkAccess($action, $model = null, $params = [])
    {
        parent::checkAccess($action, $model, $params);
        /*if ($model && !$model->checkAccess(Yii::$app->user->identity)) {
            throw new \yii\web\ForbiddenHttpException('You do not have access');
        }*/
        return true;
    }

    public function prepareBaseApiDataProvider() 
    {
        // https://stackoverflow.com/questions/25522462/yii2-rest-query
        $params = Yii::$app->request->queryParams;
        
        if( !empty($params) ) {
            
            $model = new $this->modelClass;
            $modelAttr = $model->attributes;
            $search = [];

            if (!empty($params)) {
                foreach ($params as $key => $value) {
                    if(!is_scalar($key) or !is_scalar($value)) {
                        throw new BadRequestHttpException('Bad Request');
                    }
                    if ( !in_array(strtolower($key), $this->reservedParams) && 
                         ArrayHelper::keyExists($key, $modelAttr, false) ) {
                        $search[$key] = $value;
                    }
                }
            }

            return $model->search($search);
        }

        return Yii::createObject([
            'class' => ActiveDataProvider::className(),
            'query' => $this->modelClass::find(),
        ]);
    }
}
