(function() {
  var app = angular.module('fhTableBatchActionsDemo', [
      'angularMoment',
      'fireh_angular_table'
  ]);


  app.controller('MainCtrl', ['$scope', '$http', 'FhTableDefinition',
      function($scope, $http, TableDefinition) {

    var params = $scope.tableSettings = new TableDefinition({
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

    function itemsGetter(payload) {
      return $http.get('/rest/notes/',
          {params: params.POST2GETpayload(payload)}).then(

        function itemsGetSuccess(response) {
          _.forEach(response.data.items, function(item) {
              item.created_at = new moment(item.created_at);
              item.modified_at = new moment(item.modified_at);
          });
          return response.data;
        }
      );
    }

    function countriesGetter(payload) {
      return $http.get('/rest/countries/',
          {params: params.POST2GETpayload(payload)}).then(

        function countriesGetSuccess(response) {
          return response.data;
        }
      );
    }

    function authorsGetter(payload) {
      return $http.get('/rest/authors/',
          {params: params.POST2GETpayload(payload)}).then(

        function authorsGetSuccess(response) {
          return response.data;
        }
      );
    }


    $scope.createNote = function() {
      $scope.draft = {id: null};
      $scope.createNoteForm.$setPristine();

      $scope.isCreatingNote = true;
    };

    $scope.saveNote = function() {
      params.trigger('addItem', $scope.draft);
    };

    $scope.closeForm = function() {
      $scope.isCreatingNote = false;
    };

    $scope.infiniteScrollPopupInit = function(ish) {
      var drop_el = ish.$scrollContainer.closest('.dropdown');
      if (drop_el) {
        drop_el.on(
          'shown.bs.dropdown',
          function() {
            ish.$scrollContainer.trigger('scroll.infiniteScrollHelper');
          }
        );
      }
    };

    params.on('itemAdded', $scope.closeForm);

    params.on('addItem', function addNote(event, item) {
      $http.post('/rest/notes/', item).then(
        function addNoteSuccess(response) {
          params.trigger('itemAdded', response.data);
        }
      );
    });

    params.on('deleteItem', function deleteNote(event, item) {
      $http.delete('/rest/notes/' + item.id).then(
        function deleteNoteSuccess() {
          params.trigger('itemDeleted', item);
        }
      );
    });

    params.on('updateItemData', function editNote(event, newItem, oldItem) {
      $http.put('/rest/notes/' + oldItem.id, newItem).then(
        function editNoteSuccess(response) {
          params.trigger('itemDataUpdated', response.data, oldItem);
        }
      );
    });

    params.on('batchAction', function batchAction(event, name, items) {
        var now = new moment();

        _.forEach(items, function(item) {
            console.log(item);
            var newItem;

            if (name === 'touch') {
                newItem = _.clone(item);
                item.modified_at = now;
                params.trigger('updateItemData', newItem, item);
            } else if (name === 'delete') {
                params.trigger('deleteItem', item);
            }
        });
    });
  }]);
})();
