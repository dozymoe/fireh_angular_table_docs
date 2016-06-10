(function() {
var app = angular.module('firehAngularTableDemo', [
    'ngRoute'
]);


app.controller('MainCtrl', function($scope) {
});


app.config(['$routeProvider', function($router) {
    $router
        .when('/', {
            templateUrl: '/partials/summary.html',
            controller: function() {
                document.title = 'Summary | FirehAngularTable';
            }
        })

        .when('/options', {
            templateUrl: '/partials/options.html',
            controller: function() {
                document.title = 'Options | FirehAngularTable';
            }
        })

        .when('/mixins', {
            templateUrl: '/partials/mixins.html',
            controller: function() {
                document.title = 'Mixins | FirehAngularTable';
            }
        })

        .when('/mixins/fh-custom-event-handlers-mixin', {
            templateUrl: '/partials/mixins/fh-custom-event-handlers-mixin.html',
            controller: function() {
                document.title = 'FhCustomEventHandlersMixin | ' +
                        'FirehAngularTable';
            }
        })

        .when('/mixins/fh-element-id-mixin', {
            templateUrl: '/partials/mixins/fh-element-id-mixin.html',

            controller: function() {
                document.title = 'FhElementIdMixin | FirehAngularTable';
            }
        })

        .when('/mixins/fh-event-handlers-mixin', {
            templateUrl: '/partials/mixins/fh-event-handlers-mixin.html',

            controller: function() {
                document.title = 'FhEventHandlersMixin | FirehAngularTable';
            }
        })

        .when('/mixins/fh-form-id-mixin', {
            templateUrl: '/partials/mixins/fh-form-id-mixin.html',
            controller: function() {
                document.title = 'FhFormIdMixin | FirehAngularTable';
            }
        })

        .when('/mixins/fh-middlewares-mixin', {
            templateUrl: '/partials/mixins/fh-middlewares-mixin.html',
            controller: function() {
                document.title = 'FhMiddlewaresMixin | FirehAngularTable';
            }
        })

        .when('/mixins/fh-selected-items-mixin', {
            templateUrl: '/partials/mixins/fh-selected-items-mixin.html',
            controller: function() {
                document.title = 'FhSelectedItemsMixin | FirehAngularTable';
            }
        })

        .when('/mixins/fh-table-definition-mixin', {
            templateUrl: '/partials/mixins/fh-table-definition-mixin.html',
            controller: function() {
                document.title = 'FhTableDefinitionMixin | FirehAngularTable';
            }
        })

        .when('/mixins/fh-table-list-resource-controller-mixin', {
            templateUrl: '/partials/mixins/fh-table-list-resource-controller-mixin.html',

            controller: function() {
                document.title = 'FhTableListResourceControllerMixin | ' +
                        'FirehAngularTable';
            }
        })

        .when('/mixins/fh-transclude-child-elements-mixin', {
            templateUrl: '/partials/mixins/fh-transclude-child-elements-mixin.html',

            controller: function() {
                document.title = 'FhTranscludeChildElementsMixin | ' +
                        'FirehAngularTable';
            }
        })

        //// widgets

        .when('/widgets', {
            templateUrl: '/partials/widgets.html',
            controller: function() {
                document.title = 'Widgets | FirehAngularTable';
            }
        })

        .when('/widgets/fh-form', {
            templateUrl: '/partials/widgets/fh-form.html',
            controller: function() {
                document.title = 'FhForm widget | FirehAngularTable';
            }
        })

        .when('/widgets/fh-form-field-select', {
            templateUrl: '/partials/widgets/fh-form-field-select.html',
            controller: function() {
                document.title = 'FhFormFieldSelect widget | FirehAngularTable';
            }
        })

        .when('/widgets/fh-infinite-scroll', {
            templateUrl: '/partials/widgets/fh-infinite-scroll.html',
            controller: function() {
                document.title = 'FhInfiniteScroll widget | FirehAngularTable';
            }
        })

        .when('/widgets/fh-table', {
            templateUrl: '/partials/widgets/fh-table.html',
            controller: function() {
                document.title = 'FhTable widget | FirehAngularTable';
            }
        })

        .when('/widgets/fh-table-batch-actions', {
            templateUrl: '/partials/widgets/fh-table-batch-actions.html',
            controller: function() {
                document.title =
                        'FhTableBatchActions widget | FirehAngularTable';
            }
        })

        .when('/widgets/fh-table-field-select', {
            templateUrl: '/partials/widgets/fh-table-field-select.html',
            controller: function() {
                document.title =
                        'FhTableFieldSelect widget | FirehAngularTable';
            }
        })

        .when('/widgets/fh-table-filter-select', {
            templateUrl: '/partials/widgets/fh-table-filter-select.html',
            controller: function() {
                document.title =
                        'FhTableFilterSelect widget | FirehAngularTable';
            }
        })

        .when('/widgets/fh-table-filter-text', {
            templateUrl: '/partials/widgets/fh-table-filter-text.html',
            controller: function() {
                document.title = 'FhTableFilterText widget | FirehAngularTable';
            }
        })

        .when('/widgets/fh-table-pager', {
            templateUrl: '/partials/widgets/fh-table-pager.html',
            controller: function() {
                document.title = 'FhTablePager widget | FirehAngularTable';
            }
        })

        .when('/widgets/fh-table-pager-size', {
            templateUrl: '/partials/widgets/fh-table-pager-size.html',
            controller: function() {
                document.title = 'FhTablePagerSize widget | FirehAngularTable';
            }
        })

        .when('/widgets/fh-table-row', {
            templateUrl: '/partials/widgets/fh-table-row.html',
            controller: function() {
                document.title = 'FhTableRow widget | FirehAngularTable';
            }
        })

        .when('/widgets/fh-table-sorting', {
            templateUrl: '/partials/widgets/fh-table-sorting.html',
            controller: function() {
                document.title = 'FhTableSorting widget | FirehAngularTable';
            }
        })

        //// widget-helpers

        .when('/widget-helpers/fhf-editable-field', {
            templateUrl: '/partials/widget-helpers/fhf-editable-field.html',
            controller: function() {
                document.title = 'FhfEditableField widget | FirehAngularTable';
            }
        })

        .when('/widget-helpers/fh-transcluded', {
            templateUrl: '/partials/widget-helpers/fh-transcluded.html',
            controller: function() {
                document.title = 'FhTranscluded attribute | FirehAngularTable';
            }
        })

        .when('/widget-helpers/fh-transclude-pane', {
            templateUrl: '/partials/widget-helpers/fh-transclude-pane.html',
            controller: function() {
                document.title = 'FhTranscludePane attribute | ' +
                        'FirehAngularTable';
            }
        })

        //// events

        .when('/events', {
            templateUrl: '/partials/events.html',
            controller: function() {
                document.title = 'Events | FirehAngularTable';
            }
        })

        .when('/events/add-editable-field', {
            templateUrl: '/partials/events/add-editable-field.html',
            controller: function() {
                document.title = 'addEditableField event | FirehAngularTable';
            }
        })

        .when('/events/add-item', {
            templateUrl: '/partials/events/add-item.html',
            controller: function() {
                document.title = 'addItem event | FirehAngularTable';
            }
        })

        .when('/events/add-multiple-values-filter', {
            templateUrl: '/partials/events/add-multiple-values-filter.html',
            controller: function() {
                document.title = 'addMultipleValuesFilter event | ' +
                        'FirehAngularTable';
            }
        })

        .when('/events/ajax-request-finished', {
            templateUrl: '/partials/events/ajax-request-finished.html',
            controller: function() {
                document.title = 'ajaxRequestFinished event | ' +
                        'FirehAngularTable';
            }
        })

        .when('/events/ajax-request-started', {
            templateUrl: '/partials/events/ajax-request-started.html',
            controller: function() {
                document.title = 'ajaxRequestStarted event | FirehAngularTable';
            }
        })

        .when('/events/batch-action', {
            templateUrl: '/partials/events/batch-action.html',
            controller: function() {
                document.title = 'batchAction event | FirehAngularTable';
            }
        })

        .when('/events/delete-item', {
            templateUrl: '/partials/events/delete-item.html',
            controller: function() {
                document.title = 'deleteItem event | FirehAngularTable';
            }
        })

        .when('/events/deselect-all-items', {
            templateUrl: '/partials/events/deselect-all-items.html',
            controller: function() {
                document.title = 'deselectAllItems event | FirehAngularTable';
            }
        })

        .when('/events/deselect-item', {
            templateUrl: '/partials/events/deselect-item.html',
            controller: function() {
                document.title = 'deselectItem event | FirehAngularTable';
            }
        })

        .when('/events/draft-set-field', {
            templateUrl: '/partials/events/draft-set-field.html',
            controller: function() {
                document.title = 'draftSetField event | FirehAngularTable';
            }
        })

        .when('/events/draft-unset-field', {
            templateUrl: '/partials/events/draft-unset-field.html',
            controller: function() {
                document.title = 'draftUnsetField event | FirehAngularTable';
            }
        })

        .when('/events/draft-updated', {
            templateUrl: '/partials/events/draft-updated.html',
            controller: function() {
                document.title = 'draftUpdated event | FirehAngularTable';
            }
        })

        .when('/events/editing-begin', {
            templateUrl: '/partials/events/editing-begin.html',
            controller: function() {
                document.title = 'editingBegin event | FirehAngularTable';
            }
        })

        .when('/events/editing-end', {
            templateUrl: '/partials/events/editing-end.html',
            controller: function() {
                document.title = 'editingEnd event | FirehAngularTable';
            }
        })

        .when('/events/fetch-items', {
            templateUrl: '/partials/events/fetch-items.html',
            controller: function() {
                document.title = 'fetchItems event | FirehAngularTable';
            }
        })

        .when('/events/filter-updated', {
            templateUrl: '/partials/events/filter-updated.html',
            controller: function() {
                document.title = 'filterUpdated event | FirehAngularTable';
            }
        })

        .when('/events/form-data-updated', {
            templateUrl: '/partials/events/form-data-updated.html',
            controller: function() {
                document.title = 'formDataUpdated event | FirehAngularTable';
            }
        })

        .when('/events/item-added', {
            templateUrl: '/partials/events/item-added.html',
            controller: function() {
                document.title = 'itemAdded event | FirehAngularTable';
            }
        })

        .when('/events/item-add-failed', {
            templateUrl: '/partials/events/item-add-failed.html',
            controller: function() {
                document.title = 'itemAddFailed event | FirehAngularTable';
            }
        })

        .when('/events/item-data-updated', {
            templateUrl: '/partials/events/item-data-updated.html',
            controller: function() {
                document.title = 'itemDataUpdated event | FirehAngularTable';
            }
        })

        .when('/events/item-data-update-failed', {
            templateUrl: '/partials/events/item-data-update-failed.html',
            controller: function() {
                document.title = 'itemDataUpdateFailed event | ' +
                        'FirehAngularTable';
            }
        })

        .when('/events/item-deleted', {
            templateUrl: '/partials/events/item-deleted.html',
            controller: function() {
                document.title = 'itemDeleted event | FirehAngularTable';
            }
        })

        .when('/events/item-delete-failed', {
            templateUrl: '/partials/events/item-delete-failed.html',
            controller: function() {
                document.title = 'itemDeleteFailed event | FirehAngularTable';
            }
        })

        .when('/events/item-deselected', {
            templateUrl: '/partials/events/item-deselected.html',
            controller: function() {
                document.title = 'itemDeselected event | FirehAngularTable';
            }
        })

        .when('/events/item-selected', {
            templateUrl: '/partials/events/item-selected.html',
            controller: function() {
                document.title = 'itemSelected event | FirehAngularTable';
            }
        })

        .when('/events/items-total-updated', {
            templateUrl: '/partials/events/items-total-updated.html',
            controller: function() {
                document.title = 'itemsTotalUpdated event | FirehAngularTable';
            }
        })

        .when('/events/items-updated', {
            templateUrl: '/partials/events/items-updated.html',
            controller: function() {
                document.title = 'itemsUpdated event | FirehAngularTable';
            }
        })

        .when('/events/items-update-failed', {
            templateUrl: '/partials/events/items-update-failed.html',
            controller: function() {
                document.title = 'itemsUpdateFailed event | FirehAngularTable';
            }
        })

        .when('/events/order-updated', {
            templateUrl: '/partials/events/order-updated.html',
            controller: function() {
                document.title = 'orderUpdated event | FirehAngularTable';
            }
        })

        .when('/events/page-offset-updated', {
            templateUrl: '/partials/events/page-offset-updated.html',
            controller: function() {
                document.title = 'pageOffsetUpdated event | FirehAngularTable';
            }
        })

        .when('/events/page-size-updated', {
            templateUrl: '/partials/events/page-size-updated.html',
            controller: function() {
                document.title = 'pageSizeUpdated event | FirehAngularTable';
            }
        })

        .when('/events/remove-multiple-values-filter', {
            templateUrl: '/partials/events/remove-multiple-values-filter.html',
            controller: function() {
                document.title = 'removeMultipleValuesFilter event | ' +
                        'FirehAngularTable';
            }
        })

        .when('/events/reset-draft', {
            templateUrl: '/partials/events/reset-draft.html',
            controller: function() {
                document.title = 'resetDraft event | FirehAngularTable';
            }
        })

        .when('/events/reset-items', {
            templateUrl: '/partials/events/reset-items.html',
            controller: function() {
                document.title = 'resetItems event | FirehAngularTable';
            }
        })

        .when('/events/select-all-items', {
            templateUrl: '/partials/events/select-all-items.html',
            controller: function() {
                document.title = 'selectAllItems event | FirehAngularTable';
            }
        })

        .when('/events/select-item', {
            templateUrl: '/partials/events/select-item.html',
            controller: function() {
                document.title = 'selectItem event | FirehAngularTable';
            }
        })

        .when('/events/set-order', {
            templateUrl: '/partials/events/set-order.html',
            controller: function() {
                document.title = 'setOrder event | FirehAngularTable';
            }
        })

        .when('/events/set-page-offset', {
            templateUrl: '/partials/events/set-page-offset.html',
            controller: function() {
                document.title = 'setPageOffset event | FirehAngularTable';
            }
        })

        .when('/events/set-page-size', {
            templateUrl: '/partials/events/set-page-size.html',
            controller: function() {
                document.title = 'setPageSize event | FirehAngularTable';
            }
        })

        .when('/events/set-single-value-filter', {
            templateUrl: '/partials/events/set-single-value-filter.html',
            controller: function() {
                document.title = 'setSingleValueFilter event | ' +
                        'FirehAngularTable';
            }
        })

        .when('/events/update-form-data', {
            templateUrl: '/partials/events/update-form-data.html',
            controller: function() {
                document.title = 'updateFormData event | FirehAngularTable';
            }
        })

        .when('/events/update-item-data', {
            templateUrl: '/partials/events/update-item-data.html',
            controller: function() {
                document.title = 'updateItemData event | FirehAngularTable';
            }
        })
    ;
}]);
}());
