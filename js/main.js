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

$(".project-wrapper").hover(function() {
    $(this).find(".project-button").removeClass("fadeOutUp");
    $(this).find(".overlay").removeClass("fadeOut");
    $(this).find(".project-button").addClass("animated bounceInUp");
    $(this).find(".project-button").css("display", "block");
    $(this).find(".overlay").addClass("animated fadeIn");
    $(this).find(".overlay").css("display", "block");
}, function() {
    $(this).find(".project-button").addClass("fadeOutUp");
    $(this).find(".overlay").addClass("fadeOut");
});
