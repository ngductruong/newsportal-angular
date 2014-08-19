


// Add a Service
application.service('nameService', function() {

	var service = {};

	// Array of objects
	var names = [
	];

	// service getNames function
	service.getNames = function()
	{
		$.ajax ({
            url: "http://localhost:1603/api/news/hot?count=10",
            dataType : "json",
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be");}
        })
        .done(function(data, status){

        	console.log(data);
            for(var i =0; i < data.length; i++)
            {
                name.push(data[i]);
            }
        })
        .then(function(data, status) {
            console.log('---------FINISH');
            console.log(names);
        });


		return names;
	}
	return service;
});

application.factory('httpFactory', function($http, constantsFactory)
{

	var factory = {};
	var names = [];

	factory.GetAreas = function(key) {

		var promise = 
			$http ({
				method: 'GET', 
				url: "http://api.biznews.com.vn/api/area/all", 
				headers: {'Authorization': constantsFactory.Authorization}
			});			

		return promise;
	};

	factory.GetNewsData = function(key, newsId) {

		var promise = 
			$http ({
				method: 'GET', 
				url: "http://api.biznews.com.vn/api/news/" + newsId + "/data", 
				headers: {'Authorization': key}
			});			

		return promise;
	};

	factory.GetCategories = function(key) {
		var promise = 
		$http({
				method: 'GET', 
				url: "http://api.biznews.com.vn/api/category/all/vi-VN",
				headers: {'Authorization': key}
			});		
		return promise;	
	}

	factory.GetNextNews = function(key, newsId, categoryId) {

		var promise = 
			$http ({
				method: 'GET', 
				url: "http://api.biznews.com.vn/api/news/" + newsId + "/next?count=10&categoryId=" + categoryId, 
				headers: {'Authorization': key}
			});			

		return promise;
	};

	factory.GetPreviousNews = function(key, newsId, categoryId) {

		var promise = 
			$http ({
				method: 'GET', 
				url: "http://api.biznews.com.vn/api/news/" + newsId + "/prev?count=10&categoryId=" + categoryId, 
				headers: {'Authorization': key}
			});			

		return promise;
	};

	factory.GetNewsDetail = function(key, newsId) {

		var promise = 
			$http ({
				method: 'GET', 
				url: "http://api.biznews.com.vn/api/news/" + newsId + "/detail", 
				headers: {'Authorization': key}
			});			

		return promise;
	};


	factory.UpdateNewsImage = function(item, key, newsId) {

		var promise = 
			$http ({
				method: 'GET', 
				url: "http://api.biznews.com.vn/api/news/" + newsId + "/data", 
				headers: {'Authorization': key}
			})
			.success(function(data){

				item.Image = data.Image;
			});
			

		return promise;
	};

	factory.GetHotNews = function(key, count) {
		// Use this instead of basic ajax
		// Basic ajax will not update the variable

		var listNews = [];

		var promise = 

			$http ({
				method: 'GET', 
				url: 'http://api.biznews.com.vn/api/news/hot?count=' + count, 
				headers: {'Authorization': key}
			});

	

		return promise;
	};


	function UpdateNewsData(item, key) {

		console.log('Start get data ' + item.Id);

	 	$http ({
			method: 'GET', 
			url: "http://api.biznews.com.vn/api/news/" + item.Id + "/data", 
			headers: {'Authorization': key}
		})
		.success(function(data){
			console.log('Successfully updated ' + item.Id);
			item.Image = data.Image;
		});
	}


	factory.GetLatestNews = function(key, categoryId, count) {
		// Use this instead of basic ajax
		// Basic ajax will not update the variable

		var promise = 
			$http ({
				method: 'GET', 
				url: 'http://api.biznews.com.vn/api/news/latest?count=' + count + '&categoryId=' + categoryId, 
				headers: {'Authorization': key}
			});
		return promise;
	};

	factory.GetNewsOfArea = function(area, count) {


		console.log('FACTORY - GET NEWS OF AREA - ' + area.categoryId);
		console.log(area);
		
		var promise = 
		$http ({
			method: 'GET', 
			url: 'http://api.biznews.com.vn/api/news/latest?count=' + count + '&categoryId=' + area.CategoryId, 
			headers: {'Authorization': constantsFactory.Authorization}
		});

		promise.success(function(response) {
			
			console.log('NEWS OF AREA - ' + area.CategoryId);
			console.log(response);
			
			for(var i = 0; i < response.length; i++) {
				var data = response[i];

				area.ListNews.push({
		        	Id : data.DefaultId,
		        	Title : data.Title,
		        	Image : "#",
		        	Link : "#/newsdetail/" + data.DefaultId
		        });
			}
		});

		return promise;
	}


	return factory;

});


application.factory('constantsFactory', function(){
	var factory = {};
	factory.AuthorizationKey = "Savis-Basic-Auth 96a309941b3ca378fb9ca9fed1e750be";
	return factory;
});

application.factory('callbackFactory', function($http){
	var factory = {};
	factory.getNews = function(key, successCallBack, errorCallBack) 
	{
		$http ({
			method: 'GET', 
			url: 'http://api.biznews.com.vn/api/news/hot?count=10', 
			headers: {'Authorization': key}
		})
		.success(successCallBack, errorCallBack);
	}
	return factory;
});