
/* 
* HOME CONTROLLER
* Displaying homepage
*/

// Modify controller
application.controller('homeController', function($scope, httpFactory, constantsFactory, callbackFactory){

	var names = [];

	init();

	function init()
	{	
		$scope.listNews = [];
		var key = constantsFactory.AuthorizationKey;

		httpFactory.GetNews(key)
		.success(function(response, status){

			console.log(response);

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
			
		});
	};
	


	$scope.AddName = function()
	{
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