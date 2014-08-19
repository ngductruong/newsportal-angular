
/* 
* HOME CONTROLLER
* Displaying homepage
*/

application.controller('menuController', function($scope, httpFactory, constantsFactory){

	$scope.categories = [];

	// Get configuration
	var key = constantsFactory.AuthorizationKey;
	
	// Get categories
	httpFactory.GetCategories(key)
	.success(function(response) {


 		$scope.categories = response;


	});
	
});

application.controller('categoryHomepageController', function($scope, httpFactory, constantsFactory){
	var key = constantsFactory.AuthorizationKey;

	$scope.areas = [];

	// Get areas
	init();

	function init() {
		// Get areas from server
		var areaPromise = httpFactory.GetAreas(key);

		// Success callback
		areaPromise.success(function(response){
			console.log('AREAS---------------');
			console.log(response);

			for(var i = 0; i < response.length; i++) {
				$scope.areas.push({
					Name : response[i].AreaName,
					CategoryId : response[i].CategoryId,
					Category : null,
					ListNews : []
				});
			}
			
		});
		// End callback

		areaPromise.then(function(response) {

			console.log('PROMISE RUNS HERE');

			for(var i = 0; i < $scope.areas.length; i++) {
				var item = $scope.areas[i];

				var getNewsPromise = httpFactory.GetNewsOfArea(item, 7);

				// getNewsPromise.success(function(response) {
		
				// 	console.log('NEWS OF AREA - ' + item.CategoryId);
				// 	console.log(response);
					
				// 	for(var i = 0; i < response.length; i++) {
				// 		var data = response[i];

				// 		item.ListNews.push({
				//         	Id : data.DefaultId,
				//         	Title : data.Title,
				//         	Image : "#",
				//         	Link : "#/newsdetail/" + data.DefaultId
				//         });
				// 	}
				// });
				
				
		// });

				// getNewsPromise.success(function(response) {
				// 	item.ListNews = response;
				// });

			}
		});
	};



});

application.controller('hotsiteController', function($scope, httpFactory, constantsFactory){

	var key = constantsFactory.AuthorizationKey;

	$scope.showLoading = '';
	$scope.showData = 'none';

	// Get news
	var names = [];

	init();

	function init()	{	
		$scope.listNews = [];

		var key = constantsFactory.AuthorizationKey;

		httpFactory.GetHotNews(key, 7)
		.success(function(response, status){

			console.log('GET DATA FROM HOTSITE');

			for(var i =0; i < response.length; i++) {
				var data = response[i];

				$scope.listNews.push({
		        	Id : data.DefaultId,
		        	Title : data.Title,
		        	Image : "#",
		        	Link : "#/newsdetail/" + data.DefaultId
		        });

	        
	        }
		})
		.then(function(){

			for(var i = 0; i < $scope.listNews.length; i++) {
				var item = $scope.listNews[i];
				httpFactory.UpdateNewsImage(item, key, item.Id);
			}
			
			$scope.showLoading = 'none';
			$scope.showData = '';
		});

	};
});
// Modify controller
application.controller('homeController', function($scope, $q, httpFactory, constantsFactory, callbackFactory){

	var names = [];

	init();

	function init()	{	
		$scope.listNews = [];

		var key = constantsFactory.AuthorizationKey;


		httpFactory.GetHotNews(key, 7)
		.success(function(response, status){


		// 	console.log(header + ' - ' + JSON.stringify(config));

		// 	console.log(response);

		// 	for(var i =0; i < response.length; i++) {
		// 		var data = response[i];

		// 		$scope.listNews.push({
		//         	Id : data.DefaultId,
		//         	Title : data.Title,
		//         	Image : "#",
		//         	Link : "#/newsdetail/" + data.DefaultId
		//         });

	        
	 //        }
		// })
		// .then(function(){

		// 	for(var i = 0; i < $scope.listNews.length; i++) {
		// 		var item = $scope.listNews[i];
		// 		httpFactory.UpdateNewsImage(item, key, item.Id);
		// 	}
			
		// });

		// Get categories
		$scope.categories = [];


		httpFactory.GetCategories(key)
		.success(function(response) {
			for(var i = 0; i < response.length; i++) {
				$scope.categories.push({
					Name : response[i].Name
				});
			}
		});


	};
	



	$scope.AddName = function()	{
		// $scope.listNews.push({ name : $scope.newPerson.name });

		// Modify truong
		$scope.listNews[0].Title = 'Modified';
		// $scope.listPerson[1].name = 'Injected';
	}
});

// NEWS DETAIL
application.controller("detailController", function($scope, $routeParams, httpFactory, constantsFactory){

	// $scope is the ViewModel
    $scope.news = {};

    $scope.nextNews = [];
    $scope.prevNews = [];

    var newsId = $routeParams.newsId;

    init();

    function GetNextNews() {

    	var key = constantsFactory.AuthorizationKey;

    	httpFactory.GetNextNews(key, newsId, 3)
	    .success(function(response){
	    	
	    	console.log(response);
	    	for(var i =0; i < response.length; i++) {
				var data = response[i];

				$scope.nextNews.push({
		        	Id : data.DefaultId,
		        	Title : data.Title,
		        	Image : "#",
		        	Link : "#/newsdetail/" + data.DefaultId
		        });
	        }
	    });
    }


    function GetPreviousNews() {

    	var key = constantsFactory.AuthorizationKey;

    	httpFactory.GetPreviousNews(key, newsId, 3)
	    .success(function(response){
	    	
	    	console.log(response);
	    	for(var i =0; i < response.length; i++) {
				var data = response[i];

				$scope.prevNews.push({
		        	Id : data.DefaultId,
		        	Title : data.Title,
		        	Image : "#",
		        	Link : "#/newsdetail/" + data.DefaultId
		        });

	        
	        }

	    });
    }

    function init()
    {
    	var key = constantsFactory.AuthorizationKey;



    	httpFactory.GetNewsData(key, newsId)
	    .success(function(data){
	    	console.log(data);

	    	$scope.news.Image = data.Image;
	    	$scope.news.Content = data.Content;
	    	$scope.news.Summary = data.Summary;
	    });

	    httpFactory.GetNewsDetail(key, newsId)
	    .success(function(data){

	    	console.log(data);
	    	$scope.news.Title = data.Title;
	    	$scope.news.CategoryId = data.CategoryId;
	    	console.log('CATEGORY : ' + data.CategoryId);
	    })
	    .then(GetNextNews)
	    .then(GetPreviousNews);

	    
    }
    


});