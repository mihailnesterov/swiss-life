<?php

namespace api\modules\v1\controllers;

use Yii;
use api\common\controllers\BaseApiController;
use yii\filters\auth\HttpBasicAuth;

/*use app\models\User;
use app\models\UserIdentity;
use app\models\Login;*/

class UserController extends BaseApiController
{
    public $modelClass = 'app\models\User';

    public function actions()
    {
        return parent::actions();
    }

    public function actionToken()
    {
        return Yii::$app->user->identity->token;
    }

    public function actionAuthorized()
    {
        return \app\models\User::find()->where(['id' => Yii::$app->user->identity->id])->one();
    }

    /*public function actionLogin()
    {
        $email = Yii::$app->request->post('email');
        $password = Yii::$app->request->post('password');
        $user = UserIdentity::findByUsername($email);

        if( isset($user) && !empty($password) && $user->validatePassword($password) ) {
            return $user->token;
        } else {
            throw new \yii\base\ErrorException('Wrong email or password or token is not found.');
        }
    }

    public function actionIndex()
    {
        //$users = Users::getAll();
        $user = Yii::$app->user->identity;
        return $this->asJson($user);
    } 

    private function errorResponse($message) {
                                
        // set response code to 400
        Yii::$app->response->statusCode = 400;
    
        return $this->asJson(['error' => $message]);
    }*/

}
