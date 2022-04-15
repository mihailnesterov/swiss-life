<?php

namespace app\modules\manager\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;
use yii\helpers\ArrayHelper;
use app\models\User;

/**
 * Default controller for the `manager` module
 */
class DefaultController extends Controller
{

    public static function allowedDomains() {
        return [
            '*',
            //'http://localhost:80',
        ];
    } 
    
    /**
     * {@inheritdoc}
     */
    public function behaviors() {
        return array_merge(parent::behaviors(), [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['login', 'logout', 'signup'], 
                'rules' => [
                    [
                        'actions' => ['login', 'signup'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            /*'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],*/
            'corsFilter'  => [
                'class' => \yii\filters\Cors::className(),
                'cors'  => [
                    'Origin'                           => static::allowedDomains(),
                    'Access-Control-Request-Method'    => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Allow-Credentials' => false,
                    'Access-Control-Max-Age'           => 3600,

                ],
            ],
        ]);
    }

    public function actionIndex() {

        if ( Yii::$app->user->isGuest )
            $this->logout();

        $manager = $this->findUserModel(Yii::$app->user->identity->id);

        $this->view->title = 'Кабинет менеджера';
        
        return $this->render('index',[
            'manager' => $manager
        ]);
    }
 
    public function actionLogout() {
        $this->logout();
    }

    protected function findUserModel($id) {
        if (($model = User::findOne($id)) !== null) {
            return $model;
        }
        throw new NotFoundHttpException('User not found...');
    }

    private function logout() {
        Yii::$app->user->logout();
        return $this->goHome();
    }

    private function loginManager( $manager ) {

        if ($manager) {

            $manager->login();
            
            return $this->redirect(Yii::$app->urlManager->createUrl(['manager']));
           
        } 
    }

}
