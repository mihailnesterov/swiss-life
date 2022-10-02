<?php
namespace app\widgets;

use yii\base\Widget;
use app\models\Currency;

/**
 * Калькулятор расчета доходности на главной
 *
 * Class Calculate
 */
class Calculate extends Widget 
{    
    use \app\traits\ConfigParamsTrait;

    /**
     * Widget view name
     * @var string
     */
    private $view = 'calculate';

    /**
     * Investment goals
     * @var array
     */
    private $goals = null;

    /**
     * Investment style
     * @var array
     */
    private $style = null;

    /**
     * Investment results
     * @var array
     */
    private $results = null;

    /**
     * Currencies
     * @var array
     */
    private $currencies = null;

    /**
     * Run Widget
     * @return string
     */
    public function run() {
        parent::run();

        $this->goals = $this->getInvestmentGoalsParam();
        $this->style = $this->getInvestmentStyleParam();
        $this->results = $this->getInvestmentResultsParam();
        $this->currencies = Currency::find()->asArray()->all();
        
        return $this->render($this->view, [
            'goals' => $this->goals,
            'style' => $this->style,
            'results' => $this->results,
            'currencies' => $this->currencies,
        ]);
    }
}