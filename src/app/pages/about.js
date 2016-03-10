var getItemDetails = require('./../../config.js').config.dataService.getItemDetails;

function init(){
	var page = tabris.create("Page", { title: "Built with Tabris.js", topLevel: false});
	tabris.create("TextView",{text:"hi"}).appendTo(page);

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
 * Add the webview with the feed content.
 **************************/

function addItemWebView(container, feedItem, titleOnLoad){
	var itemWebView = tabris.create('WebView',{ left: 0, right: 0, top: 0, bottom: 0}).appendTo(container);
	container.set('_itemWebView', itemWebView);

	var itemDetails = getItemDetails(feedItem);
	handlers[itemDetails.type] (itemWebView, itemDetails, container, titleOnLoad);

}


handlers = {
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
