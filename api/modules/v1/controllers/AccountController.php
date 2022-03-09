<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;

class AccountController extends BaseApiController
{
    public $modelClass = 'app\models\Account';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'accounts'
    ];

}
