angular.module('ionicbeers')

.filter('strongAlcohol', function() {
    return function(alcohol) {
      return (alcohol < 8) ? alcohol+' \u2713' : alcohol+' \u2718';
    };
})