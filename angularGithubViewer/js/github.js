(function() {

	// on cree notre service
	var github = function ($http){

		var getUser = function(username){
			return $http.get("https://api.github.com/users/" + username)
			.then(function(response){
				return response.data;//when you return something from .then you will get back a promise //from then with the data.
   			});
		};

		var getRepos = function(user){
			return $http.get(user.repos_url).then(function(response){
				return response.data;
			});
		};


		var getRepoDetails = function(username, reponame){
			var repo;
			var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;

			return $http.get(repoUrl)
				.then(function(response){
					repo = response.data;
					return $http.get(repoUrl + "/contributors")
				})
				.then(function(response){
					repo.contributors = response.data;
					return repo;
				});
		};

		return { //this returns a github service
			getUser: getUser,
			getRepos: getRepos,
			getRepoDetails: getRepoDetails
		};

	};

	// on dit à angular de référer et enregistrer ce costum service au module principale de l'application pour que ça fonctionnne
	var module = angular.module("githubViewer");
	
	//j'enregistre mon service auprès de angular
	module.factory("github", github);//this will return a service called github

}());

