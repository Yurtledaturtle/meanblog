console.log("..app.js loaded");

angular.module('ChatApp', []);

angular.module('ChatApp')
  .controller('ChatsController', ['$scope', '$http', function($scope, $http){
    $scope.welcomeMessage = 'Welcome to the hOWLr, why don\'t you give a hoot?';

    $scope.chats = [];

    $http.get('/api/chats').then(function(response){
      $scope.chats = response.data;
    });

    $scope.socket = io();

$scope.newChat = {};
$scope.sendChat = function(){
  $scope.socket.emit('sending message', $scope.newChat)
};

$scope.socket.on('emitting message', function(message){
  $scope.chats.push(message);
  $scope.$digest();
});

}]);



//
// angular.module('RecipeMaster', ['ngCookies']);
//
// angular.module('RecipeMaster')
//   .controller('UsersController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){
//
//     $scope.welcome = "Can never have too many cooks here!";
//
//     $scope.users = [];
//     $scope.newUser = {};
//     $scope.logInUser = {};
//     $scope.newRecipe = {name: '', items:[{}]};
//
//     $scope.getUsers = function(){
//       $http.get('/api/users').then(function(response){
//         $scope.users = response.data;
//       });
//     };
//     $scope.getUsers();
//
//     $scope.createUser = function(){
//       $http.post('/api/users', $scope.newUser).then(function(response){
//         $scope.users.push(response.data);
//         $scope.newUser = {};
//       });
//     };
//
//     $scope.createRecipe = function(){
//       $http({
//         url: '/api/recipes',
//         method: 'post',
//         headers:{
//           token: $scope.token
//         },
//         data: $scope.newRecipe
//       }).then(function(response){
//         $scope.getUsers();
//         $scope.newRecipe = {name: '', items:[{}]};
//       });
//     };
//
//     $scope.addItemLocation = function(){
//       $scope.newRecipe.items.push({});
//     };
//
//     $scope.obtainToken = function(){
//       $http.post("/api/users/authentication_token", $scope.logInUser).then(function(reponse){
//         $scope.token = reponse.data.token;
//         $cookies.put('token', $scope.token);
//       });
//     };
//
//     $scope.logOut = function(){
//       $cookies.remove('token');
//       $scope.token = $cookies.get('token');
//     };
//
//     $scope.token = $cookies.get('token');
//
//   }]);
