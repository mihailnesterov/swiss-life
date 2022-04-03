<?php

namespace api\modules\v1\controllers;

use Yii;
use yii\helpers\Url;
use api\common\controllers\BaseApiController;

class FileController extends BaseApiController
{
    public $modelClass = 'app\models\File';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'files'
    ];

    public function actionCreate_folder()
    {        
        return $this->getUploadsPath();
    }

    public function actionUpload() {
        if( Yii::$app->request->getBodyParams() ) {
            $data = Yii::$app->request->getBodyParam('data');
            $name = Yii::$app->request->getBodyParam('name');
            $ext = Yii::$app->request->getBodyParam('ext');

            $fileName = $this->getUploadsPath() . "/$name.$ext";

            if( file_put_contents($fileName, file_get_contents($data)) ) {
                $model = new \app\models\File();
                $model->name = $name;
                $model->extention = $ext;
                $model->save();
                
                return $model;
            }

            return false;
        }
    }

    private function getUploadsPath()
    {
        $uploadsPath = Yii::$app->basePath . "/web/uploads/" . $this->getCurrentDateAsString();
        $this->createUploadsFolder($uploadsPath);
        
        return $uploadsPath;
    }

    private function getCurrentDateAsString()
    {
        date_default_timezone_set('Europe/Moscow');
        $date = new \DateTime();
        $day = $date->format('d');
        $month = $date->format('m');
        $year = $date->format('Y');
        
        return "$year/$month/$day";
    }

    private function createUploadsFolder($uploadsPath)
    {
        if (!file_exists($uploadsPath)) {
            mkdir($uploadsPath, 0777, true);
        }
    }
}
