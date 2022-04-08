<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;

class PartnerController extends BaseApiController
{
    public $modelClass = 'app\models\Partner';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'partners'
    ];
}
