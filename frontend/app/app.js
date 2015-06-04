'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.recipes',
    'myApp.recipeDetail',
    'myApp.addRecipe',
    'myApp.auth',
    'myApp.User',
    'myApp.version',
    'restangular'

]).

    config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/recipes'});
        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setRequestSuffix('/');
    }])

    .controller('AppCtrl', ['$scope', 'User', '$location', 'Restangular', function ($scope, User, $location, Restangular) {
		var token = sessionStorage.getItem(User.token_name);

		if (token) {
			Restangular.setDefaultHeaders({Authorization: 'Token ' + token});
			User.getInfo().then(function () {
				$location.path('/recipes');
			});
		}

		$scope.logout = function () {
			User.logout();
			$scope.user = null;
			$location.path('/login');
		};

		$scope.$on(User.update_broadcast, function () {
			$scope.user = User.info;
		});

		$scope.$on('$routeChangeStart', function (event, next) {
			if (next.$$route != undefined) {
				var nextRoute = next.$$route.originalPath;
				if (User.info.id === undefined && (nextRoute != '/register' && nextRoute != '/login')) {
					$location.path('/login');
				}
			}
		});
	}]);
