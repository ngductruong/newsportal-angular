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
		.when('/sharedView', 
		{
			controller : 'sharedController',
			templateUrl : 'app/views/shared.html'
		})
		.otherwise ({ 
			redirectTo : '/'
		});
});