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

        .when('/widget-helpers/fh-transcluded', {
            templateUrl: '/partials/widget-helpers/fh-transcluded.html',
            controller: function() {
                document.title = 'FhTranscluded attribute | FirehAngularTable';
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
