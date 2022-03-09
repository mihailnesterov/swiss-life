<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;

class CompanyController extends BaseApiController
{
    public $modelClass = 'app\models\Company';

    const ACTIVE_COMPANY_ID = 1;

    public function actions()
    {
        $actions = parent::actions();

        unset(
            $actions['delete'], 
            $actions['create'] 
        );

        $actions['index']['prepareDataProvider'] = [$this, 'prepareActiveCompanyDataProvider'];

        return $actions;
    }

    public function prepareActiveCompanyDataProvider()
    {
        return Yii::createObject([
            'class' => \yii\data\ActiveDataProvider::className(),
            'query' => \app\models\Company::find()->where(['id' => self::ACTIVE_COMPANY_ID]),
        ]);
    }

}
