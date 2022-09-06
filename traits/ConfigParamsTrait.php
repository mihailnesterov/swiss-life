<?php 

namespace app\traits;

use Yii;

/**
 * Трейт используется в для получения настроек из config/params.php.
 */
trait ConfigParamsTrait {

    /**
     * Get main menu items param.
     * 
     * @return array
     */
    public function getMainMenuItemsParam() {
        return Yii::$app->params['main-menu'];
    }

}