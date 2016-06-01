(function() {
var app = angular.module('fhTableRowDemo', [
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
            pageSize: 5
        },
        orderBy: [['created_at', 'desc']]
    });

    // to clean up manually, later call fhtable.destroy();

    //// CRUD

    function itemsGetter(payload) {
        return $http.get('/rest/notes/',
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

    fhtable.on('deleteItem', function deleteNote(event, item, options) {
        fhtable.trigger('ajaxRequestStarted');

        $http.delete(
            '/rest/notes/' + item.id).then(
                
            function deleteNoteSuccess() {
                fhtable.trigger('itemDeleted', item, options);

                fhtable.trigger('ajaxRequestFinished');
            },
            function deleteNoteFailed(error) {
                console.log(error);
                fhtable.trigger('ajaxRequestFinished');
            }
        );
    });

    fhtable.on('updateItemData', function editNote(event, newItem, oldItem,
            options) {

        fhtable.trigger('ajaxRequestStarted');

        $http.put(
            '/rest/notes/' + oldItem.id,
            newItem).then(

            function editNoteSuccess(response) {
                fhtable.trigger('itemDataUpdated', response.data, oldItem,
                        options);

                fhtable.trigger('ajaxRequestFinished');
            },
            function editNoteFailed(error) {
                console.log(error);
                fhtable.trigger('ajaxRequestFinished');
            }
        );
    });
}]);
}());
