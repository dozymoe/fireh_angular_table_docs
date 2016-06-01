(function() {
var app = angular.module('fhTableFieldSelectDemo', [
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
        fieldDefinition: {
            country: {
                items: {
                    getter: countriesGetter,
                    identifierFields: 'id',
                    pageSize: 10
                },
                orderBy: [['name', 'asc']]
            }
        },
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
                    item.country = {id: item.country};
                    item.created_at = new moment(item.created_at);
                    item.modified_at = new moment(item.modified_at);
                });
                return response.data;
            });
    }

    function countriesGetter(payload) {
        return $http.get(
            '/rest/countries/',
            {
                params: fhtable.POST2GETpayload(payload)
            }).then(

            function countriesGetSuccess(response) {
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

    fhtable.on('updateItemData', function editNote(event, draft, item,
            options) {

        var submission = _.clone(draft);

        // might be better if we were to use _.isObject() here
        if (submission.country) {
            submission.country = submission.country.id;
        }
        submission.modified_at = new moment();

        fhtable.trigger('ajaxRequestStarted');

        $http.put(
            '/rest/notes/' + item.id,
            submission).then(

            function editNoteSuccess(response) {
                var data = _.cloneDeep(response.data);
                data.country = {id: data.country};
                data.created_at = new moment(data.created_at);
                data.modified_at = new moment(data.modified_at);
                
                fhtable.trigger('itemDataUpdated', data, item, options);

                fhtable.trigger('ajaxRequestFinished');
            },
            function editNoteFailed(error) {
                console.log(error);
                fhtable.trigger('ajaxRequestFinished');
            }
        );
    });

    //// scope functions

    // jQuery-infinite-scoll-helper didn't work when the html element with
    // scrollbar was not visible, for example having style `display:none`
    //
    // in our case the element was hidden because it is a modal dialog's content
    $scope.infiniteScrollModalInit = function(ish) {
        var modal_el = ish.$scrollContainer.closest('.modal');
        if (!modal_el) { return; }

        modal_el.on(
            'shown.bs.modal',
            function() {
                ish.$scrollContainer.trigger('scroll.infiniteScrollHelper');
            });
    };
}]);
})();
