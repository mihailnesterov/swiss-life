<?php
use yii\helpers\{Html, Url};

echo Html::tag(
    'nav', 
    Html::ul(
        $items, 
        [
            'item' => function ($item, $index) {
                $options = [];
                
                if( $index === 'calculate' ) {
                    $options['class'] = 'active';
                }
                
                return Html::tag('li', Html::a(Yii::t('app', $item), '#' . Url::to($index)), $options);
            },
            'class' => 'main-menu'
        ],
    ),
    ['class' => 'nav']
);
    