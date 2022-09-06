<?php
namespace app\widgets;

use yii\base\Widget;

/**
 * Шапка сайта
 *
 * Class Header
 */
class Header extends Widget 
{    
    /**
     * Widget view name
     * @var string
     */
    private $view = 'header';

    /**
     * Run Widget
     * @return string
     */
    public function run() {
        parent::run();
        return $this->render($this->view);
    }
}