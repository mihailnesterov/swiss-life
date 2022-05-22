<?php
namespace app\modules\investor\components\InvestorReactApp;
use yii\base\Widget;

class InvestorReactAppWidget extends Widget 
{
    public function init() {
        if( \Yii::$app->user->identity->role !== 'user' ) {
            \Yii::$app->response->redirect(\yii\helpers\Url::previous())->send();
            return false;
        }
        InvestorReactAppAsset::register( $this->getView() );
        parent::init();
    }
    
    public function run() {
        parent::run();
        return $this->render('app');
    }
}
?>