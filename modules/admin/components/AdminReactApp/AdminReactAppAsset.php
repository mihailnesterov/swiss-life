<?php
namespace app\modules\admin\components\AdminReactApp;
use yii\web\AssetBundle;

class AdminReactAppAsset extends AssetBundle 
{
    public function init() {
        $this->sourcePath = realpath( __DIR__.'/assets' );
        $this->css = ['css/style.min.css'];
        $this->js = ['js/admin.min.js'];
    }
}
?>