var application = angular.module('application', ['ngRoute', 'ngSanitize']);

// Routes configuration
application.config(function($routeProvider) 
{
	$routeProvider
		.when('/', 
		{
			controller : 'homeController',
			templateUrl :'app/js/views/homePage.html'
		})
		.when('/newsdetail/:newsId', 
		{
			controller : 'detailController',
			templateUrl: 'app/js/views/newsDetail.html'
		})
		.when('/sharedView', 
		{
			controller : 'sharedController',
			templateUrl : 'app/js/views/shared.html'
		})
		.otherwise ({ 
			redirectTo : '/'
		});
});

