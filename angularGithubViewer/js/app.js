(function(){

	var app = angular.module("githubViewer", ["ngRoute"]); //ngRoute is another module that my module needs
	
	// here a configuration function to run
	app.config(function($routeProvider){
		$routeProvider
			.when("/main", {  // when you see this URL, use this template, controller, etc.
				templateUrl : "main.html",
				controller : "MainController"
			})

			.when("/user/:username",{
				templateUrl: "user.html",
				controller: "UserController"
			})

			.when("/repo/:username/:reponame" , {
				templateUrl: "repo.html",
				controller: "RepoController"
			})

			//if you see an url you dont understand
			.otherwise({redirectTo:"/main"});
		});

}());



