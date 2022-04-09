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

    public function actionUpdate_file()
    {
        if( Yii::$app->request->getBodyParams() ) {
            
            $id = Yii::$app->request->getBodyParam('id');
            $file_id = Yii::$app->request->getBodyParam('file_id');

            if(!empty($id) && !empty($file_id)) {
                
                $contract = \app\models\Contract::find()->where(['id' => $id])->one();
                
                if(!empty($contract)) {
                    $contract->file_id = $file_id;
                    $contract->save();
                } else {
                    $model = new \app\models\Contract();
                    $model->file_id = $file_id;
                    $model->save();
                }

                return $contract;
            }

            return false;
        }
    }
}
