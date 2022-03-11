<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;

class MessageController extends BaseApiController
{
    public $modelClass = 'app\models\Message';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'messages'
    ];

}
