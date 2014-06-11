var $globalApp = {};
$globalApp.reset = true;
$globalApp.toPost = false;
$globalApp.allPosts = null;

$(".header").css("height", $(window).height() - 52);

var app = angular.module('app', ['ngRoute'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
});

app.factory("Global", function() {
    var title = "Dr.Yami";
    var category = 0; // 0 - all, 1 - articles, 2 - tutorials, 3 - rants
    return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; },
        category: function() { return category; },
        setCategory: function(newCategory) { category = newCategory; }
    };
});

app.controller("GlobalController", function($scope, Global) {
    $scope.Global = Global;
});

app.controller("PortfolioController", function($scope, $timeout, Global) {
    Global.setTitle("Dr.Yami");
    if ($globalApp.reset) {
        $('.navbar').addClass("animated fadeInDown");
        $('#view').addClass("animated fadeIn");
        $('body').css('display', 'block');
        $('.header').find('h2').addClass("animated fadeInLeft animated-1s");
        $('.header').find('img').addClass("animated bounceIn animated-1s");
    } else {
        $('#navbar').removeClass("slideOutRight");
        $('#navbar').addClass("animated slideInLeft");
        $('.header').find('h2').removeClass("bounceOutDown");
        $('.header').find('h2').addClass("animated bounceIn");
    }

    $('html, body').animate({
        scrollTop: 0
    }, 300);

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

    $globalApp.reset = false;
});

