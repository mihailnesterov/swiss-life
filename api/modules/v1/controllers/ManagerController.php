<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;

class ManagerController extends BaseApiController
{
    public $modelClass = 'app\models\Manager';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'managers'
    ];

    public function actionToken()
    {
        return Yii::$app->manager->identity->token;
    }

    public function actionAuthorized()
    {
        return $this->modelClass::find()->where(['id' => Yii::$app->manager->identity->id])->one();
    }

    public function actionChange_password($id)
    {
        $newPassword = Yii::$app->request->post('password');

        if( !empty($newPassword) ) {
            
            $manager = $this->findManagerModel($id);           
            $manager->password = Yii::$app->security->generatePasswordHash($newPassword);

            if ( Yii::$app->security->validatePassword($newPassword, $manager->password) ) {
                $manager->auth_key = Yii::$app->security->generateRandomString($lenght = 255);
                $manager->save();
                return $manager->password;
            } else {
                throw new \yii\base\ErrorException('Пароль не прошел валидацию.');
            }

        } else {
            throw new \yii\base\ErrorException('Пароль пуст.');
        }
    }

    public function actionUsers($id)
    {
        return \app\models\User::find()->where(['manager_id' => $id])->all();
    }

    public function actionAccounts($id)
    {
        return new \yii\data\ActiveDataProvider([
            'query' => \app\models\Account::find()
                ->where(['manager_id' => $id])
                ->joinWith('user', false)
        ]);
    }

    public function actionMessages($id)
    {
        return new \yii\data\ActiveDataProvider([
            'query' => \app\models\Message::find()
                ->orderBy(['created' => SORT_DESC])
                ->where(['manager_id' => $id]),
            'pagination' => $this->pagination,
        ]);
    }

    private function findManagerModel($id)
    {
        if (($model = \app\models\Manager::findOne($id)) !== null) {
            return $model;
        }

        throw new \yii\web\NotFoundHttpException("Менеджеер с id=$id не найден.");
    }

}
