<?php
namespace app\widgets;

use yii\base\Widget;

/**
 * Главное меню
 *
 * Class MainMenu
 */
class MainMenu extends Widget 
{    
    use \app\traits\ConfigParamsTrait;

    /**
     * Widget view name
     * @var string
     */
    private $view = 'mainMenu';

    /**
     * Menu items
     * @var array
     */
    private $items = null;

    /**
     * Run Widget
     * @return string
     */
    public function run() {
        parent::run();

        $this->items = $this->getMainMenuItemsParam();
        
        return $this->render($this->view, ['items' => $this->items]);
    }
}