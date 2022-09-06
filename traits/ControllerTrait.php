<?php 

namespace app\traits;

use Yii;

/**
 * Трейт используется в контроллерах сайта.
 */
trait ControllerTrait {

    /**
     * Set meta keywords
     * @param string
     */
    public function setMetaKeywords($content = '') {
        Yii::$app->view->registerMetaTag([
            'name' => 'keywords',
            'content' => $content
        ]);
    }

    /**
     * Set meta description
     * @param string
     */
    public function setMetaDescription($content = '') {
        Yii::$app->view->registerMetaTag([
            'name' => 'description',
            'content' => $content
        ]);
    }

}