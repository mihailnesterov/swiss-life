<?php

namespace app\assets;

use yii\web\AssetBundle;

/**
 * Admin module asset bundle.
 */
class InvestorAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'fonts/cormorant/stylesheet.css',
        'fonts/inter/stylesheet.css',
    ];
    public $js = [
    ];
    public $depends = [
    ];
}
