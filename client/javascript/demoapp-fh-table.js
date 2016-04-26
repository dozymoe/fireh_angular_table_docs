(function() {
  var app = angular.module('fhTableDemo', [
      'fireh_angular_table'
  ]);


  app.factory('POST2GET_QueryParams', function() {
    return function(payload) {
      var queryString = {},
          params;

      _.forOwn(payload, function(item, key) {
        if (key !== 'orderBy' && key !== 'filterBy') {
          queryString[key] = item;
        }
      });

      // orderBy
      params = _.transform(payload.orderBy, function(result, item) {
        var direction = item[1] === 'desc' ? '-' : '';
            result.push(direction + item[0]);
      }, []);

      if (params.length) { queryString.orderBy = params.join(','); }

      // filterBy
      _.forOwn(payload.filterBy, function(item, key) {
        if (_.isArray(item)) {
          item = item.join(',');
        }
        queryString['filterBy' + _.capitalize(key)] = item;
      });

      return queryString;
    }
  });


  app.controller('MainCtrl', ['$scope', '$http', 'FhTableDefinition', 'POST2GET_QueryParams',
      function($scope, $http, TableDefinition, POST2GET) {

    var params = $scope.tableSettings = new TableDefinition({
      items: {
        getter: itemsGetter,
        identifierFields: 'id',
        page: 1,
        pageSize: 20
      },
      orderBy: [['name', 'asc']]
    });

    function itemsGetter(payload) {
      return $http.get('/rest/notes/', {params: POST2GET(payload)});
    }
  }]);
})();
