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
        date_default_timezone_set('Europe/Moscow');
        $date = new \DateTime();
        $day = $date->format('d');
        $month = $date->format('m');
        $year = $date->format('Y');
        
        $uploadsPath = Yii::$app->basePath . "/web/uploads/$year/$month/$day";
        
        if (!file_exists($uploadsPath)) {
            mkdir($uploadsPath, 0777, true);
        }
        
        return $uploadsPath;
    }
}
