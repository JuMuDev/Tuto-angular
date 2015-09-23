
//===================================================================================

		// 5) Le routing

//====================================================================================

//fonction qui s'auto provoque
(function(){

//module qui qui fait référence à notre application
var app = angular.module("githubViewer");

//On définit le MainController et on passe les services qu'on vas utiliser en parametre
var UserController = function($scope, github, $routeParams){

  	//fonction a appeler des qu'on trouve les donnees demandées ; ici le user
  	var onUserComplete = function(data){
  		$scope.user = data;
  		github.getRepos($scope.user).then(onRepos, onError);
  	};


  	//fonction a appeler des qu'on trouve les donnees demandées ; ici les repository 
  	var onRepos = function(data){
  		$scope.repos = data;
  	};

  	//fonction si une erreur est survenue lors de la requête
  	var onError = function (reason){
  		$scope.error = "Could not fetch the data";
  	};

  	$scope.username = $routeParams.username;
  	$scope.repoSortOrder = "-stargazers_count";
  	github.getUser($scope.username).then(onUserComplete, onError);
  };

  //On dit à notre application qu'il y a un controller à utiliser, et ce controller est MainController
  //On utilise le array pour la minification du script et on spécifie à angular les paramettre dont on aura besoin dans le main controller car angular à tendance à renommer ces parametres lors de la minification...)
  app.controller("UserController",["$scope", "github", "$routeParams", UserController]); //name and then function in app.controller
// the array tells the controller that you need $scope and $http variables
//if you ever use minification on this javascript since it replaces variable names
//This required removing $http and using github instead REMEMBER THE ORDER OF VARIABLES MUST BE THE SAME
//FROM THE MainController function to the app.controller array.
}());