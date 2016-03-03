var getItemDetails = require('./../../config.js').config.dataService.getItemDetails;

function init(pageTitle, feedItem){
	var page = tabris.create("Page", { title: pageTitle, topLevel: false, _feedItem: feedItem });
	// addViewAction(page);
	addItemWebView(page,feedItem);

	return page;
}

function open(pageTitle, feedItem) {
	var p = init(pageTitle, feedItem)
	return p.open();
}

module.exports  = {
	open: open,
	init: init,
	addItemWebView: addItemWebView,
}

/*************************
 * Add an action to the nav bar
 **************************/

// function addViewAction(page){
// 	var openLinkAction = tabris.create("Action", {
// 		placementPriority: "high",
// 		image: {src: "images/refresh.png", scale: 3}
// 	}).on("select", function() {
// 		page.get('_rssItemWebView').dispose();
// 		tabris.create('WebView', { url: page.get('_feedItem').link, left: 0, right: 0, top: 0, bottom: 0}).appendTo(page);
// 	});
// 	page.on("disappear", function(){
// 		openLinkAction.dispose();
// 	});
// }

/*************************
 * Add the webview with the feed content.
 **************************/

function addItemWebView(container, feedItem){
	var itemWebView = tabris.create('WebView',{ left: 0, right: 0, top: 0, bottom: 0}).appendTo(container);
	container.set('_rssItemWebView', itemWebView);

	var itemDetails = getItemDetails(feedItem);
	handlers[itemDetails.type] (itemWebView, itemDetails);
	// itemWebView.set("html", getItemDetails(feedItem) );
}


handlers = {
	html : function(webView, itemDetails){
		webView.set("html", itemDetails.content );
	},
	url : function(webView, itemDetails){
		webView.set("url", itemDetails.content );
	},
};
