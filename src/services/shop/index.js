/***************************
* For the most part, services are independent of the platform the are running on.
* This means they could function similarly in a browser, or a node.js server.
*
****************************/
var requestCache = {};
var _ = require("lodash");

function getItems(feedConfig , overideConfig){
	return new Promise(function(resolve, reject) {

        var targetFeed = _.cloneDeep(feedConfig.config);
		if(overideConfig && overideConfig.page){
			targetFeed.page = overideConfig.page;
		}
		else {
			targetFeed.page = 1;
		}

 		var queryParamsStr = '';
 		var tmp = [];
 		for (var key in targetFeed){
		    tmp.push(key + "=" + encodeURIComponent( targetFeed[key] ));
 		}
 		queryParamsStr = tmp.join("&");

		if(requestCache[queryParamsStr]){
			// This has been requested before
			setTimeout(function(){
				resolve(_.cloneDeep(requestCache[queryParamsStr]));
			},1);
		}
		else {
			fetch( "https://www.popshops.com/v3/products.json?" + queryParamsStr ).then(function( res ){
				return res.json();
			}).then(function( res ){
				var itemsProcessed, state = {};
				var finalResult;
				if(!res.results) {
					resolve([]);
				}
				else {

					itemsProcessed = res.results.products.product;
					itemsProcessed.forEach(function(item){
						item.title = item.name;
						item.image = item.image_url_large;
						item.price = item.price_min;
					});

					state.count = res.results.products.count;
					state.fetched = (((targetFeed.page - 1) *  targetFeed.results_per_page) + itemsProcessed.length);
					state.hasMore = state.count > state.fetched;

					finalResult = {items:itemsProcessed, state: state};
					requestCache[queryParamsStr] = finalResult;
					resolve(_.cloneDeep(finalResult));
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
		content: item.offers.offer[0].url
	};
}

module.exports = {
	getItems: getItems,
  getItemDetails: getItemDetails
};
