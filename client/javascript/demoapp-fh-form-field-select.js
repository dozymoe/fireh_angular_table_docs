(function() {
  var app = angular.module('fhFormFieldSelectDemo', [
    'angularMoment',
    'fireh_angular_table'
  ]);


  app.controller('MainCtrl', ['$scope', '$http', 'FhTableDefinition',
      function($scope, $http, TableDefinition) {

    var params = $scope.tableSettings = new TableDefinition({
      eventHandlers: {
        // overrides fh-table-row event handlers because our `note.country`
        // is not an object of `country` as expected, but only stores its
        // `id` property
        draftSetField: _onDraftSetField,
        draftUnsetField: _onDraftUnsetField
      },

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
      $scope.createNoteForm.$setPristine();
      params.trigger(
        'updateFormData',
        {
          id: null
        },
        {
          formName: 'createNoteForm'
        });
    };

    $scope.infiniteScrollModalInit = function(ish) {
      var drop_el = ish.$scrollContainer.closest('.modal');
      if (drop_el) {
        drop_el.on(
          'shown.bs.modal',
          function() {
            ish.$scrollContainer.trigger('scroll.infiniteScrollHelper');
          }
        );
      }
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

    params.on('addItem', function addNote(event, item, options) {
      $http.post('/rest/notes/', item).then(
        function addNoteSuccess(response) {
          params.trigger('itemAdded', response.data, item, options);
        }
      );
    });

    params.on('deleteItem', function deleteNote(event, item, options) {
      $http.delete('/rest/notes/' + item.id).then(
        function deleteNoteSuccess() {
          params.trigger('itemDeleted', item, options);
        }
      );
    });

    params.on('editingBegin', function(event, draft, item, options) {
        if (options.formName !== 'createNoteForm') { return; }
        $scope.isCreatingNote = true;
    });

    params.on('editingEnd', function(event, draft, item, options) {
        if (options.formName !== 'createNoteForm') { return; }
        $scope.isCreatingNote = false;
    });

    params.on('updateItemData', function editNote(event, newItem, oldItem,
        options) {

      $http.put('/rest/notes/' + oldItem.id, newItem).then(
        function editNoteSuccess(response) {
          params.trigger('itemDataUpdated', response.data, oldItem, options);
        }
      );
    });

    params.on('batchAction', function batchAction(event, name, items) {
      var now = new moment();

      _.forEach(items, function(item) {
        var newItem;

        if (name === 'touch') {
          newItem = _.clone(item);
          item.modified_at = now;
          params.trigger(
            'updateItemData',
            newItem,
            item,
            {
              formName: 'createNoteForm'
            });
        } else if (name === 'delete') {
          params.trigger(
            'deleteItem',
            item,
            {
              formName: 'createNoteForm'
            });
        }
      });
    });

    //// custom event handlers

    function _onDraftSetField(event, item, fieldName, value, options) {
      if (fieldName !== 'country') {
        return this.oldCallback(event, item, fieldName, value, options);
      }

      var params = this.params;
      var scope = this.scope;

      if (params.isItemsEqual(scope.original, item)) {
        scope.draft[fieldName] = value.id;
        params.trigger('draftUpdated', scope.draft, options);
      }
    }

    function _onDraftUnsetField(event, item, fieldName, value, options) {
      if (fieldName !== 'country') {
        return this.oldCallback(event, item, fieldName, value, options);
      }

      var params = this.params;
      var scope = this.scope;

      if (params.isItemsEqual(scope.original, item) &&
          scope.draft[fieldName] !== value.id) {

        scope.draft[fieldName] = null;
        params.trigger('draftUpdated', scope.draft, options);
      }
    }
  }]);
})();
