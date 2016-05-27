(function() {
var app = angular.module('fhTableDemo', [
    'angularMoment',
    'fireh_angular_table'
]);


app.controller('MainCtrl', ['$scope', '$http', 'FhTableDefinition',
        function($scope, $http, TableDefinition) {

    var params = $scope.tableSettings = new TableDefinition({
        items: {
            getter: itemsGetter,
            identifierFields: 'id',
            page: 1,
            pageSize: 20
        },
        orderBy: [['created_at', 'desc']]
    });

    function itemsGetter(payload) {
        return $http.get(
            '/rest/notes/',
            {
                params: params.POST2GETpayload(payload)
            })
            .then(
                function itemGetSuccess(response) {
                    _.forEach(response.data.items, function(item) {
                       item.created_at = new moment(item.created_at);
                       item.modified_at = new moment(item.modified_at);
                    });
                    return response.data;
                }
            );
    }
}]);
})();
