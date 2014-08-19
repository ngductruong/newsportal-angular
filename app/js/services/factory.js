
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

application.factory('httpFactory', function($http, $q)
{

	var factory = {};
	var names = [];

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

	factory.GetNews = function(key) {
		// Use this instead of basic ajax
		// Basic ajax will not update the variable

		var listNews = [];

		var promise = 
		$http ({
			method: 'GET', 
			url: 'http://api.biznews.com.vn/api/news/hot?count=30', 
			headers: {'Authorization': key}
		})
		.success(function(response, status, header, config) {

			console.log(header + ' - ' + JSON.stringify(config));

			console.log(response);

			for(var i =0; i < response.length; i++) {
				var data = response[i];

				listNews.push({
		        	Id : data.DefaultId,
		        	Title : data.Title,
		        	Image : "#",
		        	Link : "#/newsdetail/" + data.DefaultId
		        });

	        
	        }
		})
		.then(function(){

			for(var i = 0; i < listNews.length - 1; i++) {
				
				UpdateNewsData(listNews[i], key);

				// httpFactory.UpdateNewsImage(item, key, item.Id);

			}
			
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