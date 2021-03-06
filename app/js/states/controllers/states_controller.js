module.exports = exports = function(app) {
  app.controller('StatesController', ['$scope', '$http', function($scope, $http) {
    $scope.states = []; // Will be bound to the array, will not look elsewhere
    $scope.errors = [];
    var defaults = {name: 'Washington', favoriteCity: 'Seattle'};
    $scope.newState = Object.create(defaults);

    $scope.getAll = function() {
    $http.get('/api/states') // Haven't told what to do once request has been completed
      .then(function(res) {  //  $http returns a q Promise that we call `then` on
        $scope.states = res.data;
      }, function(err) {
        console.log(err.data);
      });
    };

    $scope.create = function(state) {
      $http.post('/api/states', state)
        .then(function(res) {
          $scope.states.push(res.data);
          $scope.newState = Object.create(defaults);
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.update = function(state) {
      state.editing = false;
      $http.put('/api/states' + state._id, state)
      .then(function(res) {
        console.log('this state has a new name');
      }, function(err) {
        $scope.errors.push('could not get State: ' + state.name);
        console.log(err.data);
      });
    };

    $scope.remove = function(state) {
      $scope.states.splice($scope.states.indexOf(state), 1);
      $http.delete('/api/states' + state._id)
        .then(function(res) {
          console.log('State removed');
        }, function(err) {
          console.log(err.data);
          $scope.errors.push('could not remove State: ' + state.name);
          $scope.getAll();
        });
    };
  }]);
};
