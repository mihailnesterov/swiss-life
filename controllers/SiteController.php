<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;

use app\models\{User, UserLogin, Partner};

class SiteController extends Controller
{
    
    /**
     * {@inheritdoc}
     */
    public function behaviors() {
        return array_merge(parent::behaviors(), [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['login', 'signup', 'logout'],
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
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function actions() {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }
    
    public function actionIndex() {

        $model = new UserLogin();

        if ( $this->isLogin($model) || !Yii::$app->user->isGuest) {  
            if( Yii::$app->user->identity->role === 'admin' ) {
                return $this->redirect(Yii::$app->urlManager->createUrl(['admin']));
            }
            if( Yii::$app->user->identity->role === 'manager' ) {
                return $this->redirect(Yii::$app->urlManager->createUrl(['manager']));
            }             
            return $this->redirect(Yii::$app->urlManager->createUrl(['investor']));
        }
        
        $this->view->title = Yii::$app->name;
        $partners = Partner::find()->asArray()->all();

        return $this->render('index', compact('model', 'partners'));
    }

    public function actionLogin() {
        
        $model = new UserLogin();

        return $this->render('login', compact('model'));
    }

    public function actionError() {
        $exception = Yii::$app->errorHandler->exception;
        if ($exception != null) {
            if ($exception instanceof HttpException) {
                return $this->redirect(['404/'])->send();
            }
        }
        return $this->render('error', compact('exception'));
    }

    private function isLogin( $user ) {
        return $user->load( Yii::$app->request->post()) && $user->login();
    }

}
