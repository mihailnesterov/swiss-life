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
        'https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,500i,700,900&amp;subset=cyrillic',
        'css/reset.css',
        'css/style.css'
    ];
    public $js = [
        'js/fontawesome.min.js',
        'js/scripts.js'
    ];
    public $depends = [
        'yii\web\YiiAsset'
    ];
}
