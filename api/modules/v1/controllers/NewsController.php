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

    public function actionUpdate_photo()
    {
        if( Yii::$app->request->getBodyParams() ) {
            
            $news_id = Yii::$app->request->getBodyParam('news_id');
            $file_id = Yii::$app->request->getBodyParam('file_id');

            if(!empty($news_id) && !empty($file_id)) {
                
                $newsFile = \app\models\NewsFile::find()->where(['news_id' => $news_id])->one();
                
                if(!empty($newsFile)) {
                    $newsFile->file_id = $file_id;
                    $newsFile->save();
                } else {
                    $model = new \app\models\NewsFile();
                    $model->news_id = $news_id;
                    $model->file_id = $file_id;
                    $model->save();
                }
            }
        }
    }

}
