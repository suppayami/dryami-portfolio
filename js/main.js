$(function() {
    $(".header").css("height", $(window).height() - 52);
});

$(window).resize(function() {
    $(".header").css("height", $(window).height() - 52);
});

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - 64
    }, 500);
    return false;
});
