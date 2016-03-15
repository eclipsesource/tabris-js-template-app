var getItemDetails = require('./../../config.js').config.dataService.getItemDetails;

function init(pageTitle, feedItem){
	var page = tabris.create("Page", { title: "Loading...", topLevel: false, _feedItem: feedItem });
	addItemWebView(page,feedItem, pageTitle);
	registerPageActions(page, feedItem);

	return page;
}


/*************************
 * Add the webview with the feed content.
 **************************/

var handlers = {
	html : function(webView, itemDetails, container, titleOnLoad){
		webView.set("html", itemDetails.content );
		if(titleOnLoad){
			container.set({title:titleOnLoad});
		}
	},
	url : function(webView, itemDetails, container, titleOnLoad){
		webView.set("url", itemDetails.content );
		if(titleOnLoad){
			webView.on("load",function(){
				container.set({title:titleOnLoad});
			});
		}
	},
};

function addItemWebView(container, feedItem, titleOnLoad){
	var itemWebView = tabris.create('WebView',{ left: 0, right: 0, top: 0, bottom: 0}).appendTo(container);
	container.set('_itemWebView', itemWebView);

	var itemDetails = getItemDetails(feedItem);
	handlers[itemDetails.type] (itemWebView, itemDetails, container, titleOnLoad);
}

function open(pageTitle, feedItem) {
	var p = init(pageTitle, feedItem);
	return p.open();
}

function registerPageActions(page, feedItem){
	//tabris.create("Action", {
	//	placementPriority: "low",
	//	title: " ",
	//	image: {src:"images/info@2x.png", scale:4}
	//}).on("select", function() {
	//	aboutPage.open();
	//});
	//
	//tabris.create("Action", {
	//	placementPriority: "normal",
	//	title: "Bookmark",
	//	//image: {src:"images/search@2x.png", scale:4}
	//}).on("select", function() {
	//	aboutPage.open();
	//});

	var openURLAction = tabris.create("Action", {
		placementPriority: "high",
		title: " ",
		image: {src:"images/home@2x.png", scale:4}
	}).on("select", function() {
		var itemDetails = getItemDetails(feedItem);
		var appLauncher = tabris.create("AppLauncher");
		appLauncher.openUrl(itemDetails.link || itemDetails.content);
	});
	page.on("disappear", function(){
		openURLAction.dispose();
	});

}

module.exports  = {
	open: open,
	init: init,
	addItemWebView: addItemWebView,
};
