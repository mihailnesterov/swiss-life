<?php
namespace app\widgets;

use yii\base\Widget;

/**
 * Подвал сайта
 *
 * Class Footer
 */
class Footer extends Widget 
{    
    /**
     * Widget view name
     * @var string
     */
    private $view = 'footer';

    /**
     * Run Widget
     * @return string
     */
    public function run() {
        parent::run();
        return $this->render($this->view);
    }
}