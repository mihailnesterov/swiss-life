<?php

namespace api\modules\v1;

use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\filters\Cors;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;

/**
 * api\v1 module definition class
 */
class Module extends \yii\base\Module
{
    /**
     * {@inheritdoc}
     */
    public $controllerNamespace = 'api\modules\v1\controllers';

    /**
     * {@inheritdoc}
     */
    public function init()
    {
        parent::init();
        \Yii::$app->user->enableSession = false;
    }

    public static function allowedDomains() {
        return [
            '*',
            'http://localhost:80'
        ];
    } 
    
    /**
     * Access Control Filter (ACF) - доступ к api только авторизованным пользователям
     * @ - authorized
     * ? - guest 
     * {@inheritdoc}
     */
    public function behaviors() {
        return array_merge(
            parent::behaviors(), 
            [
                /*'access' => [
                    'class' => AccessControl::className(),
                    'rules' => [
                        [
                            'allow' => true,
                            'roles' => ['@'],
                        ],
                    ],
                ],*/
                'corsFilter'  => [
                    'class' => Cors::className(),
                    'cors'  => [
                        'Origin'                           => static::allowedDomains(),
                        'Access-Control-Request-Method'    => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                        'Access-Control-Allow-Credentials' => true,
                        'Access-Control-Max-Age'           => 3600,

                    ],
                ],
                'authenticator' => [
                    'class' => CompositeAuth::className(),
                    'authMethods' => [
                        HttpBearerAuth::className(),
                        [
                            'class' => HttpBasicAuth::className(),
                            'auth' => function ($email, $password) {
                                $user = \app\models\UserIdentity::find()->where(['email' => $email])->one();
                                if ($user && !empty($password) && $user->validatePassword($password)) {
                                    return $user;
                                }
                                return null;
                            }
                        ]
                    ],
                ],
            ]
        );
    }
}
