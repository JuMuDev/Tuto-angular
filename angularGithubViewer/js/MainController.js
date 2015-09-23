//on va travailler avec l'API GITHUB

// sur les users : https://api.github.com/users/robconery
//sur les repository : https://api.github.com/users/robconery/repos
//sur les collaborateurs : https://api.github.com/repos/angular/angular.js/contributors

//fonction qui s'auto invoque
(function(){

//keep things out of the global namespace (car pas bien) -- on utilise le module pour çà
//module qui englobe toute l'application
var app = angular.module("githubViewer");

//On définit le MainController et on passe les services qu'on vas utiliser en parametre
var MainController = function($scope, $interval, $location){

  
  	var decrementCountdown = function(){
  		$scope.countdown -= 1;
  		if($scope.countdown < 1){
  			$scope.search($scope.username);
  		}
  	};

  	// pour annuler le compte à rebour si on clic avant la fin du décompte
  	var countdownInterval = null;

  	var startCountdown = function(){
  		// le service internaval va appelé la fonction decrementCountdown toutes les 
  		//seconde et stop apres 5 interval (si on specifi pas la fin il s'arrete pas tout seul)
  		countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
  	};

  	//function appeler lors de la soumission du formulaire
  	$scope.search = function(username){
    if(countdownInterval){
  			// pour annuler le compte à rebour si on clic avant la fin du décompte
  			$interval.cancel(countdownInterval);
  			//effacer le countdown de l'écran
  			$scope.countdown = null;
  		}

      // tell the location service to move us somehere else
      $location.path("/user/" + username);
  	};

  	$scope.username = "angular"
  	$scope.countdown = 10;
  	startCountdown();

  };

  //On dit à notre application qu'il y a un controller à utiliser, et ce controller est MainController
  //On utilise le array pour la minification du script et on spécifie à angular les paramettre dont on aura besoin dans le main controller car angular à tendance à renommer ces parametres lors de la minification...)
  app.controller("MainController",["$scope", "$interval", "$location", MainController]); //name and then function in app.controller
// the array tells the controller that you need $scope and $http variables
//if you ever use minification on this javascript since it replaces variable names
//This required removing $http and using github instead REMEMBER THE ORDER OF VARIABLES MUST BE THE SAME
//FROM THE MainController function to the app.controller array.
}());