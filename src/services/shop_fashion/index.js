/***************************
* Shopstyle Collective Api
* For the most part, services are independent of the platform the are running on.
* This means they could function similarly in a browser, or a node.js server.
*
****************************/
var API_KEY = 'uid4961-26577031-68' ;
var PAGESIZE = 50;

var requestCache = {};

function getItems(feedConfig , overideConfig){
	return new Promise(function(resolve, reject) {

        var targetFeed = JSON.parse(JSON.stringify(feedConfig.config)); // Simple clone without dependencies.
		if(overideConfig && overideConfig.page){
			targetFeed.page = overideConfig.page;
		}
		else {
			targetFeed.page = 1;
		}

 		var queryParamsStr = "limit="+ PAGESIZE +"&offset="+ ( PAGESIZE * (targetFeed.page-1) ) +"&";
 		var tmp = [];
 		for (var key in targetFeed){
		    tmp.push(key + "=" + encodeURIComponent( targetFeed[key] ));
 		}
 		queryParamsStr += tmp.join("&");

		if(requestCache[queryParamsStr]){
			// This has been requested before
			setTimeout(function(){
				resolve(JSON.parse(JSON.stringify(requestCache[queryParamsStr])));
			},1);
		}
		else {
			fetch( "http://api.shopstyle.com/api/v2/products?pid="+ API_KEY +"&" + queryParamsStr ).then(function( res ){
				return res.json();

			}).then(function( res ){
				var itemsProcessed, state = {};
				var finalResult;

				if(!res.products) {
					resolve([]);
				}
				else {
					itemsProcessed = res.products;
					itemsProcessed.forEach(function(item){
						item.title = item.name;
						item.image = item.image.sizes.Original.url;
					});

					state.count = res.metadata.total;
					state.fetched = (((targetFeed.page - 1) *  PAGESIZE) + itemsProcessed.length);
					state.hasMore = state.count > state.fetched;

					finalResult = {items:itemsProcessed, state: state};
					requestCache[queryParamsStr] = finalResult;
					resolve(JSON.parse(JSON.stringify(finalResult)));
				}
			}).catch(function (err){
				reject(err);
			});
		}

	});
}


function getItemDetails(item) {
	return {
		type: 'url', // can be 'html', 'url', 'component'
		content: item.clickUrl
	};
}


module.exports = {
	getItems: getItems,
  getItemDetails: getItemDetails
};
