<?php

namespace app\controllers;

use Yii;
use yii\filters\{AccessControl, VerbFilter};
use yii\web\{Controller, NotFoundHttpException};

use app\models\{User, UserLogin, UserPasswordRestore, UserOneTimeCode, UserPasswordReset, OrderAccount, Partner};

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

        if ($this->request->isPost) {
            if ($model->load(Yii::$app->request->post()) && $model->login()) {
                if( Yii::$app->user->identity->role === 'admin' ) {
                    return $this->redirect(Yii::$app->urlManager->createUrl(['admin']));
                }
                if( Yii::$app->user->identity->role === 'manager' ) {
                    return $this->redirect(Yii::$app->urlManager->createUrl(['manager']));
                }             
                return $this->redirect(Yii::$app->urlManager->createUrl(['investor']));  
            }
        }

        return $this->render('login', compact('model'));
    }

    public function actionLogout() {
        Yii::$app->user->logout();
    }

    public function actionSignup() {

        if( null !== Yii::$app->request->get('lang') ) {
            Yii::$app->language = Yii::$app->request->get('lang');
        }

        $model = new OrderAccount();

        if ($this->request->isPost) {
            if ($model->load(Yii::$app->request->post()) && $model->validate()) {
                if ( $model->save() )
                    return $this->redirect(Yii::$app->urlManager->createUrl(['thank-you-page', 'lang' => Yii::$app->language]));
            } else {
                Yii::$app->session->setFlash('signup', '<div class="flash error slide-in-right"><h4>' . Yii::t('app', 'Ошибка в заявке') . '</h4></div>');
            }
        }

        return $this->render('signup', compact('model'));
    }

    private function isSignup( $model ) {
        return $model->load(Yii::$app->request->post()) && $model->validate();
    }

    private function loginUser( $user ) {
        if ( ! is_null($user) ) {
            $user->login();
            return $this->redirect(Yii::$app->urlManager->createUrl(['', 'lang' => Yii::$app->language]));
        } 
    }

    public function actionPasswordRestore() {
        
        $model = new UserPasswordRestore();

        if( null !== Yii::$app->request->get('lang') ) {
            Yii::$app->language = Yii::$app->request->get('lang');
        }
        
        $cookie = new \yii\web\Cookie([
            'name' => '_swiss_life_one_time_code',
            'value' => $model->oneTimeCode,
            'expire' => time() + 60 * 60,
        ]);

        Yii::$app->getResponse()->getCookies()->add($cookie); 

        if ($this->request->isPost) {
            if ($model->load(Yii::$app->request->post()) && $model->validate()) {
                if( true === $model->sendCodeOnEmail() ) {
                    return $this->redirect(Yii::$app->urlManager->createUrl(['one-time-code', 'lang' => Yii::$app->language]));
                }
            } else {
                Yii::$app->session->setFlash('password-restore', '<div class="flash error slide-in-right"><h4>' . Yii::t('app', 'Пользователь с таким email не найден') . '</h4></div>');
            }
        }

        return $this->render('password-restore', compact('model'));
    }

    public function actionOneTimeCode() {

        if( ! Yii::$app->request->cookies->has('_swiss_life_restore_password_email') )
            return $this->redirect(Yii::$app->urlManager->createUrl(['login', 'lang' => Yii::$app->language]));
        
        $model = new UserOneTimeCode();

        if( null !== Yii::$app->request->get('lang') ) {
            Yii::$app->language = Yii::$app->request->get('lang');
        }

        Yii::$app->session->setFlash('one-time-code', '<div class="flash success slide-in-right"><h4>' . Yii::t('app', 'Одноразовый код отправлен на указанный email') . '</h4></div>');

        if ($this->request->isPost) {
            
            if ($model->load(Yii::$app->request->post()) && $model->validate()) {
                return $this->redirect(Yii::$app->urlManager->createUrl(['password-reset', 'lang' => Yii::$app->language]));
            } else {
                Yii::$app->session->setFlash('one-time-code', '<div class="flash error slide-in-right"><h4>' . Yii::t('app', 'Введен неверный код') . '</h4></div>');
            }
        }

        return $this->render('one-time-code', compact('model'));
    }

    public function actionPasswordReset() {

        if( ! Yii::$app->request->cookies->has('_swiss_life_restore_password_email') )
            return $this->redirect(Yii::$app->urlManager->createUrl(['login', 'lang' => Yii::$app->language]));
        
        $model = new UserPasswordReset();

        if ($this->request->isPost) {
            if( null !== Yii::$app->request->get('lang') ) {
                Yii::$app->language = Yii::$app->request->get('lang');
            }
            if ($model->load(Yii::$app->request->post()) && $model->validate()) {
                $model->resetPassword();
                return $this->redirect(Yii::$app->urlManager->createUrl(['login', 'lang' => Yii::$app->language]));
            } else {
                Yii::$app->session->setFlash('password-reset', '<div class="flash error slide-in-right"><h4>' . Yii::t('app', 'Пароли не совпадают') . '</h4></div>');
            }
        }

        return $this->render('password-reset', compact('model'));
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
