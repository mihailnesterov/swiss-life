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
    
});