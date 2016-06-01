(function() {
var app = angular.module('fhTableBatchActionsDemo', [
    'angularMoment',
    'fireh_angular_table'
]);


app.controller('MainCtrl', [
    '$scope',
    '$http',
    'FhTableDefinition',
    function(
        $scope,
        $http,
        TableDefinition) {

    var fhtable = $scope.tableSettings = new TableDefinition({
        items: {
            getter: itemsGetter,
            identifierFields: 'id',
            page: 1,
            pageSize: 20
        },
        orderBy: [['created_at', 'desc']]
    });

    // to clean up manually, later call fhtable.destroy();

    //// CRUD

    function itemsGetter(payload) {
        return $http.get(
            '/rest/notes/',
            {
                params: fhtable.POST2GETpayload(payload)
            }).then(

            function itemsGetSuccess(response) {
                _.forEach(response.data.items, function(item) {
                    item.created_at = new moment(item.created_at);
                    item.modified_at = new moment(item.modified_at);
                });
                return response.data;
            });
    }

    //// events

    fhtable.on('batchAction', function batchAction(event, name, items,
            options) {

        var now = new moment();

        _.forEach(items, function(item) {
            if (name === 'touch') {
                var draft = _.cloneDeep(item);
                draft.modified_at = now;

                fhtable.trigger('updateItemData', draft, item, options);
            } else if (name === 'delete') {
                fhtable.trigger('deleteItem', item, options);
            }
        });
    });
}]);
}());
