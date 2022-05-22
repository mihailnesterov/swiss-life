<?php
namespace app\modules\manager\components\ManagerReactApp;
use yii\base\Widget;

class ManagerReactAppWidget extends Widget 
{
    public function init() {
        if( \Yii::$app->user->identity->role !== 'manager' ) {
            \Yii::$app->response->redirect(\yii\helpers\Url::previous())->send();
            return false;
        }
        ManagerReactAppAsset::register( $this->getView() );
        parent::init();
    }
    
    public function run() {
        parent::run();
        return $this->render('app');
    }
}
?>