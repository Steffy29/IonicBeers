angular.module('ionicbeers')

.controller('BeersCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('beers/beers.json').success(function(data) {
    $scope.beers = data;
  });

  $scope.orderProp = 'alcohol';
}]) 