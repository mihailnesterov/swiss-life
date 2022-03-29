<?php

namespace app\modules\investor;

/**
 * investor module definition class
 */
class Module extends \yii\base\Module
{
    /**
     * {@inheritdoc}
     */
    public $controllerNamespace = 'app\modules\investor\controllers';

    /**
     * {@inheritdoc}
     */
    public function init()
    {
        parent::init();
        // custom initialization code goes here
        
        /**
         * Configure module Error Handler
         * @see https://forum.yiiframework.com/t/how-to-load-an-errorhandler-in-a-module/85875
         */
        \Yii::configure(
            $this, 
            [
                'components' => [
                    'errorHandler' => [
                        'class' => \yii\web\ErrorHandler::className(),
                        'errorAction' => 'investor/default/index'
                    ]
                ],
            ]
        );

        /** 
         * Register module Error Handler
         * @var ErrorHandler $handler
         */
        $handler = $this->get('errorHandler');
        
        \Yii::$app->set('errorHandler', $handler);
        
        $handler->register();
    }
    
    /*
     * Access Control Filter (ACF)
     */
    public function behaviors(){
        return [
            'access' => [
            'class' => \yii\filters\AccessControl::className(),
            'user' => \Yii::$app->user,
            'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'], // authorized users only
                    ],
                ],
            ],
        ];
   }
}
