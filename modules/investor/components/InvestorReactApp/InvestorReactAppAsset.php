<?php
namespace app\modules\investor\components\InvestorReactApp;
use yii\web\AssetBundle;

class InvestorReactAppAsset extends AssetBundle 
{
    public function init() {
        $this->sourcePath = realpath( __DIR__.'/assets' );
        $this->css = ['css/style.min.css'];
        $this->js = ['js/investor.min.js'];
    }
}
?>