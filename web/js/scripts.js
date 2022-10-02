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

    if( $('#initial-investment-handle').length ) {
        //var handle = $( "#initial-investment-handle" );
        if( $('#initial-investment-slider').length ) {
            $( "#initial-investment-slider" ).slider({
                min: 0,
                max: 2000000,
                step: 100,
                value: 808080,
                create: function() {
                    $('#initial-investment-value').text( $( this ).slider( "value" ) );
                    //handle.text( $( this ).slider( "value" ) );
                },
                slide: function( event, ui ) {
                    $('#initial-investment-value').text(ui.value);
                    $('#expected-income-value span').text(ui.value + (ui.value * 0.01));
                    //handle.text( ui.value );
                }
            });
        }
    }

    if( $('#monthly-investment-handle').length ) {
        if( $('#monthly-investment-slider').length ) {
            $( "#monthly-investment-slider" ).slider({
                min: 0,
                max: 1000000,
                step: 100,
                value: 15000,
                create: function() {
                    $('#monthly-investment-value').text( $( this ).slider( "value" ) );
                },
                slide: function( event, ui ) {
                    $('#monthly-investment-value').text(ui.value);
                    $('#expected-income-value span').text(Math.floor($('#expected-income-value span').text()) + (ui.value * 0.001), 2);
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
            });
        });
    }

    if( $('#initial-investment-currency').length ) {
        $('#initial-investment-currency button').each(function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('#initial-investment-currency button').each(function() {
                    $(this).removeClass('btn-primary').addClass('btn-secondary');
                });
                $(this).removeClass('btn-secondary').addClass('btn-primary');
                const expectedIncomeValue = $('#expected-income-value span').text();
                $('#expected-income-value').html(`${$(this).text()}&nbsp;<span>${expectedIncomeValue}</span>`);
            });
        });
    }

    if( $('#monthly-investment-currency').length ) {
        $('#monthly-investment-currency button').each(function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('#monthly-investment-currency button').each(function() {
                    $(this).removeClass('btn-primary').addClass('btn-secondary');
                });
                $(this).removeClass('btn-secondary').addClass('btn-primary');
                const expectedIncomeValue = $('#expected-income-value span').text();
                $('#expected-income-value').html(`${$(this).text()}&nbsp;<span>${expectedIncomeValue}</span>`);
            });
        });
    }
    
});