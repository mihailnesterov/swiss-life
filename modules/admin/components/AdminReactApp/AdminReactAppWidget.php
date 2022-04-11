<?php
namespace app\modules\admin\components\AdminReactApp;
use yii\base\Widget;

class AdminReactAppWidget extends Widget 
{
    public function init() {
        AdminReactAppAsset::register( $this->getView() );
        parent::init();
    }
    
    public function run() {
        parent::run();
        return $this->render('app');
    }
}
?>