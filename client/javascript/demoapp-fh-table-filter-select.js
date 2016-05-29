(function() {
var app = angular.module('fhTableFilterSelectDemo', [
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
        filterDefinition: {
            author: {
                items: {
                    getter: authorsGetter,
                    identifierFields: 'author'
                },
                orderBy: [['author', 'asc']]
            },
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
            pageSize: 5
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

    function authorsGetter(payload) {
        return $http.get(
            '/rest/authors/',
            {
                params: fhtable.POST2GETpayload(payload)
            }).then(

            function authorsGetSuccess(response) {
                return response.data;
            });
    }

    //// scope functions

    // jQuery-infinite-scoll-helper didn't work when the html element with
    // scrollbar was not visible, for example having style `display:none`
    //
    // in our case the element was hidden because it is a popup content
    $scope.infiniteScrollPopupInit = function(ish) {
        var drop_el = ish.$scrollContainer.closest('.dropdown');
        if (!drop_el) { return; }

        drop_el.on(
            'shown.bs.dropdown',
            function() {
                ish.$scrollContainer.trigger('scroll.infiniteScrollHelper');
            });
    };
}]);
}());
