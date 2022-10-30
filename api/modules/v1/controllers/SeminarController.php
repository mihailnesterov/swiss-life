<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;

class SeminarController extends BaseApiController
{
    public $modelClass = 'app\models\Seminar';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'seminars'
    ];

    public function actions()
    {
        $actions = parent::actions();

        $actions['index']['prepareDataProvider'] = [$this, 'prepareSeminarDataProvider'];

        return $actions;
    }

    public function prepareSeminarDataProvider()
    {
        return Yii::createObject([
            'class' => \yii\data\ActiveDataProvider::className(),
            'query' => \app\models\Seminar::find()->orderBy(['created' => SORT_DESC]),
            'pagination' => $this->pagination,
        ]);
    }

    public function actionUpdate_file()
    {
        if( Yii::$app->request->getBodyParams() ) {
            
            $id = Yii::$app->request->getBodyParam('id');
            $file_id = Yii::$app->request->getBodyParam('file_id');

            if(!empty($id) && !empty($file_id)) {
                
                $seminar = \app\models\Seminar::find()->where(['id' => $id])->one();
                
                if(!empty($seminar)) {
                    $seminar->file_id = $file_id;
                    $seminar->save();
                } else {
                    $model = new \app\models\Seminar();
                    $model->file_id = $file_id;
                    $model->save();
                }

                return $seminar;
            }

            return false;
        }
    }
}
