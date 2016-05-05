(function() {
  var app = angular.module('fhTableRowDemo', [
      'angularMoment',
      'fireh_angular_table'
  ]);


  app.controller('MainCtrl', ['$scope', '$http', 'FhTableDefinition',
      function($scope, $http, TableDefinition) {

    var params = $scope.tableSettings = new TableDefinition({
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
  }]);
})();
