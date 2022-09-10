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