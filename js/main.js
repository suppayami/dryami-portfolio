$(".header").css("height", $(window).height() - 52);

var app = angular.module('app', ['ngRoute'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
});

app.controller("PortfolioController", function($scope) {
    $(".header").css("height", $(window).height() - 52);
    $(window).resize(function() {
        $(".header").css("height", $(window).height() - 52);
    });

    $scope.gotoSection = function(section) {
        $('html, body').animate({
            scrollTop: $(section).offset().top - 64
        }, 500);
    };

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
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'template/portfolio.html',
            controller  : 'PortfolioController'
        });

    $locationProvider.html5Mode(true);
});