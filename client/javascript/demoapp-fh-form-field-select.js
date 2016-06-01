(function() {

var app = angular.module('fhFormFieldSelectDemo', [
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

    fhtable.on('addItem', function addNote(event, draft, item, options) {
        var submission = _.clone(draft);
        var now = new moment();

        // might be better if we were to use _.isObject() here
        if (submission.country) {
            submission.country = submission.country.id;
        }
        submission.created_at = now;
        submission.modified_at = now;

        fhtable.trigger('ajaxRequestStarted');

        $http.post(
            '/rest/notes/',
            submission).then(
                
            function addNoteSuccess(response) {
                var data = _.cloneDeep(response.data);
                data.country = {id: data.country};
                data.created_at = new moment(data.created_at);
                data.modified_at = new moment(data.modified_at);
                
                fhtable.trigger('itemAdded', data, item, options);

                fhtable.trigger('ajaxRequestFinished');
            },
            function addNoteFailed(error) {
                console.log(error);
                fhtable.trigger('ajaxRequestFinished');
            }
        );
    });

    //// scope functions

    // linked to the button that display note creation form, when the form was
    // filled with data, it will trigger event `editingBegin`
    $scope.createNote = function() {
        $scope.createNoteForm.$setPristine();
        fhtable.trigger(
            'updateFormData',
            {
                id: null
            },
            {
                formId: 'createNoteForm'
            });
    };

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

    //// events

    fhtable.on('formDataUpdated', function(event, item, draft, options) {
        if (options.formId !== 'createNoteForm') { return; }

        // sorry for the round about way to just showing the form
        fhtable.trigger('editingBegin', draft, item, options);
    });

    fhtable.on('editingBegin', function(event, draft, item, options) {
        if (options.formId !== 'createNoteForm') { return; }

        // show note creation form
        $scope.isCreatingNote = true;
    });

    fhtable.on('editingEnd', function(event, draft, item, options) {
        if (options.formId !== 'createNoteForm') { return; }

        // close note creation form
        $scope.isCreatingNote = false;
    });
}]);
}());
