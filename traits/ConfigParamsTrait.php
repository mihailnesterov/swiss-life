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
     * @return float
     */
    public function getRepayCreditPercentParam() {
        return Yii::$app->params['credit']['repay']['monthly'];
    }

    /**
     * Get investment profit percent param.
     * 
     * @return float
     */
    public function getInvestmentProfitPercentParam() {
        return Yii::$app->params['investment']['profit']['monthly'];
    }

    /**
     * Get investment profit excluded user IDs param.
     * 
     * @return array
     */
    public function getInvestmentProfitExcludedUserIdsParam() {
        return Yii::$app->params['investment']['profit']['exclude_user_ids'];
    }

    /**
     * Get account debit percent param.
     * 
     * @return float
     */
    public function getAccountDebitPercentParam() {
        return Yii::$app->params['account']['debit']['monthly'];
    }

    /**
     * Get account debit excluded user IDs param.
     * 
     * @return array
     */
    public function getAccountDebitExcludedUserIdsParam() {
        return Yii::$app->params['account']['debit']['exclude_user_ids'];
    }
}