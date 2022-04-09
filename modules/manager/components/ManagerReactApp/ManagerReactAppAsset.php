<?php
namespace app\modules\manager\components\ManagerReactApp;
use yii\web\AssetBundle;

class ManagerReactAppAsset extends AssetBundle 
{
    public function init() {
        $this->sourcePath = realpath( __DIR__.'/assets' );
        $this->css = ['css/style.min.css'];
        $this->js = ['js/manager.min.js'];
    }
}
?>