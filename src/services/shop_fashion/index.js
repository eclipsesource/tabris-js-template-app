/***************************
* Shopstyle Collective Api
 *
* For the most part, services are independent of the platform the are running on.
* This means they could function similarly in a browser, or a node.js server.
*
****************************/
var API_KEY = 'uid4961-26577031-68' ;
var PAGESIZE = 60;
var feeds = require('./feeds');

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

 		var queryParamsStr = "limit="+ PAGESIZE +"&offset="+ ( PAGESIZE * (targetFeed.page-1) ) +"&";
 		queryParamsStr += paramsToQueryStr(targetFeed)

		if(requestCache[queryParamsStr]){
			// This has been requested before
			setTimeout(function(){
				resolve(_.cloneDeep(requestCache[queryParamsStr]));
			},10);
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
						item.price_display = '$'+numberWithCommas((Math.round(item.salePrice || item.price)));

					});

					state.count = res.metadata.total;
					state.fetched = (((targetFeed.page - 1) *  PAGESIZE) + itemsProcessed.length);
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
		content: item.clickUrl
	};
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var config = {
	// diamond-jewelry  ,  maternity-clothes  ,  mens-watches  , petites  , plus-sizes  , womens-tops  ,  womens-shoes , womens-beauty , diamond-rings ,  mens-ties
	// handbags
	// tie store
	// Search aliexpress?

	CATEGORY: "handbags",
	PRICE_RANGE : 'p33:49',
	//PRICE_RANGE : 'p0:10',
};

function paramsToQueryStr(config){
	var tmp = [];
	for (var key in config){
		if(typeof config[key] ==='string'){
			tmp.push(key + "=" + encodeURIComponent( config[key] ));
		}
		else if(typeof config[key] ==='object'){
			config[key].forEach(function(filterValue){
				tmp.push(key + "=" + encodeURIComponent( filterValue ));
			});
		}

	}
	return tmp.join("&");
}

function init( ){
	return new Promise(function(resolve, reject) {
		var query = paramsToQueryStr({
			cat: config.CATEGORY,
			fl:[config.PRICE_RANGE],
		})
		fetch("http://api.shopstyle.com/api/v2/products/histogram?pid=" + API_KEY + "&filters=Brand&"+query).then(function (res) {
			return res.json();
		}).then(function (res) {
			var activeCategories = res.brandHistogram.sort(function(a,b){return b.count-a.count}).filter(function(item){return item.count > 10});
			resolve ( feeds(config, activeCategories) );
		});
	});
}

module.exports = {
	init:init,
	getItems: getItems,
    getItemDetails: getItemDetails
};
