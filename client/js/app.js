angular.module('ArmchairPhilosophy', ['ngCookies']);

angular.module('ArmchairPhilosophy')
  .controller('UsersController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

    $scope.welcome = "Philosophize!";

    $scope.users = [];
    $scope.newUser = {};
    $scope.logInUser = {};
    $scope.newReflection = {name: '', items:[{}]};

    $scope.getUsers = function(){
      $http.get('/api/users').then(function(response){
        $scope.users = response.data;
      });
    };
    $scope.getUsers();

    $scope.createUser = function(){
      $http.post('/api/users', $scope.newUser).then(function(response){
        $scope.users.push(response.data);
        $scope.newUser = {};
      });
    };

    $scope.createReflection = function(){
      $http({
        url: '/api/reflections',
        method: 'post',
        headers:{
          token: $scope.token
        },
        data: $scope.newReflection
      }).then(function(response){
        $scope.getUsers();
        $scope.newReflection = {name: '', items:[{}]};
      });
    };

    $scope.addItemLocation = function(){
      $scope.newReflection.items.push({});
    };

    $scope.obtainToken = function(){
      $http.post("/api/users/authentication_token", $scope.logInUser).then(function(reponse){
        $scope.token = reponse.data.token;
        $cookies.put('token', $scope.token);
      });
    };

    $scope.logOut = function(){
      $cookies.remove('token');
      $scope.token = $cookies.get('token');
    };

    $scope.token = $cookies.get('token');

  }]);
