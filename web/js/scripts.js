window.onload = function() {
    
    new WOW().init();

    document.body.onscroll = function() {
        if ( document.body.getBoundingClientRect().top === 0 ) {
            document.querySelector('.toTop').style.display = 'none';
        } else {
            document.querySelector('.toTop').style.display = 'block';
        }
    }

    document.querySelectorAll('a[href^="#"]').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();    
            document.querySelector(this.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
        });
    });
    
}

$(function() {
    
    if( $('.flash').length ) {
        setTimeout(() => {
            $('.flash').each(function() {
                $(this).fadeOut( "slow", function() {
                    $(this).remove();
                });
            });
        }, 3000);
    }

    if( $('#orderaccount-phone').length ) {
        $('#orderaccount-phone').mask("+7 999 999-99-99");
    }
    

    if( $('.calculate .goals-list li').length ) {
        $('.calculate .goals-list li').each(function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.calculate .goals-list li').each(function() {
                    $(this).removeClass('active');
                });
                $(this).addClass('active');
            });
        });
    }

    const calculate = {
        initial: {
            min: $('#initial-investment-value').data('min'),
            max: $('#initial-investment-value').data('max'),
            step: $('#initial-investment-value').data('step'),
            value: $('#initial-investment-value').data('value'),
        },
        monthly: {
            min: $('#monthly-investment-value').data('min'),
            max: $('#monthly-investment-value').data('max'),
            step: $('#monthly-investment-value').data('step'),
            value: $('#monthly-investment-value').data('value'),
        },
        term: {
            min: $('#investment-term-value').data('min'),
            max: $('#investment-term-value').data('max'),
            step: $('#investment-term-value').data('step'),
            value: $('#investment-term-value').data('value'),
        },
        style: (Number($('.investment-style-list li.active a').data('style')) / 100),
        setStyle( style ) {
            calculate.style = style;
        },
        results: {
            income: 0,
            return: 7.93,
            historical: 19.25,
            setIncome() {
                // (10000+(100×12×5)) + (((10000+(100×12×5))×0,07)×5) - сумма вложенных + ожидаемый доход (раскомментировать первую строку)
                // (((10000+(100×12×5))×0,07)×5) - ожидаемый доход
                calculate.results.income = Math.ceil( 
                    //(calculate.initial.value + (calculate.monthly.value * (calculate.term.value * 12))) +
                    (((calculate.initial.value + (calculate.monthly.value * (calculate.term.value * 12))) * calculate.style) * calculate.term.value) 
                );
            },
            setReturn() {
                // 1737×0,07÷100×2 - ожидаемая доходность в %
                calculate.results.return = (
                    calculate.results.income * calculate.style / 100 * calculate.term.value
                ).toFixed(2);
            },
        },
    };

    if( $('#initial-investment-handle').length ) {
        if( $('#initial-investment-slider').length ) {
            $( "#initial-investment-slider" ).slider({
                min: calculate.initial.min,
                max: calculate.initial.max,
                step: calculate.initial.step,
                value: calculate.initial.value,
                create: function() {
                    $('#initial-investment-value').text( $( this ).slider( "value" ) );
                    //handle.text( $( this ).slider( "value" ) );
                },
                slide: function( event, ui ) {
                    calculate.initial.value = ui.value;
                    $('#initial-investment-value').text(ui.value);
                    updateCalculate();
                    //handle.text( ui.value );
                }
            });
        }
    }

    if( $('#monthly-investment-handle').length ) {
        if( $('#monthly-investment-slider').length ) {
            $( "#monthly-investment-slider" ).slider({
                min: calculate.monthly.min,
                max: calculate.monthly.max,
                step: calculate.monthly.step,
                value: calculate.monthly.value,
                create: function() {
                    $('#monthly-investment-value').text( $( this ).slider( "value" ) );
                },
                slide: function( event, ui ) {
                    calculate.monthly.value = ui.value;
                    $('#monthly-investment-value').text(ui.value);
                    updateCalculate();
                }
            });
        }
    }

    if( $('#investment-term-handle').length ) {
        if( $('#investment-term-slider').length ) {
            $( "#investment-term-slider" ).slider({
                min: calculate.term.min,
                max: calculate.term.max,
                step: calculate.term.step,
                value: calculate.term.value,
                create: function() {
                    const term = getInvestmentTerm();
                    const termTranslated = term.translate( $( this ).slider( "value" ) );
                    $('#investment-term-value').text( $( this ).slider( "value" ) + termTranslated);
                },
                slide: function( event, ui ) {
                    calculate.term.value = ui.value;
                    updateCalculate();
                    const term = getInvestmentTerm();
                    const termTranslated = term.translate(ui.value);
                    $('#investment-term-value').text(ui.value + termTranslated);
                }
            });
        }
    }

    if( $('.calculate .investment-style-list li').length ) {
        $('.calculate .investment-style-list li').each(function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.calculate .investment-style-list li').each(function() {
                    $(this).removeClass('active');
                });
                $(this).addClass('active');
                calculate.setStyle( Number($(this).find('a').data('style')/100) );
                updateCalculate();
            });
        });
    }

    initCalculate();

    initChangeCurrencyButtonsByIds([
        'initial-investment-currency',
        'monthly-investment-currency',
        'investment-term-currency'
    ]);

    $('.hamburger').on('click', function() {
        
        const logo = $('.header').find('.logo').clone();
        const languagesMenu = $('.header').find('.languages-menu').clone();
        const loginBtn = $('.header .auth').find('.btn.btn-secondary.btn-medium').clone();
        const nav = $('.header').find('.nav').clone();

        $('body').append('<div id="mobile-menu-layer"><aside class="aside"></aside></div>');
        
        $(nav).find('.main-menu').css({display:'block'});
        
        $('#mobile-menu-layer .aside')
            .append(logo)
            .append(languagesMenu)
            .append(loginBtn)
            .append(nav);
        
        $('#mobile-menu-layer')
            .on('click', function() {
                $(this).remove()
            })
            .find('.aside')
                .on('click', function(e) {
                    e.stopPropagation()
                })
                .find('.nav .main-menu li a')
                    .on('click', function() {
                        $('#mobile-menu-layer').remove()
                    });
    });


    // functions

    function initCalculate() {
        calculate.results.setIncome();
        calculate.results.setReturn();
    
        if( $('#expected-income-value span').length ) {
            $('#expected-income-value span').text(calculate.results.income);
        }
    
        if( $('#expected-return-value span').length ) {
            $('#expected-return-value span').text(calculate.results.return);
        }
    
        if( $('#historical-returns-value span').length ) {
            $('#historical-returns-value span').text(calculate.results.historical);
        }
    };

    function updateCalculate() {
        calculate.results.setIncome();
        calculate.results.setReturn();
        $('#expected-income-value span').text(calculate.results.income);
        $('#expected-return-value span').text(calculate.results.return);
    }
    
    function initChangeCurrencyButtonsByIds( ids = [] ) {
        if( ids.length > 0 ) {
            ids.forEach(button_id => {
                $(`#${button_id} button`).each(function() {
                    handleCurrencyBtnClick( this, button_id );
                });
            });
        }
    }
    
    function handleCurrencyBtnClick( self, button_id ) {
        if( $(`#${button_id}`).length ) {
            $(self).on('click', function(e,i) {
                e.preventDefault();
                $(`#${button_id} button`).each(function() {
                    $(this).removeClass('btn-primary').addClass('btn-secondary');
                });
                $(self).removeClass('btn-secondary').addClass('btn-primary');
                const expectedIncomeValue = $('#expected-income-value span').text();
                $('#expected-income-value').html(`${$(self).text()}&nbsp;<span>${expectedIncomeValue}</span>`);
                
            });
        }
    }



    function getInvestmentTerm() {
        return {
            lang: null,
            setLang() {
                let url = new URL(location.href);
                this.lang = url.searchParams.get('lang') ? url.searchParams.get('lang').split('-')[0] : 'ru';
            },
            translate(text) {
                
                this.setLang();
                
                if( text && this.lang ) {

                    if( this.lang === 'ru' ) {
                        if( [1,21,31,41,51,71,81,91].includes(text) ) {
                            return ' год';
                        } else if( [2,3,4,22,23,24,32,33,34,42,43,44,52,53,54,62,63,64,72,73,74,82,83,84,92,93,94]
                                .includes(text) ) {
                            return ' года';
                        } else {
                            return ' лет';
                        }
                    }

                    if( this.lang === 'en' ) {
                        return [1].includes(text) ? ' year' : ' years';
                    }
                }

                return '';
            }
        };
    }    
});