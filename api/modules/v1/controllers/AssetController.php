<?php

namespace api\modules\v1\controllers;

use Yii;
use yii\helpers\ArrayHelper;
use app\models\Asset;
use api\common\controllers\BaseApiController;

class AssetController extends BaseApiController
{
    public $modelClass = 'app\models\Asset';

    public function actionCategories()
    {
        $categories = Asset::find()
            ->select('category')
            ->groupBy('category')
            ->orderBy(['category' => SORT_ASC])
            ->all();
        
        return ArrayHelper::getColumn($categories, 'category');
    }

}
