var feedHelpers = require('./../helpers/feed_helpers');

function getRssFeedItems(feedConfig){
	return new Promise(function(resolve, reject) {

		var qq = {
			catalog: "672oqm0oqpyrc4ullpfeclz66", // jewlerry
			//catalog:"0135pruepnxsbh6gw2ve714rv", //flowers
			account:"bbhntrjt16yvunll9iyayufn4",
			//keyword: "Fossil Watch Men",
			keyword: "G-shock",
			category: 1,
			include_discounts: "true",
			results_per_page: 100,
			//price_min: 2000
			//page: 1
		}

		var str = '';
		var tmp = []
		for (var key in qq){
			tmp.push(key + "=" + encodeURIComponent(qq[key]));
		}
		str = tmp.join("&");
		console.log("https://www.popshops.com/v3/products.json?" + str);


		fetch( "https://www.popshops.com/v3/products.json?" + str ).then(function( res ){
			return res.json();
		}).then(function( res ){
			//console.log(res.results.products.product);
			resolve(res.results.products.product);
			//var itemsProcessed = feedHelpers.sanitizeFeedItems (res.items , feedConfig.contentSanitizer);
			//itemsProcessed.forEach(function(item){
			//	item.image = feedHelpers.resolveImageForFeedItem(item ,feedConfig.imageResolver)
			//});
			//resolve(itemsProcessed);
		}).catch(function (err){
			reject(err);
		});


		//fetch( feedConfig.feed ).then(function( res ){
		//	return res.json();
		//}).then(function( res ){
		//	var itemsProcessed = feedHelpers.sanitizeFeedItems (res.items , feedConfig.contentSanitizer);
		//	itemsProcessed.forEach(function(item){
		//		item.image = feedHelpers.resolveImageForFeedItem(item ,feedConfig.imageResolver)
		//	});
		//	resolve(itemsProcessed);
		//}).catch(function (err){
		//	reject(err);
		//});
	});
}

module.exports = {
	getRssFeedItems: getRssFeedItems
};