app.controller("BlogController", function($scope, $timeout, Global, posts) {
    $scope.posts = posts;
    $scope.catId = Global.category();

    switch(Global.category()) {
        case 0:
            Global.setTitle("Blog | Dr.Yami");
            $scope.category = "";
            $scope.postCategory = "All Posts";
            break;
        case 1:
            Global.setTitle("Articles | Dr.Yami");
            $scope.category = "articles";
            $scope.postCategory = "Articles";
            break;
        case 2:
            Global.setTitle("Tutorials | Dr.Yami");
            $scope.category = "tutorials";
            $scope.postCategory = "Tutorials";
            break;
        case 3:
            Global.setTitle("Rants | Dr.Yami");
            $scope.category = "rants";
            $scope.postCategory = "Rants";
            break;
        default:
            Global.setTitle("Blog | Dr.Yami");
            $scope.category = "";
            $scope.postCategory = "All Posts";
    }

    if (!$globalApp.toPost) {
        if ($globalApp.reset) {
            $('.navbar').addClass("animated fadeInDown");
            $('#view').addClass("animated fadeIn");
            $('body').css('display', 'block');
            $('.header').find('h2').addClass("animated fadeInLeft animated-1s");
            $('.header').find('img').addClass("animated bounceIn animated-1s");
        } else {
            $('#navbar').removeClass("slideOutRight");
            $('#navbar').addClass("animated slideInLeft");
            $('.header').find('h2').removeClass("bounceOutDown");
            $('.header').find('h2').addClass("animated bounceIn");
        }
        $('html, body').animate({
            scrollTop: 0
        }, 300);
        $timeout(function() {
            var section = "#posts";
            $('html, body').animate({
                scrollTop: $(section).offset().top - 64
            }, 300);
        }, 750);
    } else {
        $timeout(function() {
            $('html, body').animate({
                scrollTop: $("#posts").offset().top
            }, 300);
        }, 100);
    }

    $(".header").css("height", $(window).height() - 52);
    $(window).resize(function() {
        $(".header").css("height", $(window).height() - 52);
    });

    $scope.gotoSection = function(section) {
        $('html, body').animate({
            scrollTop: $(section).offset().top - 64
        }, 500);
    };

    $scope.changeCategory = function(category) {
        $globalApp.toPost = true;
        $scope.catId = category;
    }

    $globalApp.reset = false;
    $globalApp.toPost = false;
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/template/portfolio.html',
            controller  : 'PortfolioController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    if ($globalApp.reset) {
                        return;
                    }
                    var delay = $q.defer();

                    $('html, body').animate({
                        scrollTop: 0
                    }, 400);

                    $('#navbar').addClass("animated slideOutRight");
                    $('.header').find('h2').removeClass("animated fadeInLeft animated-1s");
                    $('.header').find('h2').addClass("animated bounceOutDown");

                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/blog', {
            templateUrl : '/template/blog.html',
            controller  : 'BlogController',
            resolve     : {
                posts : function($q, $timeout, $http, Global) {
                    var delay = $q.defer();
                    Global.setCategory(0);
                    if ($globalApp.reset) {
                        $http({method: "GET", url: "/category/all.json"}).
                        success(function(data, status) {
                            $globalApp.allPosts = data
                            delay.resolve($globalApp.allPosts);
                        }).
                        error(function(data, status) {
                            delay.resolve([]);
                        });
                        return delay.promise;
                    }

                    if (!$globalApp.toPost) {
                        $('html, body').animate({
                            scrollTop: 0
                        }, 400);

                        $('#navbar').addClass("animated slideOutRight");
                        $('.header').find('h2').removeClass("animated fadeInLeft animated-1s");
                        $('.header').find('h2').addClass("animated bounceOutDown");
                    }

                    if (!$globalApp.allPosts) {
                        $http({method: "GET", url: "/category/all.json"}).
                            success(function(data, status) {
                                if (!$globalApp.toPost) {
                                    $timeout(function() {
                                        delay.resolve(data);
                                    }, 500);
                                }
                                else {
                                    delay.resolve(data);
                                }
                            }).
                            error(function(data, status) {
                                if (!$globalApp.toPost) {
                                    $timeout(function() {
                                        delay.resolve([]);
                                    }, 500);
                                }
                                else {
                                    delay.resolve([]);
                                }
                            });
                    } else {
                        if (!$globalApp.toPost) {
                            $timeout(function() {
                                delay.resolve($globalApp.allPosts);
                            }, 500);
                        } else {
                            delay.resolve($globalApp.allPosts);
                        }
                    }

                    return delay.promise;
                }
            }
        })
        .when('/blog/articles', {
            templateUrl : '/template/blog.html',
            controller  : 'BlogController',
            resolve     : {
                posts : function($q, $timeout, $http, Global) {
                    var delay = $q.defer();
                    Global.setCategory(1);
                    if ($globalApp.reset) {
                        $http({method: "GET", url: "/category/all.json"}).
                        success(function(data, status) {
                            $globalApp.allPosts = data
                            delay.resolve($globalApp.allPosts);
                        }).
                        error(function(data, status) {
                            delay.resolve([]);
                        });
                        return delay.promise;
                    }

                    if (!$globalApp.toPost) {
                        $('html, body').animate({
                            scrollTop: 0
                        }, 400);

                        $('#navbar').addClass("animated slideOutRight");
                        $('.header').find('h2').removeClass("animated fadeInLeft animated-1s");
                        $('.header').find('h2').addClass("animated bounceOutDown");
                    }

                    if (!$globalApp.allPosts) {
                        $http({method: "GET", url: "/category/all.json"}).
                            success(function(data, status) {
                                if (!$globalApp.toPost) {
                                    $timeout(function() {
                                        delay.resolve(data);
                                    }, 500);
                                }
                                else {
                                    delay.resolve(data);
                                }
                            }).
                            error(function(data, status) {
                                if (!$globalApp.toPost) {
                                    $timeout(function() {
                                        delay.resolve([]);
                                    }, 500);
                                }
                                else {
                                    delay.resolve([]);
                                }
                            });
                    } else {
                        if (!$globalApp.toPost) {
                            $timeout(function() {
                                delay.resolve($globalApp.allPosts);
                            }, 500);
                        } else {
                            delay.resolve($globalApp.allPosts);
                        }
                    }

                    return delay.promise;
                }
            }
        })
        .when('/blog/tutorials', {
            templateUrl : '/template/blog.html',
            controller  : 'BlogController',
            resolve     : {
                posts : function($q, $timeout, $http, Global) {
                    var delay = $q.defer();
                    Global.setCategory(2);
                    if ($globalApp.reset) {
                        $http({method: "GET", url: "/category/all.json"}).
                        success(function(data, status) {
                            $globalApp.allPosts = data
                            delay.resolve($globalApp.allPosts);
                        }).
                        error(function(data, status) {
                            delay.resolve([]);
                        });
                        return delay.promise;
                    }

                    if (!$globalApp.toPost) {
                        $('html, body').animate({
                            scrollTop: 0
                        }, 400);

                        $('#navbar').addClass("animated slideOutRight");
                        $('.header').find('h2').removeClass("animated fadeInLeft animated-1s");
                        $('.header').find('h2').addClass("animated bounceOutDown");
                    }

                    if (!$globalApp.allPosts) {
                        $http({method: "GET", url: "/category/all.json"}).
                            success(function(data, status) {
                                if (!$globalApp.toPost) {
                                    $timeout(function() {
                                        delay.resolve(data);
                                    }, 500);
                                }
                                else {
                                    delay.resolve(data);
                                }
                            }).
                            error(function(data, status) {
                                if (!$globalApp.toPost) {
                                    $timeout(function() {
                                        delay.resolve([]);
                                    }, 500);
                                }
                                else {
                                    delay.resolve([]);
                                }
                            });
                    } else {
                        if (!$globalApp.toPost) {
                            $timeout(function() {
                                delay.resolve($globalApp.allPosts);
                            }, 500);
                        } else {
                            delay.resolve($globalApp.allPosts);
                        }
                    }

                    return delay.promise;
                }
            }
        })
        .when('/blog/rants', {
            templateUrl : '/template/blog.html',
            controller  : 'BlogController',
            resolve     : {
                posts : function($q, $timeout, $http, Global) {
                    var delay = $q.defer();
                    Global.setCategory(3);
                    if ($globalApp.reset) {
                        $http({method: "GET", url: "/category/all.json"}).
                        success(function(data, status) {
                            $globalApp.allPosts = data
                            delay.resolve($globalApp.allPosts);
                        }).
                        error(function(data, status) {
                            delay.resolve([]);
                        });
                        return delay.promise;
                    }

                    if (!$globalApp.toPost) {
                        $('html, body').animate({
                            scrollTop: 0
                        }, 400);

                        $('#navbar').addClass("animated slideOutRight");
                        $('.header').find('h2').removeClass("animated fadeInLeft animated-1s");
                        $('.header').find('h2').addClass("animated bounceOutDown");
                    }

                    if (!$globalApp.allPosts) {
                        $http({method: "GET", url: "/category/all.json"}).
                            success(function(data, status) {
                                if (!$globalApp.toPost) {
                                    $timeout(function() {
                                        delay.resolve(data);
                                    }, 500);
                                }
                                else {
                                    delay.resolve(data);
                                }
                            }).
                            error(function(data, status) {
                                if (!$globalApp.toPost) {
                                    $timeout(function() {
                                        delay.resolve([]);
                                    }, 500);
                                }
                                else {
                                    delay.resolve([]);
                                }
                            });
                    } else {
                        if (!$globalApp.toPost) {
                            $timeout(function() {
                                delay.resolve($globalApp.allPosts);
                            }, 500);
                        } else {
                            delay.resolve($globalApp.allPosts);
                        }
                    }

                    return delay.promise;
                }
            }
        });

    $locationProvider.html5Mode(true);
});