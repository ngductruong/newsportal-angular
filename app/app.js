var application = angular.module('application', ['ngRoute', 'ngSanitize']);

// Routes configuration
application.config(function($routeProvider) 
{
	$routeProvider
		.when('/', 
		{
			controller : 'homeController',
			templateUrl :'app/views/homePage.html'
		})
		.when('/newsdetail/:newsId', 
		{
			controller : 'detailController',
			templateUrl: 'app/views/newsDetail.html'
		})
		.otherwise ({ 
			redirectTo : '/'
		});
});