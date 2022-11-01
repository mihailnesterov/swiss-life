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

    /**
     * Get calculate input range param.
     * 
     * @param string
     * @return array
     */
    public function getInputRangeParam( $input ) {
        return Yii::$app->params['calculate'][$input];
    }

    /**
     * Get calculate default currency param.
     * 
     * @return array
     */
    public function getDefaultCurrencyParam() {
        return Yii::$app->params['calculate']['currency'];
    }

    /**
     * Get calculate investment goals param.
     * 
     * @return array
     */
    public function getInvestmentGoalsParam() {
        return Yii::$app->params['calculate']['goals'];
    }

    /**
     * Get calculate investment style param.
     * 
     * @return array
     */
    public function getInvestmentStyleParam() {
        return Yii::$app->params['calculate']['style'];
    }

    /**
     * Get calculate investment results param.
     * 
     * @return array
     */
    public function getInvestmentResultsParam() {
        return Yii::$app->params['calculate']['results'];
    }

    /**
     * Get repay credit percent param.
     * 
     * @return double
     */
    public function getRepayCreditPercentParam() {
        return Yii::$app->params['credit']['repay']['monthly'];
    }
}