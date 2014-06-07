$(function() {
    $(".header").css("height", $(window).height() - 128);
});

$(window).resize(function() {
    $(".header").css("height", $(window).height() - 128);
});
