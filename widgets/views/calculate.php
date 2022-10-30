<?php
use yii\helpers\{Html, Url};
        
echo Html::tag(
    'section',
    Html::tag('h2', Yii::t('app', 'Мы поможем вам достичь желаемых целей!'))
    . Html::tag('p', Yii::t('app', 'Ответив на несколько вопросов, вы сможете увидеть предварительный просмотр портфолио, которое мы создадим в соответствии с вашими целями. Позже вы сможете изменять, настраивать или даже добавлять новые портфолио!'), ['class' => 'subtitle'])
    . Html::tag(
        'section',
        Html::tag('h3', Yii::t('app', 'Выберите свои инвестиционные цели'))
        . Html::ul(
            $goals, 
            [
                'item' => function ($item, $index) {
                    $options = [];
                    
                    if( $index === 0 ) {
                        $options['class'] = 'active';
                    }
                    
                    return Html::tag('li', Html::a(Yii::t('app', $item), Url::to(['/', '#' => $index])), $options);
                },
                'class' => 'goals-list'
            ],
        ),
        ['class' => 'goals']
    )
    . Html::tag(
        'div',
        Html::tag(
            'div',
            Html::tag(
                'section',
                Html::tag('h4', Yii::t('app', 'Первоначальная инвестиция'))
                . Html::tag(
                    'div', 
                    Html::tag(
                        'p', 
                        null,
                        [
                            'id' => 'initial-investment-value',
                            'data' => [
                                'min' => $initial['min'],
                                'max' => $initial['max'],
                                'step' => $initial['step'],
                                'value' => $initial['value'],
                            ]
                        ]
                    )
                    . Html::ul(
                        $currencies, 
                        [
                            'item' => function ($item, $index) use($currency) {
                                $options = [];
                                
                                $options['class'] = 'btn btn-secondary btn-small';
                                
                                if( $currency === $item['sign'] ) {
                                    $options['class'] = 'btn btn-primary btn-small';
                                }
                                
                                return Html::button($item['sign'], $options);                                
                            },
                            'id' => 'initial-investment-currency',
                            'class' => 'investment-slider-currency'
                        ],
                    ),
                    ['class' => 'investment-values']
                )
                . Html::tag(
                    'div',
                    Html::tag(
                        'div',
                        null,
                        ['id' => 'initial-investment-handle', 'class' => 'ui-slider-handle']
                    ),
                    ['id' => 'initial-investment-slider']
                ),
                ['class' => 'investment-slider']
            )
            . Html::tag(
                'section',
                Html::tag('h4', Yii::t('app', 'Ежемесячные инвестиции'))
                . Html::tag(
                    'div', 
                    Html::tag(
                        'p', 
                        null,
                        [
                            'id' => 'monthly-investment-value',
                            'data' => [
                                'min' => $monthly['min'],
                                'max' => $monthly['max'],
                                'step' => $monthly['step'],
                                'value' => $monthly['value'],
                            ]
                        ]
                    )
                    . Html::ul(
                        $currencies, 
                        [
                            'item' => function ($item, $index) use($currency) {
                                $options = [];
                                
                                $options['class'] = 'btn btn-secondary btn-small';
                                
                                if( $currency === $item['sign'] ) {
                                    $options['class'] = 'btn btn-primary btn-small';
                                }
                                
                                return Html::button($item['sign'], $options);                                
                            },
                            'id' => 'monthly-investment-currency',
                            'class' => 'investment-slider-currency'
                        ],
                    ),
                    ['class' => 'investment-values']
                )
                . Html::tag(
                    'div',
                    Html::tag(
                        'div',
                        null,
                        ['id' => 'monthly-investment-handle', 'class' => 'ui-slider-handle']
                    ),
                    ['id' => 'monthly-investment-slider']
                ),
                ['class' => 'investment-slider']
            )
            . Html::tag(
                'section',
                Html::tag('h4', Yii::t('app', 'Срок инвестиции'))
                . Html::tag(
                    'div', 
                    Html::tag(
                        'p', 
                        null,
                        [
                            'id' => 'investment-term-value',
                            'data' => [
                                'min' => $term['min'],
                                'max' => $term['max'],
                                'step' => $term['step'],
                                'value' => $term['value'],
                            ]
                        ]
                    )
                    . Html::ul(
                        $currencies, 
                        [
                            'item' => function ($item, $index) use($currency) {
                                $options = [];
                                
                                $options['class'] = 'btn btn-secondary btn-small';
                                
                                if( $currency === $item['sign'] ) {
                                    $options['class'] = 'btn btn-primary btn-small';
                                }
                                
                                return Html::button($item['sign'], $options);                                
                            },
                            'id' => 'investment-term-currency',
                            'class' => 'investment-slider-currency'
                        ],
                    ),
                    ['class' => 'investment-values']
                )
                . Html::tag(
                    'div',
                    Html::tag(
                        'div',
                        null,
                        ['id' => 'investment-term-handle', 'class' => 'ui-slider-handle']
                    ),
                    ['id' => 'investment-term-slider']
                ),
                ['class' => 'investment-slider']
            )
            . Html::tag(
                'section',
                Html::tag('h4', Yii::t('app', 'Инвестиционный стиль'))
                . Html::tag(
                    'div',
                    Html::ul(
                        $style, 
                        [
                            'item' => function ($item, $index) {
                                $options = [];
                                
                                if( $index === 'Консервативный' ) {
                                    $options['class'] = 'active';
                                }
                                
                                return Html::tag(
                                    'li', 
                                    Html::a(Yii::t('app', $index), Url::to(['/', '#' => $index]), ['data' => ['style' => $item]])
                                    . Html::tag('span', '?', ['title' => Yii::t('app', $item) . '% ' . Yii::t('app', 'годовых'), 'class' => 'comment']),
                                    $options
                                );
                            },
                            'class' => 'investment-style-list'
                        ],
                    ),
                    ['class' => 'investment-style']
                ),
                ['class' => 'investment-slider']
            ),
            ['class' => 'investment']
        )
        . Html::tag(
            'div',
            Html::tag('h3', Yii::t('app', 'Результаты'))
            . Html::tag(
                'section', 
                Html::tag(
                    'header',
                    Html::tag('h4', Yii::t('app', 'Ожидаемый доход'))
                    . Html::tag('span', '?', ['title' => Yii::t('app', $results['Ожидаемый доход']), 'class' => 'comment']),
                    ['class' => 'results-item-header']
                )
                . Html::tag(
                    'p', 
                    $currency . Html::tag('span', 0)
                    ,
                    ['id' => 'expected-income-value']
                ),
                ['class' => 'results-item']
            )
            . Html::tag(
                'section', 
                Html::tag(
                    'header',
                    Html::tag('h4', Yii::t('app', 'Ожидаемая доходность'))
                    . Html::tag('span', '?', ['title' => Yii::t('app', $results['Ожидаемая доходность']), 'class' => 'comment']),
                    ['class' => 'results-item-header']
                )
                . Html::tag(
                    'p', 
                    Html::tag('span', 0) . '%'
                    ,
                    ['id' => 'expected-return-value']
                ),
                ['class' => 'results-item']
            )
            . Html::tag(
                'section', 
                Html::tag(
                    'header',
                    Html::tag('h4', Yii::t('app', 'Историческая доходность'))
                    . Html::tag('span', '?', ['title' => Yii::t('app', $results['Историческая доходность']), 'class' => 'comment']),
                    ['class' => 'results-item-header']
                )
                . Html::tag(
                    'p', 
                    Html::tag('span', 0) . '%'
                    ,
                    ['id' => 'historical-returns-value']
                ),
                ['class' => 'results-item']
            ),
            ['class' => 'results']
        ),
        ['class' => 'row']
    )
    . Html::tag(
        'div',
        Html::a(Yii::t('app', 'Создать аккаунт'), Url::to(['signup', 'lang' => Yii::$app->language]), ['class' => 'btn btn-primary'])
        . Html::a(Yii::t('app', 'Авторизоваться'), Url::to(['login', 'lang' => Yii::$app->language]), ['class' => 'btn btn-link']),
        ['class' => 'btn-group']
    ),
    ['id' => 'calculate', 'class' => 'calculate wow slide-in-bck-bottom', 'data-wow-delay' => '.2s']
);