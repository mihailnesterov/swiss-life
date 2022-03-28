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
        'https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,500i,700,900&amp;subset=cyrillic',
    ];
    public $js = [
    ];
    public $depends = [
    ];
}
