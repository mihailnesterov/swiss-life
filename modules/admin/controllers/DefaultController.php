<?php

namespace app\modules\admin\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;
use yii\helpers\ArrayHelper;
use app\models\User;
use app\models\Signup;

/**
 * Default controller for the `admin` module
 */
class DefaultController extends Controller
{

    public static function allowedDomains() {
        return [
            '*',
            //'http://localhost:80',
            //'https://blablabla.ru:80',
        ];
    } 
    
    /**
     * {@inheritdoc}
     */
    public function behaviors() {
        return array_merge(parent::behaviors(), [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['login', 'logout'], //'signup', 
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

            // For cross-domain AJAX request
            'corsFilter'  => [
                'class' => \yii\filters\Cors::className(),
                'cors'  => [
                    // restrict access to domains:
                    'Origin'                           => static::allowedDomains(),
                    'Access-Control-Request-Method'    => ['POST'],
                    'Access-Control-Allow-Credentials' => true,
                    'Access-Control-Max-Age'           => 3600, // Cache (seconds)

                ],
            ],
        ]);
    }
    

    public function actionIndex() {

        if ( Yii::$app->user->isGuest ) {

            Yii::$app->user->logout();

            return $this->goHome();
        }

        $user = $this->findUserModel(Yii::$app->user->identity->id);

        $this->view->title = 'Кабинет администратора';
        
        return $this->render('index',[
            'user' => $user
        ]);
    }

    public function actionSignup() {

        if ( Yii::$app->user->isGuest )
            $this->logout();

        $model = new Signup();
        
        if ( $this->isSignup( $model ) ) {
            
            $user = $this->createUser( $model );
            //$this->sendRegistrationEmail( $user );
            
        }
        
        return $this->render('signup', [
            'model' => $model,
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

    private function isSignup( $user ) {
        return $user->load(Yii::$app->request->post()) && $user->validate();
    }

    /*private function isAuthorizedAsInvestor() {
        return Yii::$app->user->identity->role === 'investor';
    }*/

    private function createUser( $model ) {
        
        $user = new User();
        
        $user->login = $model->login;
        $user->email = $model->email;
        $user->setPassword($model->password);
        $user->auth_key = \Yii::$app->security->generateRandomString($lenght = 255);
        $user->save();

        return $user;
    }

    private function loginUser( $user ) {

        if ($user) {

            $user->login();
            
            return $this->redirect(Yii::$app->urlManager->createUrl('/admin'));
           
        } 
    }

    private function sendRegistrationEmail( $user ) {
        // send registration info on user email
        /*Yii::$app->mailer->compose([
        'html' => 'test',
        'text' => 'test',
        ])
        ->setFrom(['mail@mail.ru' => ''])
        ->setTo($user->email)
        ->setSubject('')
        ->setTextBody('')
        ->setHtmlBody('')
        ->send();*/
    }
}
