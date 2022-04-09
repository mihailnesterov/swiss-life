<?php
namespace app\modules\manager\components\ManagerReactApp;
use yii\base\Widget;

class ManagerReactAppWidget extends Widget 
{
    public function init() {
        ManagerReactAppAsset::register( $this->getView() );
        parent::init();
    }
    
    public function run() {
        parent::run();
        return $this->render('app');
    }
}
?>