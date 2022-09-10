<?php

namespace app\assets;

use yii\web\AssetBundle;

/**
 * Main application asset bundle.
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/reset.css',
        'fonts/cormorant/stylesheet.css',
        'fonts/inter/stylesheet.css',
        'css/style.css'
    ];
    public $js = [
        'js/fontawesome.min.js',
        'js/wow.min.js',
        'js/scripts.js'
    ];
    public $depends = [
        'yii\web\YiiAsset'
    ];
}
