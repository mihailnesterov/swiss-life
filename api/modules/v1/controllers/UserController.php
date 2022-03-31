<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;
use app\models\User;

class UserController extends BaseApiController
{
    public $modelClass = 'app\models\User';

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'users'
    ];

    public function actions()
    {
        $actions = parent::actions();
        
        $actions['index']['prepareDataProvider'] = [$this, 'prepareBaseApiDataProvider'];
        
        return $actions;
    }

    public function actionToken()
    {
        return Yii::$app->user->identity->token;
    }

    public function actionAuthorized()
    {
        return $this->modelClass::find()->where(['id' => Yii::$app->user->identity->id])->one();
    }

    public function actionMembers($id)
    {
        return $this->modelClass::find()->where(['parent_id' => $id])->all();
    }

    public function actionChange_password($id)
    {
        $newPassword = Yii::$app->request->post('password');

        if( !empty($newPassword) ) {
            
            $user = $this->findUserModel($id);           
            $user->password = Yii::$app->security->generatePasswordHash($newPassword);

            if ( Yii::$app->security->validatePassword($newPassword, $user->password) ) {
                $user->auth_key = Yii::$app->security->generateRandomString($lenght = 255);
                $user->token = Yii::$app->security->generateRandomString($lenght = 20);
                $user->save();
                return $user->password;
            } else {
                throw new \yii\base\ErrorException('Пароль не прошел валидацию.');
            }

        } else {
            throw new \yii\base\ErrorException('Пароль пуст.');
        }
    }

    private function findUserModel($id)
    {
        if (($model = \app\models\User::findOne($id)) !== null) {
            return $model;
        }

        throw new \yii\web\NotFoundHttpException("Пользователь с id=$id не найден.");
    }

}
