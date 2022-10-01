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
        'css/fontawesome.min.css',
        'css/jquery-ui.min.css',
        'css/style.css'
    ];
    public $js = [
        'js/wow.min.js',
        'js/jquery.maskedinput.min.js',
        'js/jquery-ui.min.js',
        'js/scripts.js'
    ];
    public $depends = [
        'yii\web\YiiAsset'
    ];
}
