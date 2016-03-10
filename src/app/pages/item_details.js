var getItemDetails = require('./../../config.js').config.dataService.getItemDetails;

function init(pageTitle, feedItem){
	var page = tabris.create("Page", { title: "Loading...", topLevel: false, _feedItem: feedItem });
	addItemWebView(page,feedItem, pageTitle);

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

module.exports  = {
	open: open,
	init: init,
	addItemWebView: addItemWebView,
};
