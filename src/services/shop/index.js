/***************************
* For the most part, services are independent of the platform the are running on.
* This means they could function similarly in a browser, or a node.js server.
*
****************************/

function getItems(feedConfig , overideConfig){
	return new Promise(function(resolve, reject) {

        var targetFeed = JSON.parse(JSON.stringify(feedConfig.config)); // Simple clone without dependencies.
		if(overideConfig){
			targetFeed.page = overideConfig.page;
		}
		else {
			targetFeed.page = 1;
		}

 		var queryParamsStr = '';
 		var tmp = []
 		for (var key in targetFeed){
		    tmp.push(key + "=" + encodeURIComponent( targetFeed[key] ));
 		}
 		queryParamsStr = tmp.join("&");

 		fetch( "https://www.popshops.com/v3/products.json?" + queryParamsStr ).then(function( res ){
			return res.json();
		}).then(function( res ){
		    var itemsProcessed, state = {};
		    if(!res.results) {
			    resolve([]);
		    }
		    else {

			    itemsProcessed = res.results.products.product;
			    itemsProcessed.forEach(function(item){
				    item.title = item.name;
				    item.image = item.image_url_large;
			    });
			    //console.log("Total "  + res.results.products.count);
			    //console.log("Fetched "  + itemsProcessed.length);
			    //console.log("Fetched Total"  + (((targetFeed.page - 1) *  targetFeed.results_per_page) + itemsProcessed.length) );

			    state.count = res.results.products.count;
			    state.fetched = (((targetFeed.page - 1) *  targetFeed.results_per_page) + itemsProcessed.length);
			    state.hasMore = state.count > state.fetched;
			    resolve({items:itemsProcessed, state: state});
		    }
		}).catch(function (err){
			reject(err);
		});
	});
}


function getItemDetails(item) {
	return {
		type: 'url', // can be 'html', 'url', 'component'
		content: item.offers.offer[0].url
	}
}

module.exports = {
	getItems: getItems,
  getItemDetails: getItemDetails
};



// var qq = {
// 	  // catalog: "672oqm0oqpyrc4ullpfeclz66", // jewlerry
// 		catalog:"0135pruepnxsbh6gw2ve714rv", //flowers
// 		account:"bbhntrjt16yvunll9iyayufn4",
// 		// keyword: "Fossil Watch Men",
// 		// keyword: "G-shock",
// 		category: 1,
// 		include_discounts: "true",
// 		results_per_page: 100,
// 		//price_min: 2000
// 		//page: 1
// 	}
