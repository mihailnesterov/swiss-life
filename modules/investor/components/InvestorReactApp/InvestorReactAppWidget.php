<?php
namespace app\modules\investor\components\InvestorReactApp;
use yii\base\Widget;

class InvestorReactAppWidget extends Widget 
{
    public function init() {
        InvestorReactAppAsset::register( $this->getView() );
        parent::init();
    }
    
    public function run() {
        parent::run();
        return $this->render('app');
    }
}
?>