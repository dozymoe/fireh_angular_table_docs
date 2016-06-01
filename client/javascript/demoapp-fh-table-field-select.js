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
            pageSize: 5
        },
        orderBy: [['created_at', 'desc']],

        eventHandlers: {
            // overrides fh-table-row event handlers because our `note.country`
            // is not an object of `country` as expected, but only stores its
            // `id` property
            draftSetField: _onDraftSetField,
            draftUnsetField: _onDraftUnsetField,
            draftUpdated: _onDraftUpdated
        }
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

    //// custom event handlers

    // if implemented as library it is called middleware
    //
    // `fhtable.middlewares` only listed the library names, while the middleware
    // instances themselves are in `fhtable.services`
    //
    // `this` is usually bound to object with fields: 'scope', 'fhtable',
    // 'nextCallback', and 'optionsGetter'

    function _onDraftSetField(event, item, fieldName, value, options) {
        // we are only interested with the field: `country`
        if (fieldName !== 'country') {
            return this.nextCallback(event, item, fieldName, value, options);
        }

        var widgetOptions = this.optionsGetter();

        if (options.formId !== widgetOptions.formId) {
            return this.nextCallback(event, item, fieldName, value, options);
        }

        var scope = this.scope;

        // don't store the entire object in this field, just its `id`
        scope.draft[fieldName] = value.id;

        this.fhtable.trigger('draftUpdated', scope.draft, item, options);

        // we drop next callback (presumably the widget's original)
    }

    function _onDraftUnsetField(event, item, fieldName, value, options) {
        // we are only interested with the field: `country`
        if (fieldName !== 'country') {
            return this.nextCallback(event, item, fieldName, value, options);
        }

        var widgetOptions = this.optionsGetter();

        if (options.formId !== widgetOptions.formId) {
            return this.nextCallback(event, item, fieldName, value, options);
        }

        var scope = this.scope;

        scope.draft[fieldName] = null;

        this.fhtable.trigger('draftUpdated', scope.draft, item, options);

        // we drop next callback (presumably the widget's original)
    }

    function _onDraftUpdated(event, draft, item, options) {
        this.nextCallback(event, draft, item, options);

        var widgetOptions = this.optionsGetter();

        if (options.formId !== widgetOptions.formId) { return; }

        var scope = this.scope;

        if (scope.data.modifiedFields) {
            scope.data.modifiedFields.country = draft.country !==
                    scope.original.country;
        }
    }
}]);
})();
