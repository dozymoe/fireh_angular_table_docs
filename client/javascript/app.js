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
    ;
}]);
}());
