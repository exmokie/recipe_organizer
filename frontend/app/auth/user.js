'use strict';

angular.module('myApp.User', [])

    .service('User', function (Restangular, $rootScope) {
        var user = {};

        user.info = {};

        user.registration = function (user_info) {
			return Restangular.one(user.urls.register_user).customPOST(user_info).then(function () {
				return user.login(user_info);
			});
		};

		user.login = function (credentials) {
			return Restangular.one(user.urls.get_token).customPOST(credentials).then(function (data) {
				sessionStorage.setItem(user.token_name, data.token);
				Restangular.setDefaultHeaders({Authorization: 'Token ' + data.token});
                $rootScope.loggedin=false;
				return user.getInfo();
			});
		};

		user.getInfo = function () {
			return Restangular.one(user.urls.get_user_info).customGET().then(function (data) {
				user.info = data;
				$rootScope.$broadcast(user.update_broadcast);
			});
		};

		user.logout = function () {
			user.info = {};
			sessionStorage.removeItem(user.token_name);
			Restangular.setDefaultHeaders({Authorization: ""});
            $rootScope.loggedin=true;
		};

		// User constants
		user.token_name = 'auth-token';
		user.update_broadcast = 'user-updated';
		user.urls = {
			get_token: 'obtain-auth-token/',
			get_user_info: 'get-user-info/',
			register_user: 'register-user/'
		};
        return user
    });



