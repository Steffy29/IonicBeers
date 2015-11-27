// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicbeers', ['ionic','pascalprecht.translate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    .state('eventmenu', {
      url: '/event',
      abstract: 'true',
      templateUrl: 'templates/menu.html'
    })
    .state('eventmenu.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html'
          }
        }
    })
    .state('eventmenu.beers', {
        url: '/beers',
        views: {
          'menuContent': {
            templateUrl: 'templates/listBeers.html',
            controller : 'BeersCtrl'
          }
        }
    })
    .state('beer', {
        url: '/beers/:beerId',
        templateUrl: 'templates/beer-detail.html',
        controller : 'BeersCtrl'
    });

    $urlRouterProvider.otherwise('/event/home');

    // Translate labels / title / menus
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix:'.json'
    });
    $translateProvider
    .registerAvailableLanguageKeys(['en','fr'], {
        'en_US': 'en',
        'en_UK': 'en',
        'fr_FR': 'fr',
        'fr_BE': 'fr'
    })
    .determinePreferredLanguage();

    $translateProvider.use();

})

