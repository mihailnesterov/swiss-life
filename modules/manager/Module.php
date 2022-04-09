<?php

namespace app\modules\manager;

/**
 * manager module definition class
 */
class Module extends \yii\base\Module
{
    /**
     * {@inheritdoc}
     */
    public $controllerNamespace = 'app\modules\manager\controllers';

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
                        'errorAction' => 'manager/default/index'
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
