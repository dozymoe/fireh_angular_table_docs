(function() {
  var app = angular.module('firehAngularTableDemo', [
    'ngRoute'
  ]);


  app.controller('MainCtrl', function($scope) {
  });


  app.config(['$routeProvider', function($router) {
    $router
      .when('/', {
        templateUrl: 'partials/summary.html'
      })

      .when('/options', {
        templateUrl: 'partials/options.html'
      })

      .when('/mixins', {
        templateUrl: 'partials/mixins.html'
      })

      .when('/widgets', {
        templateUrl: 'partials/widgets.html'
      })

      .when('/events', {
        templateUrl: 'partials/events.html'
      })
    ;
  }]);
})();
