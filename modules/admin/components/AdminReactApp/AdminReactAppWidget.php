<?php
namespace app\modules\admin\components\AdminReactApp;
use yii\base\Widget;

class AdminReactAppWidget extends Widget 
{
    public function init() {
        if( \Yii::$app->user->identity->role !== 'admin' ) {
            \Yii::$app->response->redirect(\yii\helpers\Url::previous())->send();
            return false;
        }
        AdminReactAppAsset::register( $this->getView() );
        parent::init();
    }
    
    public function run() {
        parent::run();
        return $this->render('app');
    }
}
?>