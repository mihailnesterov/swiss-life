<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;

class ContractController extends BaseApiController
{
    public $modelClass = 'app\models\Contract';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'contracts'
    ];
}
