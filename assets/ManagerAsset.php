<?php

namespace app\assets;

use yii\web\AssetBundle;

/**
 * Manager module asset bundle.
 */
class ManagerAsset extends AssetBundle
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
